'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res){
        res.render('manage/index');
    });

    router.get('/books', function (req, res){
        Book.find({}, function (err, books) {
            if(err) {
                console.log(err);
            }

            var model = {
                books: books
            }

            res.render('manage/books/index', model);
        });


    });

    router.get('/books/add', function (req, res) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }

            var model = {
                categories: categories
            }

            res.render('manage/books/add', model)
        });

    });

    router.post('/books', function (req, res) {
        console.log('post request sended');
        var title = req.body.title && req.body.title.trim();
        var category =  req.body.category && req.body.category.trim();
        var author =  req.body.author && req.body.author.trim();
        var publisher =  req.body.publisher && req.body.publisher.trim();
        var price =  req.body.price && req.body.price.trim();
        var description =  req.body.description && req.body.description.trim();

        var cover =  req.body.cover && req.body.cover.trim();

        if (title == '' || price == '') {
            res.locals.flasher = {
                type: "error",
                text: "Please fill out required fileds"
            };
            res.location('/manage/books/add?type=error&text=Please fill out required fileds');
            res.redirect('/manage/books/add?type=error&text=Please fill out required fileds');
            return;
        }

        if (isNaN(price)) {
            res.locals.flasher = {
                type: "error",
                text: "Price must be a number"
            };
            res.location('/manage/books/add?type=error&text=Price must be a number');
            res.redirect('/manage/books/add?type=error&text=Price must be a number');
            return;
        }

        var newBook = new Book ({
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            cover: cover,
            price: price
        });

        newBook.save(function (err) {
            if (err) {
                console.log('save error', err)
            }
            res.location('/manage/books?type=success&text=Book Added!');
            res.redirect('/manage/books?type=success&text=Book Added!');
        })
    });

    router.get('/categories', function (req, res){
        res.render('manage/categories/index');
    });


};