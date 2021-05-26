const { Router } = require('express');
const messageController = require('../controller/messageController');

let router = new Router();

router.get('/show', messageController.show_get);
router.post('/create', messageController.create_post);
router.get('/destroy', messageController.destroy_delete);

module.exports = router;
