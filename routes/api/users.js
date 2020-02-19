const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

// USER MODEL
const User = require('../../models/User')

// REGISTER
router.post('/', (req, res) => {
    const { email, username, password} = req.body

    if(!email || !username || !password) {
        return res.status(400).json({ msg: 'All fields are required.'})
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: "User already exists"})

        const newUser = new User({
            email,
            username,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtLookAway'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        username: user.username
                                    }
                                })

                            }
                        )
                    })
                    
            })
        })
    })
})

module.exports = router