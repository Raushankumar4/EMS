// register user

const ErrorHanlder = require("../middleware/errorHandler.js");
const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const {
  generateToken,
  setCookie,
  removeCookie,
} = require("../utils/generateToken.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

//Register User
const register = ErrorHanlder(async (req, res) => {
  const { name, email, password, jobTitle, department } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: "All Fields are required" });
  }
  if (password.length <= 10) {
    return res.status(404).json({ message: "Password Must Be 10 digit" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "User Already Exist" });
  }
  const user = await User.create({
    name,
    password: hashPassword,
    email,
    jobTitle,
    department,
  });
  return res.status(200).json({ message: "registerd", user });
});

// login User
const loginUser = ErrorHanlder(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "Invalid email or password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "User Not Found" });
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    return res.status(403).json({ message: "Password Inavalids" });
  }

  const token = generateToken(user);

  setCookie(res, token);

  return res.json({
    message: "Login SuccessFully",
    token,
  });
});

// Logout User

const logoutUser = ErrorHanlder(async (req, res) => {
  removeCookie(res);
  return res.status(200).json({ message: "Logout Successfully" });
});
// crrate

// const path = require("path");

// const createGame = ErrorHanlder(async (req, res) => {
//   const { sirname } = req.body;

//   if (!sirname) {
//     return res.status(400).json({ message: "Sirname is required" });
//   }

//   const profileImageFile = req.files.profileImage
//     ? req.files.profileImage[0]
//     : null;
//   const videoFiles = req.files.video || [];

//   if (!profileImageFile) {
//     return res.status(404).json({ message: "Profile image not found" });
//   }

//   const profileImagePath = profileImageFile.path;
//   const videoPaths = videoFiles.map((videoFile) =>
//     path.normalize(videoFile.path).replace(/\\/g, "/")
//   );

//   const game = await Game.create({
//     sirname: sirname,
//     profileImage: profileImagePath.replace(/\\/g, "/"),
//     video: videoPaths,
//   });

//   return res.status(200).json({
//     message: "Game created successfully",
//     game,
//   });
// });

// change password

const changePassword = ErrorHanlder(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  if (!oldPassword || !newPassword) {
    return res.status(404).json({ message: "All Fields are required" });
  }

  if (newPassword.length < 10) {
    return res.status(404).json({ message: "Password Must Be 10 digit" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const comparedPassword = await bcrypt.compare(oldPassword, user.password);

  if (!comparedPassword) {
    return res.status(404).json({ message: "Password Inavalids" });
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  await user.save();
  return res.status(200).json({ message: "Password Updated Successfully" });
});

module.exports = { register, loginUser, logoutUser, changePassword };
