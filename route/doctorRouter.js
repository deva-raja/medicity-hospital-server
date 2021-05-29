const { Router } = require('express');
const DoctorController = require('../controller/doctorController');

let router = new Router();

router.post('/login', DoctorController.login_post);
router.post('/create', DoctorController.create_post);
router.post('/show', DoctorController.show_post);
router.post('/destroy', DoctorController.destroy_delete);

module.exports = router;
