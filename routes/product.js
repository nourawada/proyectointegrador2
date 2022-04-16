const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')

/* GET home page. */
router.get('/', productController.index);


router.get('/product-add', productController.productadd)

router.get('/:id', productController.productId)
//creamos el id ya que va a ser una nueva ruta 
module.exports = router

 