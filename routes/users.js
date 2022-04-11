var express = require('express');
var router = express.Router();

/* conecto la ruta de users con su respectivo controlador */

const usersController = require ('../controllers/usersController')


/* la ruta via get catchea las funciones en el controlador. */

router.get('/register', usersController.register);

router.get('/login', usersController.login);

router.get('/profile', usersController.profile);

router.get('/profile-edit', usersController.profileEdit);

module.exports = router;
