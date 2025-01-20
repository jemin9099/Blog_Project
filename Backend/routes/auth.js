const express = require("express");
const { Register , Login , GoogleLogin} = require("../controllers/Auth");
const router = express.Router();

router.post("/signup", Register)
router.post("/login", Login)
router.post("/google-login", GoogleLogin)

module.exports = router