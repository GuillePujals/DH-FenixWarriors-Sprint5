const express = require('express');
const router = express.Router();
const controladorUser = require('../controller/userController');
const userValidation = require ('../middlewares/userValidate');
const uploadFile = require('../middlewares/multerMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// Formulario de registro
router.get('/register/', guestMiddleware, controladorUser.register);

// Procesar el registro
router.post('/register/', uploadFile.single('avatar'), userValidation, controladorUser.processRegister);

// Formulario de login
router.get('/login/', guestMiddleware, controladorUser.login);

// Procesar de login
router.post('/login/', controladorUser.loginProcess);

// Perfil del usuario
router.get('/users/profile/', authMiddleware, controladorUser.profile);

// Logout
router.get('/users/logout/', controladorUser.logout);


module.exports = router;