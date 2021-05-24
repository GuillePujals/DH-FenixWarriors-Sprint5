function authAdmMiddleware(req, res, next) {
    if (!req.session.userLogged  || req.session.userLogged.perfil_usr != 'publicar') {
        return res.redirect('/login');
        
    }
    next();
    }
    
    module.exports = authAdmMiddleware;