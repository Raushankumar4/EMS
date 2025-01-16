const ErrorHandler = require("../middleware/errorHandler.js");
const User = require("../model/userModel");
const Task = require("../model/workModel.js");

// Get My Task
const getMyTask = ErrorHandler(async (req, res) => {
  const { emoployeId } = req.params;

  const user = await User.findById(emoployeId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  // const task = await Task.find({ _id: { $in: user.myTask } });
  const task = await Task.find({ employeId: emoployeId });

  if (!task) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  res.status(200).json({ task });
});

// update your task status
const updateTaskStatus = ErrorHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  const user = await User.findById(task.employeId);
  if (task.status === "pending") {
    task.status = "in-progress";
    user.unCompletedTask.push(task._id);
    await user.save();
  } else if (task.status === "in-progress") {
    task.status = "completed";
    user.totalCompletedTask.push(task._id);
    await user.save();
  } else {
    task.status = "pending";
    const index = user.totalCompletedTask.indexOf(taskId);
    if (index !== -1) {
      user.totalCompletedTask.splice(index, 1);
      await user.save();
    }
    const index2 = user.unCompletedTask.indexOf(taskId);
    if (index2 !== -1) {
      user.unCompletedTask.splice(index2, 1);
      await user.save();
    }
  }
  await task.save();
  return res
    .status(200)
    .json({ message: "Task Updated Successfully", status: task.status });
});

// nmark task as completed

const markTaskAsCompleted = ErrorHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  const user = await User.findById(task.employeId);
  if (task.status === "pending") {
    task.status = "completed";
    user.totalCompletedTask.push(task._id);
    const index = user.unCompletedTask.indexOf(taskId);
    if (index !== -1) {
      user.unCompletedTask.splice(index, 1);
    }
    await user.save();
    await task.save();
  } else {
    task.status = "pending";
    const index = user.totalCompletedTask.indexOf(taskId);
    if (index !== -1) {
      user.totalCompletedTask.splice(index, 1);
      await user.save();
      await task.save();
    }
  }
  return res
    .status(200)
    .json({ message: "Task Updated Successfully", status: task.status });
});

// get completed task

const getCompletedTask = ErrorHandler(async (req, res) => {
  const { emoployeId } = req.params;

  const user = await User.findById(emoployeId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const task = await Task.find({ _id: { $in: user.totalCompletedTask } });

  if (!task) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  res.status(200).json({ task });
});

// get uncompleted task

const getUncompletedTask = ErrorHandler(async (req, res) => {
  const { emoployeId } = req.params;

  const user = await User.findById(emoployeId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const task = await Task.find({ _id: { $in: user.unCompletedTask } });

  if (!task) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  res.status(200).json({ task });
});

// get Profile

const getProfile = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  res.status(200).json({ user });
});
// update Profile

const updateProfile = async (req, res) => {
  // const user = await User.findByIdAndUpdate(req.user, req.body, {
  //   new: true,
  // });
  // if (!user) {
  //   return res.status(404).json({ message: "User Not Found" });
  // }
  // res.status(200).json({ user });

  const { name, email, jobTitle, department } = req.body;
  const user = await User.findById(req.user).exec();
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  user.name = name;
  user.email = email;
  user.jobTitle = jobTitle;
  user.department = department;
  await user.save();
  res.status(200).json({ User: user.name, email: user.email });
};

// get all user expect me

const getAllUser = ErrorHandler(async (req, res) => {
  const user = await User.find({ _id: { $ne: req.user } }).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  if (user.role === "admin") {
    return res.status(404).json({ message: "Admin User Not Found" });
  }
  res.status(200).json({ user });
});



module.exports = {
  getMyTask,
  updateTaskStatus,
  markTaskAsCompleted,
  getCompletedTask,
  getUncompletedTask,
  getProfile,
  getAllUser,
  updateProfile,
};
