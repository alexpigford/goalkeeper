const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()

app.use(express.json())

// DB CONFIG
const db = config.get('mongoURI')

// CONNECT TO MONGO
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
})
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log('Error: ', err))

// ROUTES
app.use('/api/goals', require('./routes/api/goals'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// STATIC
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`The server is running on port ${port}.`)
})