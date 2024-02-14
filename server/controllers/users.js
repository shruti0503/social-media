import User from "./modals/user";

// read 
// file
export const getUser =async(req, res)=>{

    try{
        const {id}=req.params;
        const user =await User.findById(id);
        res.status(200).json(user);

    }
    catch(err){
        res.status(404).json({message})
    }
}


export const getUserFriends = async (req, res) => {
    try {
      // get the user id
      const { id } = req.params;
  
      // Find the user by id
      const user = await User.findById(id);
  
      // Make multiple API calls to get friends
      const friendPromises = user.friends.map((friendId) => User.findById(friendId));
      
      // Wait for all promises to resolve
      const friends = await Promise.all(friendPromises);
  
      // Format the friends data
      const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      });
  
      // Send the formatted friends data in the response
      res.status(200).json(formattedFriends );
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(404).json({ error: 'Internal Server Error' });
    }
  };


export const addRemoveFriend= async(req,res)=>{
  try{
    const {id,friendId}=req.params;
    const user =await User.findById(id);
    const friend= await User.findById(friendId);

    if(user.friends.includes(friendId)){

      user.friends=user.friends.filter((id)=> id!== friendId);
      friend.friends=friend.friends.filter((id)=> id !== id);

    }

    else{
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(friendPromises);
  
    // Format the friends data
    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends)
    
  }
  catch(err){
    res.status(404).json({message:err.message})

  }
}


  