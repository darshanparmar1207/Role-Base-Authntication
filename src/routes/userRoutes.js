const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

//  ONLY ADMIN
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

//  ADMIN + MANAGER
router.get('/manager', verifyToken, authorizeRoles('admin', 'manager'), (req, res) => {
    res.json({ message: 'Welcome Manager' });
});

//  ALL USERS
router.get('/user', verifyToken, (req, res) => {
    res.json({ message: 'Welcome User' });
});

module.exports = router;