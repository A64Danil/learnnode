'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res){
        res.render('manage/index');
    });

    // Get books
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

    // Add Book Form
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

    // Add Book Action
    router.post('/books', function (req, res) {
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

    // Edit book
    router.get('/books/edit/:id', function (req, res) {
       Category.find({}, function (err, categories) {
          Book.findOne({_id:req.params.id}, function (err, book) {
             if (err) {
                 console.log(err)
             }
             var model = {
                book: book,
                categories: categories
             };
             res.render('manage/books/edit', model)
          });
       });
    });

    // Uodate book
    router.post('/books/edit/:id', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var category =  req.body.category && req.body.category.trim();
        var author =  req.body.author && req.body.author.trim();
        var publisher =  req.body.publisher && req.body.publisher.trim();
        var price =  req.body.price && req.body.price.trim();
        var description =  req.body.description && req.body.description.trim();
        var cover =  req.body.cover && req.body.cover.trim();


        Book.update({_id: req.params.id}, {
            title: title,
            category: category,
            author: author,
            publisher: publisher,
            price: price,
            cover: cover,
            description: description
        }, function (err) {
            if (err) {
                console.log('update error', err)
            }
            res.location('/manage/books?type=success&text=Book Updated');
            res.redirect('/manage/books?type=success&text=Book Updated');
        });
    });

    // Delete book
    router.post('/books/delete/:id', function (req, res) {
        Book.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err)
            }
            res.location('/manage/books?type=success&text=Book Deleted');
            res.redirect('/manage/books?type=success&text=Book Deleted');
        })
    })

    // Get categories
    router.get('/categories', function (req, res){
        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err)
            }

            var model = {
                categories: categories
            };
            res.render('manage/categories/index', model);
        })
    });


    // Display category add form
    router.get('/categories/add', function (req, res) {
        res.render('manage/categories/add');
    });

    // Add a new category
    router.post('/categories', function (req, res) {
        var name = req.body.name && req.body.name.trim();

        if (name == "") {
            res.location('/manage/categories/add?type=error&text=Please fill out required fields');
            res.redirect('/manage/categories/add?type=error&text=Please fill out required fields');
        }

        var newCategory = new Category({
            name: name
        });

        newCategory.save(function (err) {
            if (err) {
                console.log('save error', err)
            }
            res.location('/manage/categories?type=success&text=Category Added');
            res.redirect('/manage/categories?type=success&text=Category Added');


        })

    });

    // Display category edit form
    router.get('/categories/edit/:id', function (req, res) {
        Category.findOne({_id: req.params.id}, function (err, category) {
            if (err) {
                console.log(err)
            }
            var model = {
                category: category
            };
            res.render('manage/categories/edit', model)
        });
    });

    //Edit category
    router.post('/categories/edit/:id', function (req, res) {
       var name = req.body.name && req.body.name.trim();

       Category.update({_id: req.params.id}, {
           name: name
       }, function (err) {
           if (err) {
               console.log('update error', err)
           }
           res.location('/manage/categories?type=success&text=Category Updated');
           res.redirect('/manage/categories?type=success&text=Category Updated');
       })
    });

    // Delete category
    router.post('/categories/delete/:id', function (req, res) {
        Category.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err)
            }
            res.location('/manage/categories?type=success&text=Category Deleted');
            res.redirect('/manage/categories?type=success&text=Category Deleted');
        })
    })


};