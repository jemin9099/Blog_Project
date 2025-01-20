const Category = require('../Models/categoryModel')
const handleError = require('../helpers/handleError')
 const addCategory = async (req , res , next) => {
    try {
        const { name , slug } = req.body
        const newCategory = new Category({ name , slug})
        await newCategory.save()
        res.status(201).json({
            success: true,
            message: 'Category created successfully'
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}

const allCategories = async (req , res , next) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}

const updateCategory = async (req , res , next) => {
    try {
        const { id } = req.params
        const { name , slug } = req.body
        const updatedCategory = await Category.findByIdAndUpdate(id , { name , slug} , { new: true })
        res.status(200).json({
            success: true,
            data: updatedCategory
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}

const deleteCategory = async (req , res , next) => {
        try {
            const { id } = req.params
            await Category.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                message: 'Category deleted successfully'
            })
        } catch (error) {
            next(handleError.handleError(500 , error.message))
        }
}
module.exports = {
    addCategory,
    allCategories,
    updateCategory,
    deleteCategory
}