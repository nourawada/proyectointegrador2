const productos = require('../db/productos')

const indexController = {
index:function(req, res) {
    res.render('index', {'productos': productos});
},
searchresults:function(req, res) {
    res.render('search-results', {'productos':productos});
},
};
module.exports = indexController;