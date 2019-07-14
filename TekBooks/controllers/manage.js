'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res){
        res.render('manage/index');
    });

    router.get('/books', function (req, res){
        console.log('start RENDER manage/books/index');
        Book.find({}, function (err, books) {
            if(err) {
                console.log(err);
            }

            var model = {
                books: books
            }

            console.log('Before RENDER manage/books/index');
            res.render('manage/books/index', model);
            console.log('After RENDER manage/books/index');
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
            console.log('YOU HAVE EMPTY TITLE');
            // req.flash('error', "Please fill out required fileds");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
            return;
        }

        if (isNaN(price)) {
            console.log('YOU HAVE isNaN Price');
            // req.flash('error', "Price must be a number");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
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
            console.log('************ WE ARE HERE  23-55 **************')
            // req.flash('error', "Book Added");
            res.location('/manage/books');
            res.redirect('/manage/books');
            console.log('************ after redirect **************')
        })
    });

    router.get('/categories', function (req, res){
        res.render('manage/categories/index');

    });


};