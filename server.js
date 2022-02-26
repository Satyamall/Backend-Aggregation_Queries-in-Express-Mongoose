
const express = require('express');
const app = express();
const cors = require('cors');

const connect = require('./config/db');
const usersController = require("./controllers/user.controler");
const tweetsController = require("./controllers/tweet.controller");
const User = require('./models/user.model');
const Tweet = require('./models/tweets.model');

app.use(cors());
app.use(express.json());

app.use("/users", usersController);
app.use("/tweets", tweetsController);

app.get("/top10users", async(req,res)=>{
    try{
         const tweets = await Tweet.aggregate([
            {
                $group: {
                    _id: "$text",
                    average_no_of_likes: {
                        $avg: "$no_of_likes"
                    },
                    average_size_of_tags: {
                       $avg: { $size: "$tags" }
                    }
                }
            },
            {
                $sort: {
                    average_no_of_likes: -1
                }
            },
            {
                $limit: 10
            }
         ])

         return res.status(200).json({data: tweets})
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})

app.get("/groupByTags", async(req,res)=>{
    try{
         const tweets = await Tweet.aggregate([
            {
                $lookup: {
                   from: "users",
                   localField: "tags",
                   foreignField: "_id",
                   as: "users"
                }
            },
            {
                $group: {
                    _id: "$users",
                    average_no_of_likes: {
                        $avg: "$no_of_likes"
                    }
                }
            },
         ]);

         return res.status(200).json({data: tweets})
    }
    catch(err){
        return res.status(500).json({status: "failed", message: "Something Went wrong!"});
    }
})


const start = async ()=>{

    await connect();

    app.listen(5000,()=>{
        console.log("Listening on port 5000");
    })
}

module.exports = start;