import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import  User  from "./modals/user.js"


// register user
export const register=async(req, res)=>{

    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,

        }= req.body

        const salt=await bcrypt.genSalt()
        const passwordHash= await bcrypt.hash(password, salt)
        // encrypt pass -> save 
        // user logs in -> give the user json web troken
        const newUser = new User({
            firstName,
            lastName,
            email,
            Password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random()* 10000)

        });
        const savedUser =await newUser.save();
        // send the user : 201 -> means something has been created
        res.status(201).json(savedUser)

    }
    catch(err){

        res.status(500).json({error:err.message})

    }

    
}

// login

export const login=async(req,res)=>{

    try{
        const {email, password}=req.body

        const user=await User.findOne({email:email});
        console.log("user is", user)
        if(!user) return res.status(400).json({msg:"user not found"})
        const isMatch=await bcrypt.compare(password, user.Password);
       if(!isMatch) return res.status(400).json({msg:"invalid creditial"})

       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
       delete user.password;

       res.status(200).json({token,user});
    }
    catch(err){

        console.log(err)

        res.status(500).json({error:err.message})

    }
}