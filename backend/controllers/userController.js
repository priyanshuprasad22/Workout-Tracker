// getting the UserSchema from models folder that is containg the Structure of User data.
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{

    return jwt.sign({_id,},process.env.SECRET,{expiresIn:'3d'})
}


// login user

const loginuser = async (req,res) =>{
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)
        
        const token = createToken(user._id)

        res.status(200).json({email,token})

    }catch(error)
    {
        res.status(400).json({error:error.message})
    }

}

// signup user
// We genrally signup a user with hasing there password 
// so that even if the database is breached it becomes diffult to find the correct password.

const signupuser = async(req,res) => {
    const { email, password }= req.body

    try{
        const user = await User.signup(email,password)
        
        const token = createToken(user._id)

        res.status(200).json({email,token})

    }catch(error)
    {
        res.status(400).json({error:error.message})
    }


}

module.exports = {loginuser,signupuser}