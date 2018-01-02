var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

/* we don't need this 'cause we already have them in app.js
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
*/

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
    }
});

// create a variable that we can access out of this file
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    // we are using bcrypt to hash our password from bcryptjs documentation from npm site
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    //var query = {username: username};
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        // res === true 
        if(err) throw err;
        callback(null, isMatch);
    });
}