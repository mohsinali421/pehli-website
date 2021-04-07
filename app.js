const express = require('express');
const path = require('path');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const csrfProtection = csrf();

const storeSession = new mongodbStore({
    uri : `mongodb+srv://${process.env.MONGO_USERNAME }:${process.env.MONGO_PASSWORD }@crudapp.2y28t.mongodb.net/${process.env.MONGO_DATABASE_NAME }?retryWrites=true&w=majority`,
    //pass - 12345  databse name - Shop, username - mypc, 
    collection: 'session',
})

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').MymongoConnect;

const app = express();

app.set('view engine','ejs');
app.set('views','views');


const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');
const authroutes = require('./routes/auth');

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret key',resave:false,saveUninitialized:false,store:storeSession}));

app.use(csrfProtection);

app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})
app.use('/admin',routerAdmin);
app.use(routerShop);
app.use(authroutes);

app.use(errorController.get404);


mongoConnect((client) => {
    app.listen( process.env.PORT || 2000);
})
