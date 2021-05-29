const { Router } = require('express');
const AdminController = require('../controller/adminController');

let router = new Router();

router.post('/login', AdminController.login_post);

module.exports = router;
