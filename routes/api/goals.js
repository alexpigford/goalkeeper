const express = require("express");
const router = express.Router();
const auth = require("../../middleware/middlewareAuth");

// GOAL MODEL
// allows queries to model
const Goal = require("../../models/Goal");

// GET api/goals
// get all goals
// public
router.get("/", (req, res) => {
  Goal.find().then(goals => res.json(goals));
});

// POST api/goals
// create goal
// protected (auth parameter)
router.post("/", auth, (req, res) => {
  const newGoal = new Goal({
    title: req.body.title,
    description: req.body.description
  });
// save to db as json
  newGoal.save().then(goal => res.json(goal));
});

// DELETE api/goals/:id
// delete goal
// protected (auth parameter)
router.delete("/:id", auth, (req, res) => {
  Goal.findById(req.params.id)
// callback sends success boolean
    .then(goal => goal.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
