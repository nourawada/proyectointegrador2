const usuario = require('../db/usuario')

const usuarioController = {
    register: function (req, res) {
        res.render('register');
    },
    login: function (req, res) {
        res.render('login');
    },

    profile: function (req, res) {
        res.render('profile', {usuario: usuario, productos: productos} );
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', {usuario: usuario} );
    }
};


module.exports = usuarioController;