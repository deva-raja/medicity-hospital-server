const { Router } = require('express');
const AuthController = require('../controller/authController');

let router = new Router();

router.get('/signup', AuthController.signup_get);
router.get('/login', AuthController.login_get);
router.post('/signup', AuthController.signup_post);
router.post('/login', AuthController.login_post);
router.get('/logout', AuthController.logout_get);

module.exports = router;
