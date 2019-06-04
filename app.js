var express =  require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index', {title: 'Welcome'});
})

app.get('/about', function(req, res) {
    res.render('about', {title: 'About Page'});
})

app.get('/contact', function(req, res) {
    res.render('contact', {title: 'Contact Page'});
})

app.post('/contact/send', function(req, res) {
    // res.render('contact', {title: 'Contact Page'});
    console.log("test")
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'a64danil@gmail.com',
            pass: 'yourpass'
        }
    })

    var mailOptions = {
        from: 'Danil X <a64danil@gmail.com>',
        to: 'a64danil@mail.ru',
        subject: 'Test Node Mailer',
        text: 'some text will be here... Name: ' + req.body.name+ ' Email: '+req.body.email+' Message '+req.body.message,
        html: '<p>some text will be here...</p><ul><li>Name '+req.body.name+'</li></ul>'
    };
     transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
             console.log(error);
             res.redirect('/')
         } else {
             console.log('Message Sent: ' +info.response);
             res.redirect('/')
         }
     })
})

app.listen(3000);
console.log('Server is running on port 3000...');

