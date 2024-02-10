import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import  User  from "./modals/user"
import User from "./modals/user"

// register user
export const register=async(req, res)=>{

    try{
        const {
            firstName,
            LastName,
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
        const newUser = new User({
            firstName,
            LastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,

        })

    }
    catch(err){

    }

    
}