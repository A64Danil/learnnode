var express = require('express');
var router = express.Router();

/* GET Admin page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin page' });
});

module.exports = router;
