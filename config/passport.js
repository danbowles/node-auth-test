var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  // Login/Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, callback) {
    var newUser;
    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) {
          callback(err);
        }

        if (user) {
          return callback(null, false, 
            req.flash('signupMessage', 'That email address is already being used'));
        } else {
          newUser = new User();

          //TODO
          http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local#views-views/index.ejs,-views/login.ejs,-views/signup.ejs
        }
      })
    })
  }))
};