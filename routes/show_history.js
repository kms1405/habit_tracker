const express = require("express");
const router = express.Router();

const historyController = require("../controllers/showHistory");

// History page routes
router.get('/', historyController.showHistoryController);


module.exports = router;