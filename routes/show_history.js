const express= require("express");
const router = express.Router();

const historyController = require("../controllers/showHistory");


router.get('/',historyController.showHistoryController);


module.exports = router;