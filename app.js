var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    { Pool } = require('pg'),
    app = express();



// DB Conntect String
var connect = "postgres://onix:admin@localhost/recipebookdb";

const pg = new Pool({
    connectionString: connect
});
// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function (req, res) {
    // PG connect
    pg.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM recipes', (err, result) => {
            if (err) {
                console.log(err.stack)
            }
            res.render('index', {recipes: result.rows});
            done();
        })
    })
});

app.post('/add', function (req, res) {
    // PG connect
    pg.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions]);

        done();
        res.redirect('/');
    });
});

// Server
app.listen(3000, function () {
    console.log('Server Started on Port 3000');
})
