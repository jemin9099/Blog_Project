const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const blogRoutes = require('./routes/blog')
const commentRoutes = require('./routes/comment')
const LikeRoute = require("./routes/like");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express()
const port = process.env.PORT
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/auth' , authRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/category' , categoryRoutes)
app.use('/api/blogs' , blogRoutes)
app.use('/api/comments' , commentRoutes)
app.use('/api/like' , LikeRoute)
mongoose.connect(process.env.MONGO_URL).then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
})
.catch((err) => {
    console.error(`Error: ${err.message}`);
        process.exit(1);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})