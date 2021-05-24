const bcryptjs = require('bcryptjs');
const jsonDB = require ('../model/jsonDatabase');
const userModel = jsonDB ('users');


const {
	validationResult
} = require('express-validator');
//const { delete } = require('../routes/userRouter');


let userController = {

    login: (req, res) => {
            res.render('users/login')
        },
    loginProcess: (req, res) => {
        let userToLogin = userModel.findByField("email", req.body.email)
        if (userToLogin) {

            let isPasswordOk = bcryptjs.compareSync(req.body.contraseña, userToLogin.password)
            if (isPasswordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin
                //console.log(req.session);
                return res.redirect ('users/profile');
            }
            return res.render( "users/login", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas"
                    }
                }
            })
        }


         return res.render( "users/login", {
            errors: {
                email: {
                    msg: "No esta registrado este email"
                }
            }
        })
    },    
    profile: (req, res) => {
               
          res.render ('users/profile', {
              user: req.session.userLogged
              
          })
        },

    register: (req, res) => {
        res.render('users/register')
    },
    processRegister(req, res){
        const resulValidation = validationResult (req);
        console.log(req.body);
        if (resulValidation.errors.length > 0 ){
            return res.render ('users/register',{
            errors: resulValidation.mapped(),
            oldData: req.body,
            
        });
        }
        let userInDB = userModel.findByField('email', req.body.email);

        if (userInDB) {
            console.log(userInDB);
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename :'Avatar.jpg'
		}

		let userCreated = userModel.create(userToCreate);

		return res.redirect('/login');        
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}



module.exports = userController;