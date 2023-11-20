const Workout = require('../models/workoutschema.js')
const mongoose = require('mongoose')

// get all workout
const getWorkouts= async(req,res) =>{
    const user_id= req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})


    res.status(200).json(workouts)
}

// get a single workout

const getWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout)
    {
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}

// create a new workout

const createWorkout = async(req,res)=>{
    const {title,load,practice}=req.body

    // add doc to database.

    let emptyFields=[]

    if(!title)
    {
        emptyFields.push('title')
    }
    if(!load)
    {
        emptyFields.push('load')
    }
    if(!practice)
    {
        emptyFields.push('practice')
    }

    if(emptyFields.length>0)
    {
        return res.status(400).json({error:'Please fill all the fields',emptyFields})
    }

    try{
        const user_id= req.user._id
        const workout = await Workout.create({title,load,practice,user_id})
        res.status(200).json(workout)
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }

}

// delete a workout

const deleteworkout = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'Invalid Id'})
    }

    const workout= await Workout.findByIdAndDelete({_id:id})

    if(!workout)
    {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(200)



}

// update a workout

const updateworkout = async(req,res) =>{

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'Invalid Id'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    res.status(200).json(workout)

}

module.exports={
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteworkout,
    updateworkout
}