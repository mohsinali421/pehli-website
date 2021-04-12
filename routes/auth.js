const express = require('express');
const User = require('../models/user');
const {check,body} = require('express-validator/check');
const router = express.Router();
const authController = require('../controllers/auth');
const bcrypt = require('bcryptjs');
 
 router.get('/login',authController.getLoginPage);     //GET /login
 router.post('/login',
 [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.'),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],authController.postLoginPage);  //POST /login
 router.post('/logout',authController.LogoutPage);    //POST /logout
 router.get('/signup',authController.getSignUpPage);   //GET /signup
 router.post('/signup',
[
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
  ]
,authController.postSignUpPage); //POST /signup

module.exports = router;
 