// Creating task for employee

const ErrorHandler = require("../middleware/errorHandler.js");
const User = require("../model/userModel.js");
const Task = require("../model/workModel.js");

const createTask = ErrorHandler(async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const { emoployeId } = req.params;

  if (!title || !emoployeId || !description || !dueDate) {
    return res.status(404).json({ message: "All Fields are required" });
  }
  const user = await User.findById(emoployeId);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    employeId: emoployeId,
  });
  if (!task) {
    return res.status(404).json({ message: "Task Not Created" });
  }
  user.myTask.push(task._id);
  await user.save();
  return res.status(200).json({
    message: "Task Created Successfully",
    task,
  });
});

// Update Task

const updatetask = ErrorHandler(async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const { taskId } = req.params;
  if (!title || !description || !dueDate || !status) {
    return res.status(404).json({ message: "All Fields are required" });
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task Not Found" });
  }
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.status = status;
  await task.save();
  // const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  return res.status(200).json({ message: "Task Updated Successfully", task });
});

// delete Task

const deleteTask = ErrorHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  await Task.findByIdAndDelete(taskId);

  const user = await User.findById(task.employeId);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const index = user.myTask.indexOf(taskId);
  if (index !== -1) {
    user.myTask.splice(index, 1);
    await user.save();
  }

  return res.status(200).json({ message: "Task Deleted Successfully" });
});

// get all completed task

const allCompletedTask = ErrorHandler(async (req, res) => {
  const completedTask = await Task.find({ status: "completed" });
  if (!completedTask) {
    return res.status(404).json({ message: "Task Not Found" });
  }
  res.status(200).json({ completedTask });
});
// get pending task

const getPendingTask = ErrorHandler(async (req, res) => {
  const pendingTask = await Task.find({ status: "pending" });
  if (!pendingTask) {
    return res.status(404).json({ message: "Task Not Found" });
  }
  res.status(200).json({ pendingTask });
});
// get uncompleted task of employee
const getallUncompletedTask = ErrorHandler(async (req, res) => {
  const allUncompletedTask = await Task.find({ status: "in-progress" });
  if (!allUncompletedTask) {
    return res.status(404).json({ message: "Task Not Found" });
  }
  res.status(200).json({ allUncompletedTask });
});

module.exports = {
  createTask,
  updatetask,
  deleteTask,
  getPendingTask,
  allCompletedTask,
  getallUncompletedTask,
};
