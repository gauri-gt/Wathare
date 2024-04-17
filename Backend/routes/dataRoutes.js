const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Define routes
//router.post('/import', dataController.importData);
//router.get('/summary', dataController.generateSummary);
router.get('/filter', dataController.filterData);

module.exports = router;
