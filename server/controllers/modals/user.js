import { Password } from "@mui/icons-material"
import  mongoose  from "mongoose"

const UserSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        LastName:{
            type:String,
            required:true,
            min:2,
            max:50,

        },
        email:{
            type:String,
            required:true,
            unique:true,
            max:50,

        },
        Password:{
            type:String,
            default:"",
            min:5,
            max:50,
        },
        picturePath:{
            type:String,
            default:"",
        },
        friends:{
            type:Array,
            default:[]
        },
        location: String,
        occupation:String,
        viewedProfile: Number,
        impressions: Number,
    },
    {timestamps:true}
)

const User = mongoose.model("User",UserSchema)
export  default User