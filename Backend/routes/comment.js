const express = require("express");
const { addComment , getById , countallComments ,getallComments , deleteComment} = require("../controllers/comment");
const authToken = require("../middleware/authToken");
const router = express.Router();

router.post('/add',authToken, addComment)
router.get('/',authToken, getById)
router.get('/all',authToken, getallComments)
router.get('/count',authToken, countallComments)
router.delete('/:id',authToken, deleteComment)

module.exports = router