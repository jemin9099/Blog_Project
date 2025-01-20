const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    blogId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Blog"
    },
},{timestamps: true})

const Like = mongoose.model("BlogLike", likeSchema);

module.exports = Like