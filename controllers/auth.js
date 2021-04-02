const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};
  
exports.getSignUpPage = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};
 
exports.postLoginPage = (req, res, next) => {
  const myemailId = req.body.email;
  const mypassword = req.body.password;
  User.findUserbyId(myemailId)
  .then(user => {
    if(user){  
      bcrypt.compare(mypassword, user.password)
      .then(doMatch => {
        if(doMatch){
          req.session.isLoggedIn = true;
          console.log('Logged In')
          res.redirect('/');
        }
        res.redirect('/login');
      })
      .catch( err => {
        res.redirect('/');
      })
    

    }
    else{
    res.redirect('/login');
    }
  })
  .catch(err => {
    console.log('New error',err);
  })
  //   .then(user => {
  //     req.session.isLoggedIn = true;
  //     req.session.user = user;
  //     req.session.save(err => {
  //       console.log(err);
  //       res.redirect('/');
  //     });
  //   })
  //   .catch(err => console.log('No user found'));
  // req.session.isLoggedIn = true;
  // res.redirect('/');
};

exports.postSignUpPage = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findUserbyId(email)
  .then(myuser => {
    if(myuser){
      console.log('User already exist!');
      res.redirect('/signup');
    }
    else{
      // const user = new User(email, password);
      // return user.save();
      return bcrypt.hash(password,12)
      .then(hashpassword => {
        const user = new User(email,hashpassword);
        return user.save();
          
        })
        .then(result => {
          console.log('new user created!');
          res.redirect('/login');
        })
    }
  

  })
  .catch(err => {
    console.log('user auth error2 = ',err);
  })

  // user.save()
  // .then(result => {
  //   console.log('user created!');
  //   res.redirect('/login');
  // })
  // .catch(err => {
  //   console.log('error1',err)
  // })
  
};

exports.LogoutPage = (req, res, next) => {
  req.session.destroy(err => {
    console.log('log out!')
    res.redirect('/');
  });
};
