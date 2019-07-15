'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {

        req.flash('success', "test");
        res.render('index', model);
        
        
    });

};
