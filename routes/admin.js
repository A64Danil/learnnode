var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/portfolio'});
var mysql = require('mysql');
var validation = require('validator');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'onix',
  password: 'test',
  database: 'portfolio'
});

connection.connect();

/* GET Admin page. */
router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM projects", function (err, rows, fields) {
        if(err) throw err;
        res.render('admin/index', {
            projects: rows
        });
    });
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


  var errors = [];
  if(validation.isEmpty(req.body.title)) errors.push({text: "Title is empty. Title is requires."});
  if(validation.isEmpty(req.body.service)) errors.push({text: "Service is empty. Service is requires."});

  if(errors.length > 0){
    res.render('admin/add', {
      errors: errors,
      project: {
            title: title,
            description: description,
            service: service,
            client: client,
            date: projectdate,
            url: url
        }
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

    var query = connection.query('INSERT INTO projects SET ?', project, function (err, result) {
      // Project Inserted!
      console.log('Error: ' + err);
      console.log('Success: ' + result);
    });

    // req.flash('success_msg', 'Project Added');
    res.redirect('/admin?type=success&text=Project Added!');
  }

});

router.get('/edit/:id', function (req,res,next) {
    connection.query("SELECT * FROM projects WHERE id = ?", req.params.id, function (err, rows, fields) {
        if(err) throw err;
        res.render('admin/edit', {
            project: rows[0]
        });
    });
});

router.post('/edit/:id', upload.single('projectimage'), function(req, res, next) {
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


    var errors = [];
    if(validation.isEmpty(req.body.title)) errors.push({text: "Title is empty. Title is requires."});
    if(validation.isEmpty(req.body.service)) errors.push({text: "Service is empty. Service is requires."});

    if(errors.length > 0){
        res.render('admin/edit', {
            errors: errors,
            project: {
                id: req.params.id,
                title: title,
                description: description,
                service: service,
                client: client,
                date: projectdate,
                url: url
            }
        });
    } else {

        if(req.file) {
            var project = {
                title: title,
                description: description,
                service: service,
                client: client,
                date: projectdate,
                url: url,
                image: projectImageName
            };
        } else {
            var project = {
                title: title,
                description: description,
                service: service,
                client: client,
                date: projectdate,
                url: url
            };
        }


        var query = connection.query('UPDATE projects SET ? WHERE id = ' + req.params.id, project, function (err, result) {
            // Project Inserted!
            console.log('Error: ' + err);
            console.log('Success: ' + result);
        });

        // req.flash('success_msg', 'Project Updated');
        res.redirect('/admin?type=success&text=Project Updated!');
    }

});

router.delete('/delete/:id', function (req, res) {
    connection.query('DELETE FROM Projects WHERE  id = ' + req.params.id, function (err, result) {
        if (err) throw err;
        console.log('deleted ' + result.affectedRows + ' rows')
    });
    req.flash('success_msg', 'Project Deleted');
    // res.redirect('/admin?type=success&text=Project Updated!');
    res.sendStatus(200);
});

module.exports = router;
