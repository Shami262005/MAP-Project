// backend/Controllers/eventController.js

const pool = require('../database');

// 1) Create
async function createEvent(req, res, next) {
  try {
    const { event_name, type, venue, description, date, invitees } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO events
         (event_name, type, venue, description, date, created_by_user_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [event_name, type, venue, description, date || new Date(), req.user.user_id]
    );
    const event = rows[0];

    if (Array.isArray(invitees) && invitees.length) {
      const text = `
        INSERT INTO user_events_invitations (event_id, user_id)
        VALUES ($1, $2)
      `;
      for (const userId of invitees) {
        await pool.query(text, [event.event_id, userId]);
      }
    }

    req.app.get('io').emit('eventCreated', event);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

// 2) Get all events + invitees
async function getAllEvents(req, res, next) {
  try {
    const { rows } = await pool.query(`
      SELECT
        e.*,
        COALESCE(json_agg(
          json_build_object(
            'user_id', u.user_id,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'status', inv.status,
            'invited_at', inv.invited_at
          )
        ) FILTER (WHERE u.user_id IS NOT NULL), '[]') AS invitees
      FROM events e
      LEFT JOIN user_events_invitations inv
        ON inv.event_id = e.event_id
      LEFT JOIN users u
        ON u.user_id = inv.user_id
      GROUP BY e.event_id
      ORDER BY e.date ASC
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// 3) Get one event + invitees
async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const ev = await pool.query(
      `SELECT * FROM events WHERE event_id = $1`,
      [id]
    );
    if (!ev.rows.length) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const { rows: invitees } = await pool.query(`
      SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        inv.status,
        inv.invited_at
      FROM user_events_invitations inv
      JOIN users u
        ON u.user_id = inv.user_id
      WHERE inv.event_id = $1
    `, [id]);

    res.json({
      ...ev.rows[0],
      invitees
    });
  } catch (err) {
    next(err);
  }
}


// 4) Update
async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const { event_name, type, venue, description, date, invitees } = req.body;

    const upd = await pool.query(
      `UPDATE events
          SET event_name=$1,
              type=$2,
              venue=$3,
              description=$4,
              date=$5
        WHERE event_id=$6
        RETURNING *`,
      [event_name, type, venue, description, date, id]
    );
    if (!upd.rows.length) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const event = upd.rows[0];

    if (Array.isArray(invitees)) {
      await pool.query(
        `DELETE FROM user_events_invitations WHERE event_id=$1`,
        [id]
      );
      const text = `
        INSERT INTO user_events_invitations (event_id, user_id)
        VALUES ($1, $2)
      `;
      for (const userId of invitees) {
        await pool.query(text, [id, userId]);
      }
    }

    req.app.get('io').emit('eventUpdated', event);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// 5) Delete
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM events WHERE event_id=$1`, [id]);
    req.app.get('io').emit('eventDeleted', { event_id: id });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
}

// 6) Uninvite
async function uninviteUser(req, res, next) {
  try {
    const { id, userId } = req.params;
    await pool.query(
      `DELETE FROM user_events_invitations
         WHERE event_id=$1 AND user_id=$2`,
      [id, userId]
    );
    res.json({ message: `User ${userId} uninvited from event ${id}` });
  } catch (err) {
    next(err);
  }
}

// 7) Events *this user* is invited to
// 7) Events *this user* is invited to
// 7) Events this user is invited to
// 7) Events this user is invited to
// 7) Events this user is invited to
async function getInvitedEvents(req, res, next) {
  try {
    const { user_id } = req.user;

    const { rows } = await pool.query(`
      SELECT
        e.*,
        COALESCE(
          json_agg(
            json_build_object(
              'user_id',    u2.user_id,
              'first_name', u2.first_name,
              'last_name',  u2.last_name,
              'status',     inv2.status,
              'invited_at', inv2.invited_at
            )
          ) FILTER (WHERE u2.user_id IS NOT NULL),
          '[]'
        ) AS invitees
      FROM events e

      -- only events where this user is invited
      JOIN user_events_invitations inv_user
        ON inv_user.event_id = e.event_id
       AND inv_user.user_id  = $1

      -- bring in all invitees for those events
      LEFT JOIN user_events_invitations inv2
        ON inv2.event_id = e.event_id
      LEFT JOIN users u2
        ON u2.user_id = inv2.user_id

      GROUP BY e.event_id
      ORDER BY e.date ASC;
    `, [user_id]);

    res.json(rows);
  } catch (err) {
    next(err);
  }
}



module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  uninviteUser,
  getInvitedEvents
};
