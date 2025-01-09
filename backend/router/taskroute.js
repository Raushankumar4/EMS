const express = require("express");
const {
  createTask,
  updatetask,
  deleteTask,
  allCompletedTask,
  getPendingTask,
  getallUncompletedTask,
} = require("../controllers/admin.js");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticate.js");

const router = express.Router();

router
  .route("/createTask/:emoployeId")
  .post(isAuthenticated, isAdmin, createTask);
router.route("/updateTask/:taskId").put(isAuthenticated, isAdmin, updatetask);
router.route("/delete/:taskId").delete(isAuthenticated, isAdmin, deleteTask);
router
  .route("/allCompletedTask")
  .get(isAuthenticated, isAdmin, allCompletedTask);

router
  .route("/getAllPendingTask")
  .get(isAuthenticated, isAdmin, getPendingTask);
router
  .route("/getallUncompletedTask")
  .get(isAuthenticated, isAdmin, getallUncompletedTask);

module.exports = router;
