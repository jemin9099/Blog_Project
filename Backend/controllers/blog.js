const cloudinary = require("../config/cloudinary");
const Blog = require("../Models/blogModel");
const handleError = require("../helpers/handleError");
const { encode } = require("entities");
const addBlog = async (req, res, next) => {
  try {
    const { author, title, slug, description, category } = req.body;
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "Blogs",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }
    const newBlog = new Blog({
      author: author,
      title,
      slug,
      category,
      image: featuredImage,
      description: encode(description),
    });
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
};

const allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author, title, slug, description, category } = req.body;
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "Blogs",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        author: author,
        title,
        slug,
        category,
        image: featuredImage,
        description: encode(description),
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    next(handleError.handleError(500, error.message));
  }
}

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id })
    if (!blog) {
      return next(handleError.handleError(404, "Blog not found"));
    }
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
  }
}

const getBlogByCategory = async (req, res, next) => {
  try {
    const { categoryID } = req.params;
    const blog = await Blog.find({ category: categoryID }).populate("author", "name").populate("category", "name").exec();;
    if (!blog) {
      return next(handleError.handleError(404, "Blog not found"));
    }
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
  }
}

const filterByName = async (req, res, next) => {
  try {
    const { title } = req.query;
    
      const blog = await Blog.find({ title: title }).populate("author").populate("category", "name").exec();
    if (!blog) {
      return next(handleError.handleError(404, "Blog not found"));
    }
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
  }
}

module.exports = {
  addBlog,
  allBlogs,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogByCategory,
  filterByName
};
