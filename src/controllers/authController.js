const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async(req, res) => {

    try {
    const {username, password, role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        password: hashedPassword,
        role
    })
    await newUser.save()
    res.status(201)
    .json({message: `User registered with username ${username}`})
} catch (error) {
    res.status(500)
    .json({message: 'Something went wrong'})
}}


// Login a user
const login = async(req, res) => {
    try { 
    const {username, password} = req.body
    const user = await User.findOne({username})

    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'})
    }

}catch (error) {res.status(500)
    .json({message: 'Something went wrong'})
}
}

module.exports = {
    register,
    login
}