const pool = require('../database');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT 
         u.user_id,
         u.first_name,
         u.last_name,
         u.email,
         u.phone,
         u.user_role,
         u.team_id,
         t.team_name,
         u.gender,
         u.dob,
         u.date_created
       FROM users u
       LEFT JOIN team t
         ON u.team_id = t.team_id
       ORDER BY u.date_created DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT 
         u.user_id,
         u.first_name,
         u.last_name,
         u.email,
         u.phone,
         u.user_role,
         u.team_id,
         t.team_name,
         u.gender,
         u.dob,
         u.date_created
       FROM users u
       LEFT JOIN team t ON u.team_id = t.team_id
       WHERE u.user_id = $1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function createAdmin(req, res, next) {
  try {
    const { first_name, last_name, email, phone, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (first_name,last_name,email,phone,password,user_role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING user_id,first_name,last_name,email,phone,user_role,date_created',
      [first_name, last_name, email, phone, hashed, 'admin']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE user_id=$1', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}
// profile management
async function getMe(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT user_id, first_name, last_name, email, phone, user_role, team_id, gender, dob, date_created FROM users WHERE user_id=$1',
      [req.user.user_id]
    );
    res.json(rows[0]);
  } catch (err) { next(err) }
}
async function updateMe(req, res, next) {
  try {
    const fields = ['first_name','last_name','email','phone','gender','dob'];
    const updates = [];
    const values = [];
    let idx = 1;
    for (const f of fields) {
      if (req.body[f] !== undefined) {
        updates.push(`${f}=$${idx++}`);
        values.push(req.body[f]);
      }
    }
    if (!updates.length) return res.status(400).json({ error: 'No fields to update' });
    values.push(req.user.user_id);
    const q = `UPDATE users SET ${updates.join(',')} WHERE user_id=$${idx} RETURNING user_id,first_name,last_name,email,phone,user_role,team_id,gender,dob`;
    const { rows } = await pool.query(q, values);
    res.json(rows[0]);
  } catch (err) { next(err) }
}
module.exports = { getAllUsers, getUserById, createAdmin, deleteUser, getMe, updateMe };
