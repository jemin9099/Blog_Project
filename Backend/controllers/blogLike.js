const handleError = require("../helpers/handleError");
const Like = require("../Models/like");
const doLike = async (req, res, next) => {
  try {
    const { blogId } = req.body;
    let like;
    like = await Like.findOne({ user: req.user.id, blogId });
    if (like) {
      await Like.findByIdAndDelete(like._id);
    }
    else{
        const newLike = new Like({
          user: req.user.id,
          blogId,
        });
       like =  await newLike.save();
    }

    const totalLikes = await Like.countDocuments({ blogId });
    res.status(201).json({
      success: true,
      data: totalLikes,
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
};

const likeCount = async (req, res, next) => {
  try {
    const { blogId } = req.query;
    const count = await Like.countDocuments({ blogId });
    const userid = req.user.id
    let isUserLike = false;
    if (userid) {
      const userLike = await Like.countDocuments({ user: userid, blogId });
      if (userLike > 0) {
        isUserLike = true;
      }
    }
    res.status(200).json({
      success: true,
      data: count,
      isUserLike
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
};

module.exports = {
  doLike,
  likeCount,
};
