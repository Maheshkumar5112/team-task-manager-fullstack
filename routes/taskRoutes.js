const router = require("express").Router();

const {
  createTask,
  getTasks,
  updateTask,
  getDashboard
} = require("../controllers/taskController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createTask);
router.get("/", protect, getTasks);
router.get("/dashboard", protect, getDashboard);
router.patch("/:id", protect, updateTask);

module.exports = router;