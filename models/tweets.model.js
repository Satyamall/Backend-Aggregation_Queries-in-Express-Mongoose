

const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: {type: String, required: true},
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    author_id: {type: Number, required: true},
    no_of_likes: {type: Number, required: true}
},
{versionKey: false}
)

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;

