require('dotenv').config()

const express=require('express')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const app=express()

// middleware for the api call when a post or patch request comes in then it 
// needs to handle the request body that is only possible if there is the middleware.
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
// These will work when /api/workouts is called and the corresponding function is then called from workoutRoutes.
// The function present inside the worlout file will work when we call goes from /api/workouts.
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGOURI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to db and Listnening on port 4000!')
    })
}).catch((error) =>{
    console.log(error)
})





