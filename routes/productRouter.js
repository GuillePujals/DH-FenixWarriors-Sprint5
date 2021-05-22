const express = require('express');
const router = express.Router();

const controladorproduct = require('../controller/productController');

//Configuración de multer para archivo de producto
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/products'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const validations = require ('../middlewares/productValidate');

//Ottonello - 22-5
router.get('/detail/', controladorproduct.detalle);
router.get('/cart/', controladorproduct.carrito);


//Ottonello - 19-5 - Revisar rutas sprint4
//1. /products (GET) Listado de productos
router.get('/',controladorproduct.list);
//2. 2. /products/create (GET) Formulario de creación de productos
router.get('/create', controladorproduct.create);
//3. /products/:id (GET) Detalle de un producto particular
router.get('/:id', controladorproduct.detalleCrud);
//4. /products (POST) Acción de creación (a donde se envía el formulario)
router.post('/', upload.single('image'),validations, controladorproduct.store);
//5. /products/:id/edit (GET) Formulario de edición de productos
router.get('/:id/edit', controladorproduct.edit);
//6. /products/:id (PUT) Acción de edición (a donde se envía el formulario)
router.put('/:id/edit', upload.single('image'),validations, controladorproduct.update);
//7. /products/:id (DELETE) Acción de borrado
router.delete('/:id' , controladorproduct.delete );



module.exports = router;