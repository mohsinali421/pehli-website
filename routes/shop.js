const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

//GET /
  router.get('/',shopController.getIndex);
  router.get('/products/:_id',shopController.getProductID);

module.exports = router;
