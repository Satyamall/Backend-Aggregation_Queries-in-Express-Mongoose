

const express = require("express");
const router = express.Router();

const Tweet = require('../models/tweets.model');

router.post("/", async(req,res)=>{
    try{
          const tweet = await Tweet.create(req.body);
          if(!tweet) return res.status(404).json({message: "Tweet not created"});

          res.status(201).json({data: tweet});
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})

router.get("/", async(req,res)=>{
    try{
          const tweets = await Tweet.find({}).populate("tags");
          if(!tweets) return res.status(404).json({message: "Tweets not found"});

          res.status(201).json({data: tweets});
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})


module.exports = router;

