const express = require('express')
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbConnect')

dbConnect()

const app = express()
const port = 3000

//Middleware
app.use(express.json())

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})