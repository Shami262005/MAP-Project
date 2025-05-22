// backend/Routes/announcementRoutes.js

const express = require('express');
const multer  = require('multer');
const path    = require('path');
const router  = express.Router();

const {
  createAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement
} = require('../Controllers/announcementController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');

// ─── Multer setup ────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/announcementspic'));
  },
  filename: (req, file, cb) => {
    // temporary name, we'll rename to announcement-<id>.<ext> in the controller
    const ext = path.extname(file.originalname);
    cb(null, `upload-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// ─── Routes ──────────────────────────────────────────────────────────────

// Create announcement + image (admin only)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  upload.single('image'),
  createAnnouncement
);

// List all announcements (public)
router.get('/', getAllAnnouncements);

// Delete an announcement + its image (admin only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteAnnouncement
);

module.exports = router;
