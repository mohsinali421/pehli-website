const User = require('../models/user');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: false,
    validationError:[],
    oldInput: {
      email: '',
      password: ''
    }
  });
};
  
exports.getSignUpPage = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: false,
    validationError:[]
  });
};
 
exports.postLoginPage = (req, res, next) => {
  const myemailId = req.body.email;
  const mypassword = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('auth/login',{
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      validationError: errors.array(),
      oldInput: {
        email: myemailId,
        password: mypassword
      }
     

    })
  }

User.findOne({ email: myemailId })
.then(user => {
  if (!user) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: 'Invalid email or password.',
      oldInput: {
        email: myemailId,
        password: mypassword
      },
      validationErrors: []
    });
  }
  bcrypt
    .compare(mypassword, user.password)
    .then(doMatch => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: 'Invalid email or password.',
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: []
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/login');
    });
})
.catch(err => console.log('Error is',err));
};



exports.postSignUpPage = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      validationError : errors.array()
    })
  }
  bcrypt.hash(password,12)
      .then(hashpassword => {
        const user = new User({
          email:email,
          password: hashpassword});
        return user.save();         
        })
        .then(result => {
          console.log('new user created!');
          return res.redirect('/login');
        })
    .catch(err => {
    console.log('user auth error2 = ',err);
  }) 
};

exports.LogoutPage = (req, res, next) => {
  req.session.destroy(err => {
    console.log('log out2!')
    res.redirect('/');
  });
};
