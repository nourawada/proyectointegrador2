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
                include: [{association: "user"}, { association: "product"}],
            where:[{ productsId: products.id}],
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
         usersId: req.body.usersId
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
        return res.redirect('/users/login')
     } else {
        products.findByPk(req.params.id)
        .then(function(product){
       
         products.destroy({ 
         where: {id : req.params.id }})

        .then (function(destroy){

        comment.destroy({
         where: {productsId : req.params.id}
 })
        .then(function(borrar){
         return res.redirect ('/')
})
        .catch(error => console.log(error))
})
       

})
}
},


 show: function (req, res){
    if(req.session.user == undefined){
        return res.redirect('/users/login')
    } else { 
    let comments = {
       text: req.body.text,
       productsId: req.params.id,
       usersId: req.session.user.id,        
    }



    comment.create(comments)
    .then (function(respuesta){
        products.findByPk(req.params.id)
        .then(function(products){
        
        return res.redirect (`/product/${products.id}`)
    })
 .catch(error => console.log(error))
})
 
}
},



}
module.exports = productController