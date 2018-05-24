var express = require('express');
var controller = require('../controllers/controller');
var router = express.Router();

/* GET home page. */
router.get('/', controller.HomePage);

router.get('/api/imagesearch/:query', controller.ImageSearch);

router.get('/api/latest/imagesearch', controller.Latest); 

module.exports = router;
