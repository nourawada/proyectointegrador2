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
    res.render ('product',{productos:productos, productId: req.params.id, comentarios: comentarios})
}
}

module.exports = productController