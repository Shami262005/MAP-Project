// backend/routes/userRoutes.js

const express = require('express');
const router  = express.Router();

const {
  getAllUsers,
  getUserById,
  createAdmin,
  deleteUser,
  getMe,
  updateMe
} = require('../Controllers/userController');

const {
  authenticateToken,
  authorizeRoles
} = require('../middleware/authMiddleware');


router.get('/me',authenticateToken,getMe);

router.put('/me',authenticateToken,updateMe);

router.get('/',authenticateToken,authorizeRoles('admin'),getAllUsers);

router.get('/:id',
  authenticateToken,
  authorizeRoles('admin'),
  getUserById
);

router.post('/',
  authenticateToken,
  authorizeRoles('admin'),
  createAdmin
);

router.delete('/:id',
  authenticateToken,
  authorizeRoles('admin','coach'),
  deleteUser
);

module.exports = router;
