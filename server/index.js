// npm i bcrypt dotenv gridfs-stream multer multer-gridfs-storage helmet morgan 
// jsonwebtoken mongoose

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { register } from "module"

// only when we use the type modules
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb"}))
app.use(cors());
import authRoutes from './Routes/auth.js'
app.use("/assets", express.static(path.join(__dirname, 'public/assests')));
// set the directory of where we are keeping the assests we are storing here locally , 
// but in real life -> cloud storage 

// file storage  : all this info is from github repo of multer 
// any time someon uploads a file in your website , itsn going to be saved in this particular folder
const storage=multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload= multer ({storage})

// auth
app.post("/auth/register", upload.single("picture"), register)


app.use("/auth", authRoutes)









// mongoose set up
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    //useUnifiedTopology: true, deprecated
}).then (()=>{
    app.listen(PORT, ()=>{
        console.log('server port running')
    })
}).catch((err)=> console.log(err))