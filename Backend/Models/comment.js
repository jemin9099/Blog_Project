const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    blogId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Blog"
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps: true})

const comment = mongoose.model("Comment", commentSchema);

module.exports = comment