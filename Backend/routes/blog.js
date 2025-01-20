const express = require("express");
const { addBlog , allBlogs , getBlogById, updateBlog , deleteBlog , getBlogByCategory , filterByName} = require("../controllers/blog");
const authToken = require("../middleware/authToken");
const upload = require("../config/multer");
const router = express.Router();

router.post('/add',authToken , upload.single('file'),addBlog)
router.get('/all',authToken , allBlogs)
router.get('/:id',authToken, getBlogById)
router.put('/:id',authToken, upload.single('file'),updateBlog)
router.delete('/:id',authToken, deleteBlog)
router.get('/category/:categoryID',authToken, getBlogByCategory)
router.get('/',authToken, filterByName)
module.exports = router