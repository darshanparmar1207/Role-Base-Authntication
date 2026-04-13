const express = require('express');

const router = express.Router();

// Only admin can access this route
router.get('/admin', (req, res) => {
    res.status(200).json({message: 'Welcome Admin'})
})

// Both admin and manager can access this route
router.get('/manager', (req, res) => {
    res.status(200).json({message: 'Welcome Manager'})
})

// All users can access this route
router.get('/user', (req, res) => {
    res.status(200).json({message: 'Welcome User'})
})