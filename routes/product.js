const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')

const multer = require('multer');
const path = require('path');

/*Configurar Multer */
const storage = multer.diskStorage({
    destination: function ( req, file, cb) {
        cb(null, path.join(__dirname, 'public/images/users')) //Usamos path.join para evitar problemas de rutas. __dirname da la posicion exacta de la carpeta en la que esta el archivo. Luego desde ahi nosmovemos hasta la carpeta public.
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})

/* GET home page. */
router.get('/product-add', productController.productadd)
router.post('/product-store', upload.single('image'), productController.productstore) //Ruta que guarda datos
router.get('/:id', productController.productId)

module.exports = router

 