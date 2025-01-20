const upload = require("../config/multer");

const express = require("express");
const { getUserById , updateUserById ,getAllUsers} = require("../controllers/user");
const authToken = require("../middleware/authToken");
const router = express.Router();

router.get("/",authToken, getAllUsers)
router.get("/:id",authToken, getUserById)
router.put("/:id",authToken, upload.single('file'),updateUserById)
module.exports = router