// backend/Controllers/teamController.js

const pool       = require('../database');
const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

// SMTP transporter (SendGrid via SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

// Helper: build public URL for uploaded files
function buildPublicUrl(req, filename) {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}

async function createTeam(req, res, next) {
  try {
    // 1) Insert team (logo_url NULL initially)
    const { team_name, contact, team_address, category, league, manager } = req.body;
    const { rows: teamRows } = await pool.query(
      `INSERT INTO team
         (team_name, contact, team_address, category, league, logo_url)
       VALUES ($1,$2,$3,$4,$5,NULL)
       RETURNING *`,
      [team_name, contact, team_address, category, league]
    );
    const team = teamRows[0];

    // 2) If logo uploaded, rename to team-<id>.<ext> and update DB
    if (req.file) {
      const ext       = path.extname(req.file.originalname);
      const newName   = `team-${team.team_id}${ext}`;
      const uploadDir = path.join(__dirname, '../uploads');
      const oldPath   = path.join(uploadDir, req.file.filename);
      const newPath   = path.join(uploadDir, newName);

      // delete any existing logo for this team
      const existing = await fs.promises.readdir(uploadDir);
      for (const file of existing) {
        if (file.startsWith(`team-${team.team_id}.`)) {
          await fs.promises.unlink(path.join(uploadDir, file));
        }
      }

      await fs.promises.rename(oldPath, newPath);
      const logoUrl = buildPublicUrl(req, newName);
      await pool.query(
        'UPDATE team SET logo_url = $1 WHERE team_id = $2',
        [logoUrl, team.team_id]
      );
      team.logo_url = logoUrl;
    }

    // 3) Create coach user
    const m = typeof manager === 'string' ? JSON.parse(manager) : manager;
    const { first_name, last_name, phone, email, gender, dob } = m;
    const { rows: userRows } = await pool.query(
      `INSERT INTO users
         (first_name, last_name, phone, email, user_role, team_id, gender, dob)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING user_id`,
      [ first_name, last_name, phone, email, 'coach', team.team_id, gender, dob ]
    );
    const user_id = userRows[0].user_id;

    // 4) Generate OTP, store, and email coach
    const pin     = Math.floor(100000 + Math.random() * 900000);
    const expires = new Date(Date.now() + 24*60*60*1000);
    await pool.query(
      `INSERT INTO one_time_pin (pin_code, user_id, expires_at)
       VALUES ($1,$2,$3)`,
      [pin, user_id, expires]
    );
    await transporter.sendMail({
      from:    process.env.SMTP_SENDER,
      to:      email,
      subject: 'Your Hockey App Referral Code',
      html: `
        <p>Dear ${first_name} ${last_name},</p>
        <p>Your referral code is <strong>${pin}</strong>. It expires at ${expires.toISOString()}.</p>
        <p>Warm regards,<br/>Hockey App Team</p>
      `
    });

    // 5) Emit and respond
    req.app.get('io').emit('teamCreated', { team, manager_id: user_id });
    res.status(201).json({ team_id: team.team_id, manager_id: user_id });
  } catch (err) {
    next(err);
  }
}

async function updateTeam(req, res, next) {
  try {
    const { id } = req.params;
    const { team_name, contact, team_address, category, league } = req.body;

    // 1) If new logo uploaded, delete old & rename
    let logoUrl;
    if (req.file) {
      const ext       = path.extname(req.file.originalname);
      const newName   = `team-${id}${ext}`;
      const uploadDir = path.join(__dirname, '../uploads');
      const oldPath   = path.join(uploadDir, req.file.filename);
      const newPath   = path.join(uploadDir, newName);

      // remove any existing file for this team
      const existing = await fs.promises.readdir(uploadDir);
      for (const file of existing) {
        if (file.startsWith(`team-${id}.`)) {
          await fs.promises.unlink(path.join(uploadDir, file));
        }
      }

      await fs.promises.rename(oldPath, newPath);
      logoUrl = buildPublicUrl(req, newName);
    }

    // 2) Build and run UPDATE query
    const sets = [
      'team_name=$1',
      'contact=$2',
      'team_address=$3',
      'category=$4',
      'league=$5',
      ...(logoUrl ? ['logo_url=$6'] : [])
    ].join(', ');
    const sql    = `UPDATE team SET ${sets} WHERE team_id=$${logoUrl ? 7 : 6} RETURNING *`;
    const params = logoUrl
      ? [team_name, contact, team_address, category, league, logoUrl, id]
      : [team_name, contact, team_address, category, league, id];

    const { rows } = await pool.query(sql, params);
    if (!rows.length) return res.status(404).json({ error: 'Team not found' });

    const updated = rows[0];
    req.app.get('io').emit('teamUpdated', updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function addPlayer(req, res, next) {
  try {
    const team_id = req.user.team_id;
    const { first_name, last_name, phone, email, gender, dob } = req.body;
    if (parseInt(req.params.id) !== parseInt(team_id)) {
      return res.status(403).json({ error: 'Cannot add to other team' });
    }

    const { rows } = await pool.query(
      `INSERT INTO users
         (first_name, last_name, phone, email, user_role, team_id, gender, dob)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING user_id`,
      [first_name, last_name, phone, email, 'player', team_id, gender, dob]
    );
    const user_id = rows[0].user_id;

    const pin     = Math.floor(100000 + Math.random() * 900000);
    const expires = new Date(Date.now() + 24*60*60*1000);
    await pool.query(
      `INSERT INTO one_time_pin (pin_code, user_id, expires_at)
       VALUES ($1,$2,$3)`,
      [pin, user_id, expires]
    );
    await transporter.sendMail({
      from:    process.env.SMTP_SENDER,
      to:      email,
      subject: 'Your Hockey App Referral Code',
      text:    `Hello ${first_name}, your referral code is ${pin}. It expires in 24 hours.`
    });

    req.app.get('io').emit('playerAdded', { team_id, player_id: user_id });
    res.status(201).json({ player_id: user_id });
  } catch (err) {
    next(err);
  }
}

async function getAllTeams(req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM team');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getTeamById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM team WHERE team_id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Team not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteTeam(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM team WHERE team_id=$1', [id]);
    req.app.get('io').emit('teamDeleted', { team_id: id });
    res.json({ message: 'Team deleted' });
  } catch (err) {
    next(err);
  }
}

async function getTeamDetails(req, res, next) {
  try {
    const teamId = parseInt(req.params.id, 10);

    // 1) fetch team
    const teamRes = await pool.query(
      `SELECT team_id, team_name, contact, team_address, category, league, logo_url
       FROM team
       WHERE team_id = $1`,
      [teamId]
    );
    if (!teamRes.rows.length) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const team = teamRes.rows[0];

    // 2) fetch coach
    const coachRes = await pool.query(
      `SELECT user_id, first_name, last_name
       FROM users
       WHERE team_id = $1 AND user_role = 'coach'`,
      [teamId]
    );
    const coach = coachRes.rows[0] || null;

    // 3) fetch players
    const playersRes = await pool.query(
      `SELECT user_id,
              first_name,
              last_name,
              gender,
              email,
              phone,
              dob
         FROM users
        WHERE team_id = $1
          AND user_role = 'player'
        ORDER BY first_name, last_name`,
      [teamId]
    );
    const players = playersRes.rows;

    // 4) return combined
    res.json({ team, coach, players });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTeam,
  addPlayer,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getTeamDetails, 
};
