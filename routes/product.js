const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')

let multer = require('multer');
let path = require('path');

/*Configurar Multer */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/products')) //Usamos path.join para evitar problemas de rutas. __dirname da la posición exacta de la carpeta en la que está el archivo. Luego desde ahí nos movemos hasta la carpeta public.
      //Las carpetas deben existir.
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

var upload = multer({storage: storage})

/* GET home page. */
router.get('/product-add', productController.add)

router.post('/product-store', upload.single('image'), productController.store)

router.post('/delete/:id', productController.delete)

 //Ruta que guarda datos
router.post('/commentstore/:id', productController.show)

router.post('/editado/:id',upload.single('image'), productController.editado)

router.get('/edit/:id', productController.edit)

router.get('/:id', productController.productId)

module.exports = router

 