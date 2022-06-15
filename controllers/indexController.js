const db = require('../database/models');
const products = db.Product;
const users = db.Users;
const op = db.Sequelize.Op;

//const productos = require('../db/productos')

const indexController = {
index:function(req, res) {
    products.findAll()
    .then(function(products){
        return res.render('index', {products:products});
      })
    },
//searchresults:function(req, res) {
//    res.render('search-results', {'productos':productos});
//},
};
module.exports = indexController;