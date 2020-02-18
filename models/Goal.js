const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
} , {
    timestamps: true
})

module.exports = Goal = mongoose.model('goal', GoalSchema)