var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Physician = mongoose.model('Physician');

passport.use('user-local', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use('physician-local', new LocalStrategy(
  function(username, password, done){
    Physician.findOne({ username: username }, function (err, physician) {
      if (err) { return done(err); }
      if (!physician) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!physician.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, physician);
    });
  }
));
