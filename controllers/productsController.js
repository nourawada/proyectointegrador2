const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;
const comment = db.Comment;


const productController = {

     productId:
     function(req, res){
         let id = req.params.id
         products.findOne({
            include: [{ association: "user" }],
            where: [{id: id}]
         })
         .then(function(products){
            comment.findAll({
                include: [{association: "userComment"}, { association: "productComment"}],
            where:[{ products_id: products.id}],
            order: [[['id', 'DESC']]]

            })
            .then(function(comment){
                console.log(comment);
                return res.render('product', {products: products, comment: comment})
            })
         })
         .catch(error => console.log(error))
     },


add: function(req, res){
     //renderizar el form para crear un producto.
     if(req.session.user == undefined){
         return res.redirect('/users/login')
     } else {  
         products.findAll()
             .then( function(products){
                 return res.render('product-add', {products: products})
             })
             .catch(error => console.log(error))
     }

 }, 
   

store: function(req, res){
     //Obtener los datos del formulario y armar el objeto literal que quiero guardar
     let product = {
         name: req.body.name,
         image: req.file.filename,
         brand: req.body.brand,
         descripcion: req.body.descripcion,
         users_id: req.body.users_id
     }  

     
     //Guardar la info en la base de datos
     products.create(product)
         .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
             //return res.send(respuesta)
             //redirigir
             return res.redirect('/')
         })
         .catch( error => console.log(error))

 },

delete: function(req, res){
    if (req.session.user == undefined) {
        return res.redirect('/')
     } else {
        products.findByPk(req.params.id)
        .then(function(product){
        if(product.users_id == req.session.user.id){
         products.destroy({ 
         where: {id : req.params.id }})

        .then (function(destroy){

        comment.destroy({
         where: {products_id : req.params.id}
 })
        .then(function(borrar){
         return res.redirect ('/')
})
        .catch(error => console.log(error))
})
        } else {
        return res.redirect('/')
}
})
}
},


 show: function (req, res){
    if(req.session.user == undefined){
        return res.redirect('/users/login')
    } else { 
    let comments = {
       text: req.body.text,
       products_id: req.body.products_id,
       users_id: req.body.users_id,        
    }



    comment.create(comments)
    .then (function(respuesta){
        products.findByPk(req.params.id)
        .then(function(product){
        
        return res.redirect (`/product/${product.id}`)
    })
 .catch(error => console.log(error))
})
 
}
},



}
module.exports = productController