const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const csrfProtection = csrf();

const MONGO_URL =  `mongodb+srv://${process.env.MONGO_USERNAME }:${process.env.MONGO_PASSWORD }@crudapp.2y28t.mongodb.net/${process.env.MONGO_DATABASE_NAME }`,

 const storeSession = new mongodbStore({
     uri : MONGO_URL,
    // uri : 'mongodb+srv://mypc:12345@crudapp.2y28t.mongodb.net/Shop?retryWrites=true&w=majority',
     //pass- 12345  databsename- Shop, username- mypc, 
     collection: 'session',
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


//====================== uncomment ===============
 //this is for storing session on server 
 app.use(session({
     secret: 'my secret key',
     resave: false,
     saveUninitialized: false,
     store: storeSession,
     
            })
    );

 
    app.use(csrfProtection);
   // code for middleware for session and csrf attack
    app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn; //initially isLoggedIn is False
    res.locals.csrfToken = req.csrfToken();
    next();
})


 app.use('/admin',routerAdmin);
 app.use(routerShop);
 app.use(authroutes);

 app.use(errorController.get404);


mongoose.connect(MONGO_URL)
.then(result => {
    console.log('Listening...');
    app.listen(process.env.PORT||4200);
})
.catch(err => console.log('Error is',err));
//============================================ end ================================


//===========================practice code --------------------

// const practiceRoutes = require('./routes/practice');
// app.use(practiceRoutes);
// app.listen(4000);