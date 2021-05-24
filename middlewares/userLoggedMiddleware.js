function userLoggedMiddleware(req, res, next) {

   res.locals.isLogged = false;
   
   if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;

    //Paso las variables para que esten disponibles en todas las vistas
    res.locals.userLogged = req.session.userLogged;
    
       
   }
    next();
}

module.exports = userLoggedMiddleware;