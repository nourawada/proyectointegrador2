const productos = require('../db/productos')
const comentarios = require('../db/comentarios')
const productController = {
    index: function(req, res){
         res.render('product',{productos: productos, comentarios: comentarios})
    }, 

productadd: function(req, res){
     res.render('product-add',{productos: productos, comentarios: comentarios})
}, 
     productId: function(req,res){
    res.render ('product/:id?',{productos:productos, productId: req.params.id})
}
}

module.exports = productController