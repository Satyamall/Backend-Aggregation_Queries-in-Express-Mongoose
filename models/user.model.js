
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    country: {type: String, required: true}
},
{versionKey: false}
)

const User = mongoose.model("users", userSchema);

module.exports = User;

