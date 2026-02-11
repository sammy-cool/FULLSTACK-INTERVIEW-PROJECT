const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

// All routes are protected
router.use(protect);

router.route("/").get(getTasks).post(createTask);
router.route("/stats/summary").get(getTaskStats);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
