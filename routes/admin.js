var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/portfolio'});
var mysql = require('mysql');

const { check, validationResult } = require('express-validator');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#onix13$',
  database: 'portfolio'
});

connection.connect();

/* GET Admin page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin page' });
});

router.get('/add', function(req, res, next) {
  res.render('admin/add', { title: 'Admin page' });
});

router.post('/add', upload.single('projectimage'), function(req, res, next) {
  // Get Form Valuse
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var url = req.body.url;
  var client = req.body.client;
  var projectdate = req.body.projectdate;

  if(req.file) {
    var projectImageName = req.file.filename
  } else {
    var projectImageName = 'noimage.jpg'
  }

  // Form Field Validation
  req.checkBody('title', 'Title field is requires').notEmpty();
  req.checkBody('service', 'Service field is requires').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('admin/add', {
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client,
      url: url
    });
  } else {
    var project = {
      title: title,
      description: description,
      service: service,
      client: client,
      date: projectdate,
      url: url,
      image: projectImageName
    };
  }

  var query = connection.query('INSERT INTO projects SET ?', project, function (err, result) {
    // Project Inserted!
    console.log('Error: ' + err);
    console.log('Success: ' + result);
  });

  req.flash('success_msg', 'Project Added');

  res.redirect('/admin');

});

module.exports = router;
