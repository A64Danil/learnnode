var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'onix',
  password: 'test',
  database: 'portfolio'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query("SELECT * FROM projects", function (err, rows, fields) {
    if(err) throw err;
    res.render('index', {
      projects: rows
    });
  });
});


/* GET details page. */
router.get('/details/:id', function(req, res, next) {
  connection.query("SELECT * FROM projects WHERE id = ?", req.params.id, function (err, rows, fields) {
    if(err) throw err;
    res.render('details', {
      project: rows[0]
    });
  });
});

module.exports = router;
