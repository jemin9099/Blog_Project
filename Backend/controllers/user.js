
const cloudinary = require('../config/cloudinary')
const User = require('../Models/userModel') 
const handleError = require('../helpers/handleError')

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    if (!user) {
      return next(handleError.handleError(404, 'User not found'));
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio, password } = req.body;
    console.log(req.file);
    
    const user = await User.findById(id);

    if (!user) {
      return next(handleError.handleError(404, 'User not found'));
    }

    user.name = name;
    user.email = email;
    user.bio = bio;

    if (password && password.length > 0) {
      const hashedPassword = await bcrypt.hashSync(password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'usersAvatars',
          resource_type: 'auto',
        }
      );
      user.avatar = uploadResult.secure_url;
    }

    await user.save();
    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    return res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();    
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(handleError.handleError(500, error.message));
}
}
module.exports = {
    getUserById,
    updateUserById,
    getAllUsers
}