// backend/Routes/eventRoutes.js

const express = require('express');
const router  = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  uninviteUser,
  getInvitedEvents
} = require('../Controllers/eventController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');

// 1) Create an event (admin & coach)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin','coach'),
  createEvent
);

// 2) List all events (public)
router.get('/', getAllEvents);

// ─── NEW ROUTES ────────────────────────────────────────────────────────────

// 3) List events the current user is invited to (must be logged in)
router.get(
  '/invited',
  authenticateToken,
  getInvitedEvents
);

// 4) Un-invite a user from an event (admin & coach)
router.delete(
  '/:id/invitees/:userId',
  authenticateToken,
  authorizeRoles('admin','coach'),
  uninviteUser
);

// ─── EXISTING PARAM ROUTES ───────────────────────────────────────────────────

// 5) Get one event + its invitations (public)
router.get('/:id', getEventById);

// 6) Update an event (admin & coach)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin','coach'),
  updateEvent
);

// 7) Delete an event (admin only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteEvent
);

module.exports = router;
