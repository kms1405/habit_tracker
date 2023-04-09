const express= require("express");
const router = express.Router();

const TaskController = require("../controllers/addTaskController");

// Task routes
router.get('/',TaskController.addTaskForm);
router.post('/create',TaskController.createTask);
router.post('/update',TaskController.UpdateTask);

module.exports = router;