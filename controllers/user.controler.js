
const express = require("express");
const router = express.Router();

const User = require('../models/user.model');

router.post("/", async(req,res)=>{
    try{
          const user = await User.create(req.body);
          if(!user) return res.status(404).json({message: "User not created"});

          res.status(201).json({data: user});
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})

router.get("/", async(req,res)=>{
    try{
          const users = await User.find({});
          if(!users) return res.status(404).json({message: "User not found"});

          res.status(201).json({data: users});
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})

module.exports = router