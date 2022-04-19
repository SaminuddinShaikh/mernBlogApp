const router = require("express").Router();
const User = require("../models/User");      // require is importing
const bcrypt = require('bcrypt');       // for pass hide i npm bcrypt

//SignUP
router.post("/signUp", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass        //req.body.password
        })                                        //User is User.js from modal folder   try and catch

       const user = await newUser.save();       //SAVE METHOD COMING FROM MONGOOSE BE USING USER SCHEMA
       res.status(200).json(user);              // in place of user can send any message string in response i.e res
    }catch(err){
        return res.status(500).json(err);
    }
})

//LogIn
router.post("/login", async (req,res) => {
    try{
       const user = await User.findOne({username: req.body.username})     //try to find or fetch user jason in mono db  findOne is in built method
       if(!user){
        return res.status(400).json("Wrong credentials!");
       }

       const validate = await bcrypt.compare(req.body.password, user.password)  //compare pass word from bcrypt understand
       if (!validate) {
        return res.status(400).json("Wrong credentials!");
       }

       const {password, ...others}= user._doc;          //for not showing pass in response jason
       res.status(200).json(others);
    }catch(err){
      return  res.status(500).json(err);
    }
});

module.exports =  router;