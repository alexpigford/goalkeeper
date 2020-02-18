const express = require('express')
const router = express.Router()

// GOAL MODEL
const Goal = require('../../models/Goal')

// GET
router.get('/', (req, res) => {
    Goal.find()
        .then(goals => res.json(goals))
})

// POST
router.post('/', (req, res) => {
    const newGoal = new Goal({
        title: req.body.title,
        description: req.body.description
    })

    newGoal.save().then(goal => res.json(goal))
})

// DELETE
router.delete('/:id', (req, res) => {
    Goal.findById(req.params.id)
        .then(goal => goal.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router