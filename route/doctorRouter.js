const { Router } = require('express');
const DoctorController = require('../controller/doctorController');

let router = new Router();

router.post('/login', DoctorController.login_post);
router.post('/create', DoctorController.create_post);
router.get('/show', DoctorController.show_get);
router.get('/destroy', DoctorController.destroy_delete);
router.get('/logout', DoctorController.logout_get);

module.exports = router;
