const express= require("express");
const router = express.Router();

const TaskController = require("../controllers/addTaskController");


router.get('/',TaskController.addTaskForm);
router.post('/create',TaskController.createTask);


module.exports = router;