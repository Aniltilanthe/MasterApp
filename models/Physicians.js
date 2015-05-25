var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var SECRET_KEY = 'SECRETBOND';

var PhysicianSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  contactNo: String,
  speciality: String,
  registrationNo: String,
  hash: String,
  salt: String,
  appointments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

PhysicianSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

PhysicianSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

PhysicianSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, SECRET_KEY);
};

mongoose.model('Physician', PhysicianSchema);

module.exports = mongoose.model('Physician', PhysicianSchema);
