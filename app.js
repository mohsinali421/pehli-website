const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbStore = require('connect-mongodb-session')(session);
//const csrf = require('csurf');
//const csrfProtection = csrf();

 const MONGO_URL =  `mongodb+srv://${process.env.MONGO_USERNAME }:${process.env.MONGO_PASSWORD }@crudapp.2y28t.mongodb.net/${process.env.MONGO_DATABASE_NAME }`;

//const myuri = 'mongodb+srv://mypc:12345@crudapp.2y28t.mongodb.net/Shop?retryWrites=true&w=majority'

 const storeSession = new mongodbStore({
     uri : MONGO_URL,
     //uri : myuri,
     //pass- 12345  databsename- Shop, username- mypc, 
     collection: 'session',
     expires: 1000 * 60
 })

const errorController = require('./controllers/error');
const app = express();

app.set('view engine','ejs');
app.set('views','views');


const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');
const authroutes = require('./routes/auth');

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));


 //this is for storing session on server 
 app.use(session({
     secret: 'my secret key',
     resave: false,
     saveUninitialized: false,
     store: storeSession,
     
            })
    );

 // This is for CSRF Protection and every post ejs request is protected
  //  app.use(csrfProtection);
   // code for middleware for session and csrf attack
    app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn; //initially isLoggedIn is False
    //res.locals.csrfToken = req.csrfToken();   // also look for ejs hidden tag where post request happens
    next();
})


 app.use('/admin',routerAdmin);
 app.use(routerShop);
 app.use(authroutes);

 app.use(errorController.get404);


mongoose.connect(MONGO_URL)
.then(result => {
    console.log('Listening...');
    app.listen(process.env.PORT || 3000);
})
.catch(err => console.log('Error is',err));
