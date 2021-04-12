const express = require('express');
const practiceContrller = require('../controllers/practice');
const router = express.Router();

router.get('/', practiceContrller.getPracticeController)

module.exports = router;