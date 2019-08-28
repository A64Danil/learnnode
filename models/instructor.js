var mongoose = require('mongoose');

// Student Schema
var InstructorSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: [{
        street_address: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String}
    }],
    username: {
        type: String
    },
    email: {
        type: String
    },
    classes: [{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]
});

var Instructor = module.exports = mongoose.model('instructor', InstructorSchema);

module.exports.getInstructorByUsername = function (username, callback) {
    var query = {username: username};
    Instructor.findOne(query, callback);
}