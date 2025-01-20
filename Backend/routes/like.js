const express = require('express')
const {doLike , likeCount} = require('../controllers/blogLike')
const authToken = require("../middleware/authToken");
const router = express.Router()

router.post('/',authToken, doLike)
router.get('/count',authToken, likeCount)
module.exports = router