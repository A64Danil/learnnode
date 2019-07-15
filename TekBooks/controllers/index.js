'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {


        // res.send('<script>name = "Eugene";</script>');
        res.locals.flasher = {
            type: "success",
            text: "This is a flash text!"
        };
        res.render('index', model);

        
    });

};
