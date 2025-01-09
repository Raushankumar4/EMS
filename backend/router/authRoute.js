const express = require("express");
const {
  register,
  loginUser,
  logoutUser,
  createGame,
  changePassword,
} = require("../controllers/authentication.js");
const { isAuthenticated } = require("../middleware/isAuthenticate.js");
// const isAuthenticated = require("../middleware/isAuthenticate.js");
// const upload = require("../middleware/multer.js");

const router = express.Router();

// const fieldsConfig = [
//   { name: "profileImage", maxCount: 1 }, // Single profile image
//   { name: "video", maxCount: 5 }, // Up to 5 videos
// ];

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/change-password/:id").put(isAuthenticated, changePassword);
// router
//   .route("/create")
//   .post(isAuthenticated, upload.fields(fieldsConfig), createGame);

module.exports = router;
