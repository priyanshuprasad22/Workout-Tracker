const express = require('express')
const requireAuth = require('../middleware/useAuth')
const {createWorkout,
    getWorkout,
    getWorkouts,
    deleteworkout,
    updateworkout}= require('../controllers/workoutcontrollers')


// To use the router from server.js
const router = express.Router()
// GET /workouts --> Gets all the workout doucuments
// POST /workouts --> Create a new workout document
// GET /workouts/:id --> Gets a single workout document
// DELETE /workouts/:id -->Deletes a single workout
// Patch /workouts/:id --> Updates a single workout.

// Require Auth for all workout routes.
router.use(requireAuth)

// Get all workouts
router.get('/',getWorkouts)

// Get a single workout.
router.get('/:id',getWorkout)

// Gets a single workout document
router.post('/',createWorkout)

// DELETE a workout
router.delete('/:id',deleteworkout)

// Patch a workout or update a workout.
router.patch('/:id',updateworkout)

module.exports = router

// Mongoose is also known as ODM Object data modeling library.