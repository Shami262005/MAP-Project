// backend/Routes/authRoutes.js

const express = require('express');
const router  = express.Router();

const {
  login,
  verifyReferral,
  referralSignup
} = require('../Controllers/authController');

const { authenticateToken } = require('../middleware/authMiddleware');

// 1) Normal login
router.post('/login', login);

// 2) Step 1: Verify the PIN only
router.post('/referral/verify', verifyReferral);

// 3) Step 2: Complete signup (must supply referralToken as Bearer)
router.post(
  '/referral/signup',
  authenticateToken,
  referralSignup
);

module.exports = router;
