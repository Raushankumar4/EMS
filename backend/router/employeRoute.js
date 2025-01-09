const express = require("express");
const {
  getMyTask,
  updateTaskStatus,
  markTaskAsCompleted,
  getCompletedTask,
  getUncompletedTask,
  getProfile,
  getAllUser,
  updateProfile,
} = require("../controllers/employe.js");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticate.js");

const router = express.Router();

router.route("/getMyTask/:emoployeId").get(isAuthenticated, getMyTask);
router
  .route("/updateTaskStatus/:taskId")
  .put(isAuthenticated, updateTaskStatus);
router
  .route("/markAsCompleted/:taskId")
  .put(isAuthenticated, markTaskAsCompleted);

router
  .route("/completed-task/:emoployeId")
  .get(isAuthenticated, getCompletedTask);
router
  .route("/uncompleted-task/:emoployeId")
  .get(isAuthenticated, getUncompletedTask);
router.route("/getProfile").get(isAuthenticated, getProfile);
router.route("/updateProfile").put(isAuthenticated, updateProfile);

router.route("/getAllUser").get(isAuthenticated, isAdmin, getAllUser);

module.exports = router;
