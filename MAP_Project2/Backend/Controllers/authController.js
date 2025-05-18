// backend/Controllers/authController.js

const pool   = require('../database');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    if (!rows.length) return res.status(400).json({ error: 'User not found' });
    const user = rows[0];
    if (!user.password) return res.status(400).json({ error: 'Account not set up' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      {
        user_id:   user.user_id,
        user_role: user.user_role,
        team_id:   user.team_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user_role:  user.user_role,
      user_id:    user.user_id,
      first_name: user.first_name,
      last_name:  user.last_name,
      team_id:    user.team_id
    });
  } catch (err) {
    next(err);
  }
}

// Controllers/authController.js

// … your existing imports …
async function verifyReferral(req, res, next) {
  try {
    const { pin_code } = req.body;
    // 1) grab exactly one matching OTP row (newest first)…
    const { rows } = await pool.query(
      `SELECT otp_id, user_id
         FROM one_time_pin
        WHERE pin_code = $1
          AND expires_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1`,
      [pin_code]
    );
    if (!rows.length) {
      return res.status(400).json({ error: 'Invalid or expired pin' });
    }

    const { otp_id, user_id } = rows[0];

    // 2) immediately delete that OTP so it can’t be reused later
    await pool.query(
      'DELETE FROM one_time_pin WHERE otp_id = $1',
      [otp_id]
    );

    // 3) issue the short-lived referral token for *that* user_id
    const referralToken = jwt.sign(
      { user_id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ referralToken });

  } catch (err) {
    next(err);
  }
}


async function referralSignup(req, res, next) {
  try {
    const user_id  = req.user.user_id;
    const { username, password } = req.body;

    // 1) make sure they picked a new username
    const { rows: existing } = await pool.query(
      'SELECT 1 FROM users WHERE username = $1',
      [username]
    );
    if (existing.length) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // 2) hash & update
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'UPDATE users SET username = $1, password = $2 WHERE user_id = $3',
      [username, hashed, user_id]
    );

    res.json({ message: 'Account set up successfully' });
  } catch (err) {
    // if you still want to catch unique-constraint at the DB level:
    if (err.code === '23505' && err.constraint === 'users_username_key') {
      return res.status(400).json({ error: 'Username already taken' });
    }
    next(err);
  }
}

module.exports = { login, verifyReferral, referralSignup };
