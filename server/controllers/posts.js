import Post from "./modals/posts";
import User from "./modals/user";

// create ppost 
export const createPost = async(req,res)=>{
    try{
        const {userId, description, picturePath}=req.body;
        const user=await User.findById(userId);
        const newPost= new Post({
            userId,
            firstName:user.firstName,
            lastName: user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save()

        const post =await Post.find();
        res.status(201).json(post)

    }
    catch(err){
        res.status(409).json({message:err.message})
    }
}

// get all the posts of user
export const getFeedPosts=async(req, res)=>{

}