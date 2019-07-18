'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {

    // Get cart
    router.get('/', function (req, res) {
        // get cart from session
        var cart = req.session.cart;
        var displayCart = {
            items: [],
            total: 0
        };
        var total = 0;

        // Get Total
        for(var item in cart){
            displayCart.items.push(cart[item]);
            total += (cart[item].qty * cart[item].price)
        }

        displayCart.total = total;

        // Render Cart
        res.render('cart/index', {
            cart: displayCart
        });
    });


    // Add item to cart
    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;
        
        Book.findOne({_id: req.params.id}, function (err, book) {
            if (err) {
                console.log(err)
            }

            if(cart[req.params.id]) {
                cart[req.params.id].qty++
            } else {
                cart[req.params.id] = {
                    item: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }

            res.redirect('/cart')
        })
    });

    // Empty cart
    router.get('/remove', function (req, res) {
        req.session.cart = {};
        res.location('/cart?type=success&text=Cart is emty now!');
        res.redirect('/cart?type=success&text=Cart is emty now!');
    });


    // Remove one item from cart
    router.post('/remove/:id', function (req, res) {
        var cart = req.session.cart;

        var bookName = cart[req.params.id].title;
        delete cart[req.params.id];
        req.session.cart = cart;


        res.location('/cart?type=success&text=Book "' + bookName + '" was deleted!');
        res.redirect('/cart?type=success&text=Book "' + bookName + '" was deleted!');
    });

    // Change qnty of selected item to increment (add one more)
    router.post('/addone/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;
        var bookName = cart[req.params.id].title;

        Book.findOne({_id: req.params.id}, function (err, book) {
            if (err) {
                console.log(err)
            }

            if(cart[req.params.id]) {
                cart[req.params.id].qty++
            } else {
                res.location('/cart?type=error&text=You do not have book named "' + bookName + '" in you cart. So you can not add one more');
                res.redirect('/cart?type=error&text=You do not have book named "' + bookName + '" in you cart. So you can not add one more');
            }

            res.location('/cart?type=success&text=Add one more copy of "' + bookName + '"');
            res.redirect('/cart?type=success&text=Add one more copy of "' + bookName + '"');
        })
    });

    // Change qnty of selected item to decrement (remove one left)
    router.post('/removeone/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;
        var bookName = cart[req.params.id].title;

        Book.findOne({_id: req.params.id}, function (err, book) {
            if (err) {
                console.log(err)
            }

            if(cart[req.params.id]) {
                if(cart[req.params.id].qty > 1) {
                    cart[req.params.id].qty--;
                    res.location('/cart?type=success&text=Remove one copy of "' + bookName + '"');
                    res.redirect('/cart?type=success&text=Remove one copy of "' + bookName + '"');
                } else if(cart[req.params.id].qty === 1) {
                    res.location('/cart?type=error&text=You can not remove, because you have only one item. Use delete button instead.');
                    res.redirect('/cart?type=error&text=You can not remove, because you have only one item. Use delete button instead.');
                } else {
                    delete cart[req.params.id];
                    req.session.cart = cart;
                }


            } else {
                res.location('/cart?type=error&text=You do not have book named "' + bookName + '" in you cart. So you can not remove it');
                res.redirect('/cart?type=error&text=You do not have book named "' + bookName + '" in you cart. So you can not remove it');
            }
        })
    });

};