const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/middlewareAuth')

// USER MODEL
const User = require('../../models/User')

// REGISTER
router.post('/', (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ msg: 'All fields are required.'})
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist'})

    bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials.'})

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

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router