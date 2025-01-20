const {addCategory , allCategories , updateCategory , deleteCategory} = require('../controllers/category')
const express = require('express')
const authToken = require("../middleware/authToken");
const router = express.Router()

router.post('/add',authToken, addCategory)
router.get('/all',authToken , allCategories)
router.put('/update/:id',authToken, updateCategory)
router.delete('/:id',authToken, deleteCategory)
module.exports = router