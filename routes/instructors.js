var express = require('express');
var router = express.Router();

Class = require('../models/class');
Instructor = require('../models/instructor');
User = require('../models/user');

router.get('/classes', function (req, res, next) {
    Instructor.getInstructorByUsername(req.user.username, function (err, instructor) {
        if (err) throw err;
        res. render('instructors/classes', {instructor: instructor});
    })
});

module.exports = router;