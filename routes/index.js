const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller")


router.get("/", homeController);
router.use("/task",require("./add_task"));
router.use("/show_history",require("./show_history"));

module.exports = router;