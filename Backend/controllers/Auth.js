const handleError = require('../helpers/handleError')
const bcrypt = require('bcryptjs')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
 const Register = async (req ,res , next) => {
    try {
        const {name , email , password} = req.body
        const user = await User.findOne({email})

        if(user){
            //user already exists
           next(handleError.handleError(409 , 'User already exists'))
        }
        const  hasedPassword = await bcrypt.hashSync(password , 10)
        const newUser =  new User({name , email , password: hasedPassword})
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}
const GoogleLogin = async (req , res , next) => {
    try {
        const { email , name , avatar} = req.body
        let user 
        user = await User.findOne({email})

        if(!user){
            //create new user
            const password = Math.round(Math.random() * 1000000).toString()
            const hashedPassword = await bcrypt.hashSync(password , 10)
            console.log(hashedPassword);
            
            const newUser =  new User({name, email , password: hashedPassword , avatar})
            await newUser.save()
            user = newUser
        }

        const token = jwt.sign({id: user._id , name: user.name , email: user.email} , process.env.JWT_SECRET , {expiresIn: '30d'})
        res.cookie('token' , token , {
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path:'/'
        })
        const resData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            token
        }
        return res.status(200).json({
            success: true,
            data: resData,
            message: 'User logged in successfully'
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}
const Login = async (req , res , next) => {
    try {
        const { email , password} = req.body
        const user = await User.findOne({email})

        if(!user){
            //user not found
           next(handleError.handleError(400 , 'Invalid login credentials'))
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            //password is not correct
           next(handleError.handleError(400 , 'Invalid login credentials'))
        }

        const token = jwt.sign({id: user._id , name: user.name , email: user.email} , process.env.JWT_SECRET , {expiresIn: '30d'})
        res.cookie('token' , token , {
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path:'/'
        })
        const resData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
        return res.status(200).json({
            success: true,
            data: resData,
            message: 'User logged in successfully'
        })
    } catch (error) {
        next(handleError.handleError(500 , error.message))
    }
}
module.exports = {
    Register,
    Login,
    GoogleLogin
}