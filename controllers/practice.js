exports.getPracticeController = (req, res, next) => {
    req.session.isLoggedIn = true;
    //res.setHeader('Set Cookie','isAdmin=true');
    res.cookie('login',true,{path:'/hello/my'});
    //let mycookievalue = req.get('Cookie')//.split(';')[1].split('=')[1];
    //console.log(mycookievalue); 
    console.log('Session is : ',req.session.isLoggedIn);
    res.render('practice');
}