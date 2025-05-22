const express = require('express');
const multer  = require('multer');
const path    = require('path');
const router  = express.Router();

const {
  createTeam,
  addPlayer,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getTeamDetails
} = require('../Controllers/teamController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');

// ─── Multer Setup ───────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // temp name; we'll rename to team-<id> later in controller
    const ext = path.extname(file.originalname);
    cb(null, `upload-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// ─── Team Endpoints ─────────────────────────────────────────────

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  upload.single('logo'),
  createTeam
);

router.post(
  '/:id/players',
  authenticateToken,
  authorizeRoles('coach'),
  addPlayer
);

router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.get('/:id/details', authenticateToken, authorizeRoles('coach','admin','player'), getTeamDetails);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  upload.single('logo'),
  updateTeam
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteTeam
);

module.exports = router;
