const mongoose = require("mongoose");

// Post Schema
const postSchema = mongoose.Schema({
title:String,
body:String,
device:String,
no_of_comments: Number,
UserID:String,
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {PostModel};
