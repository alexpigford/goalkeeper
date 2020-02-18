const express = require('express')
const mongoose = require('mongoose')

const goals = require('./routes/api/goals')

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

// ROUTES
app.use('/api/goals', goals)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`The server is running on port ${port}.`)
})