const router = require("express").Router();
const User = require("../models/User");      // require is importing
const Post = require("../models/Post");

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });

//CREATE POST
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost)
    }catch(err){
        return res.status(500).json(err);
    }
    });

// UPDATE POST
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userID === req.body.userID){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                return res.status(200).json(updatedPost);
            } catch (err) {
                return res.status(500).json(err);
            }
        }else{
            return res.status(401).json("you can update only your post!");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

    //DELETE POST
    router.delete("/:id", async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try {
                    await post.delete();
                    return res.status(200).json("post has been deleted");
                } catch (err) {
                    return res.status(500).json(err);
                }
            }else{
                return res.status(401).json("you can update only delete your post!");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    });

    //GET POST
    router.get("/:id", async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            return res.status(200).json(post);
        }catch(err){
            return res.status(500).json(err)
        }
    });

    //GET ALL POST

    router.get("/", async(req,res)=>{
        const username= req.query.user;
        const catName= req.query.cat;

        try{
            let posts;
            if(username){
                posts = await Post.find({username});
            }else if(catName){
                posts = await Post.find({categories:{$in:[catName]}});    //$in:catNAme to match categories from post model
            }else{
                posts = await Post.find();
            }
            return res.status(200).json(posts);
        }catch(err){
            return res.status(500).json(err)
        }
    });


module.exports =  router;