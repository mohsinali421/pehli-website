const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

 //GET /admin/add-product
  router.get('/add-product',isAuth,adminController.getAddProduct);
  router.post('/add-product',isAuth,adminController.postProduct);
   router.get('/product',isAuth,adminController.getAdminProduct);
   router.post('/delete-product',isAuth,adminController.postdeleteProduct);
   router.get('/edit-product/:id',isAuth,adminController.getEditProduct);
  router.post('/edit-product',isAuth,adminController.postEditProduct);
  
 
  
 
module.exports = router;