const express = require('express');
const router = express.Router();
const { generateOTP } = require('../Controllers/otpController');
const { authorizeRoles } = require('../middleware/authMiddleware');
router.post('/generate', authorizeRoles('admin','coach'), generateOTP);
console.log('authorizeRoles:', authorizeRoles);
console.log('generateOTP:', generateOTP);

module.exports = router;