const indexController = {
index:function(req, res) {
    res.render('index');
},
searchresults:function(req, res) {
    res.render('search-results');
},
};
module.exports = indexController;