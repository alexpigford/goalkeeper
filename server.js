const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

// DB CONFIG
const db = require('./config/keys').mongoURI

// CONNECT TO MONGO
mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log('Error: ', err))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`The server is running on port ${port}.`)
})