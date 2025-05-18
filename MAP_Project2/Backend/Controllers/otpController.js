// Controllers/otpController.js
require('dotenv').config();
const pool       = require('../database');
const nodemailer = require('nodemailer');

// configure your SMTP transporter via .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function generateOTP(req, res, next) {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }

    // create code and expiry
    const pin     = Math.floor(100000 + Math.random() * 900000);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // store in DB
    await pool.query(
      `INSERT INTO one_time_pin (pin_code, user_id, expires_at)
       VALUES ($1, $2, $3)`,
      [ pin, user_id, expires ]
    );

    // look up user email
    const { rows } = await pool.query(
      `SELECT email FROM users WHERE user_id = $1`,
      [ user_id ]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // send the mail
    await transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      rows[0].email,
      subject: 'Your One-Time Code',
      text:    `Your code is ${pin}. It expires at ${expires.toISOString()}.`
    });

    res.json({ message: 'OTP sent', expires_at: expires });
  } catch (err) {
    next(err);
  }
}

module.exports = { generateOTP };
