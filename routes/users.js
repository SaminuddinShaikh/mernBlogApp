const router = require("express").Router();
const User = require("../models/User");      // require is importing
const Post = require("../models/Post");
const bcrypt = require("bcrypt"); 


//UPDATE USER PROF
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,                                                 
            },{new:true});        //new true to reflect the changes api from the server  to $set set te updated details of user and in up findbyand update inbuilt method                  
          return res.status(200).json(updatedUser)
        }catch(err){   
           return res.status(500).json(err);
        }
    } else{
        return res.status(401).json("Please Update only your account!");
    }
    });

// DELETE USER ACCOUNT
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        
        try{
            const user = await User.findById(req.params.id);      //to delete deleted uder post 
            try{
                  await Post.deleteMany({username: user.username})   // username given in the Post model if match delete the kuser Post jason 
                await User.findByIdAndDelete(req.params.id)
                return res.status(200).json("user has been deleted...");
            }catch(err){   
                return res.status(500).json(err);
            }
        }catch(err){   
          return res.status(404).json("user not found!");
        }
    } else{
        return res.status(401).json("You can delete only your account!");
    }
    });

    //GET USER
    router.get("/:id", async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            return res.status(200).json(others);
        }catch(err){
            return res.status(500).json(err)
        }
    });

module.exports =  router;