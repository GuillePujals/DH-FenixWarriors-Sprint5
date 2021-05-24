const express = require('express')
const app = express()
const methodOverride = require('method-override');
const session = require("express-session");

const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware');
const admLoggedMiddleware = require ('./middlewares/admLoggedMiddleware');



const path = require('path');
const puerto = process.env.PORT;

//Traemos la inforamción de las rutas
const homeRouter = require ('./routes/homeRouter');
const productRouter = require ('./routes/productRouter');
const userRouter = require ('./routes/userRouter');

app.use(express.static('public'));

app.use(session({
	secret: "Secreto",
	resave: false,
	saveUninitialized: false,
}));

//Este middleware debe ir después de ssesion
app.use (userLoggedMiddleware);
app.use (admLoggedMiddleware);

//Configuramos ejs
app.set('view engine', 'ejs')  

//midleware de PUT y DELETE
app.use(methodOverride('_method'));
//Uso de formualrios
app.use(express.urlencoded({ extended: false }));


//Damos de alta el puerto
app.listen(puerto || 3030, function() {
    console.log("Servidor corriendo en el puerto 3000");
});

//Llamamos al ruteo
app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/products', productRouter);














