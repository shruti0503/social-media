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
    // extracting id of friends from params
    const {id,friendId}=req.params;
    const user =await User.findById(id);
    const friend= await User.findById(friendId);

    // if in users friends list (that particular friend exists)

    if(user.friends.includes(friendId)){
      // which means it keeps only those elements whose value is not equal to friendId.

      user.friends=user.friends.filter((id)=> id!== friendId);
      // remove from other friend's well
      friend.friends=friend.friends.filter((id)=> id !== id);

    }

    else{
      // add the friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    // save th user modal
    await user.save();
    // save the friend modal
    await friend.save();
    

    // user.friends is an array containing friend IDs.
    //  iterate over each element in the user.friends array.
    // function call that fetches user data based on the provided friend ID.
    const friendPromises = user.friends.map((friendId) => User.findById(friendId));
    //  creating an array of promises (friendPromises), where each promise represents the result of fetching user data for a particular friend ID using the User.findById function. 

    // Promise.all(friendPromises) to handle all the promises concurrently and wait for all of them to resolve before proceeding.
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


  