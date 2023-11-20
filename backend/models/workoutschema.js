const mongoose = require('mongoose')

const Schema= mongoose.Schema

// This schema is actual representation of the document in the mongoDB Atlas.
// here in title we can set type and required fields to make those things mandatory or important.
const workoutSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    practice:{
        type: Number,
        required:true
    },
    load:{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required:true
    }
},{ timestamps: true})

// This Workout is single worlout schema which will 
// convert itself into Workouts Collections with
// workout as a single document.

module.exports = mongoose.model('Workout',workoutSchema)
