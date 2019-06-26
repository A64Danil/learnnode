var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    console.log("pass = " + candidatePassword );
    console.log("hash = " + hash);
    bcrypt.compare("test", "$2a$10$EZ.RikbIiXZ0MAHImblMO.QKPh63i71UHlS6euUx.UELrT7fIGuhy", function(err, isMatch) {
        console.log("comparePassword - test");
        console.log(isMatch);
    });

    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        console.log("comparePassword in user " + isMatch);
        callback(null, isMatch);
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}