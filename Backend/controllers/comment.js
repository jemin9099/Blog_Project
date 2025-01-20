const handleError = require("../helpers/handleError");
const Comment = require("../Models/comment")
const addComment = async (req, res, next) => {
    try {
        const { blogId, comment } = req.body;
        const newComment = new Comment({
            author: req.user.id,
            blogId,
            comment,
        });
        await newComment.save();
        res.status(201).json({
            success: true,
            message: "Comment added successfully",
        });
    } catch (error) {
        next(handleError.handleError(500, error.message));
    }
};

const getById = async (req, res, next) => {
    try {
        const { blogId } = req.query;
        
        const comment = await Comment.find({ blogId }).populate('author' , 'name avatar').sort({ createdAt: -1 }).lean().exec();
        if (!comment) {
            return next(handleError.handleError(404, "Comment not found"));
        }
        return res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        return next(handleError.handleError(500, error.message));
    }
}

const countallComments = async (req, res, next) => {
    try {
        const { blogId } = req.query;
        const count = await Comment.countDocuments({ blogId });
        res.status(200).json({
            success: true,
            data: count,
        });
    } catch (error) {
        next(handleError.handleError(500, error.message));
    }
}
const getallComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate('author' , 'name').populate('blogId' , 'title').sort({ createdAt: -1 }).lean().exec();        
        res.status(200).json({
            success: true,
            data: comments,
        });
    } catch (error) {
        next(handleError.handleError(500, error.message));
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        next(handleError.handleError(500, error.message));
    }
}
module.exports = {
    addComment,
    getById,
    countallComments,
    getallComments,
    deleteComment
};