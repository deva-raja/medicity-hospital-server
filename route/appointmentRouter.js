const { Router } = require('express');
const appointmentController = require('../controller/appointmentController');

let router = new Router();

router.post('/show', appointmentController.show_post);
router.post('/create', appointmentController.create_post);
router.post('/destroy', appointmentController.destroy_delete);

module.exports = router;
