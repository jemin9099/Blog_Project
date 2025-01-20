const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Category"
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
},{timestamps: true})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog