var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var SECRET_KEY = 'SECRETBOND';

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email : String,
  address : String,
  city : String,
  country: String,
  postalCode: Number,
  dateOfBirth: Date,
  contactNo: Number,
  hash: String,
  salt: String,
  type : String,
  appointments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

//API: Get Age of a user
UserSchema.methods.getAge = function(){
  var today = new Date();
  return ( this.profile.dateOfBirth.getDate() - today.getDate() );
};

UserSchema.methods.updateUserInfo = function(updatedUserInfo, cb) {
  this.address = updatedUserInfo.address;
  this.city = updatedUserInfo.city;
  this.country = updatedUserInfo.country;
  this.postalCode = updatedUserInfo.postalCode;
  this.dateOfBirth = updatedUserInfo.dateOfBirth;
  this.contactNo = updatedUserInfo.contactNo;
  this.appointments = updatedUserInfo.appointments;

  this.save(cb);
};

UserSchema.methods.getUserInfo = function(){
  return {
    _id : this._id,
    username : this.username,
    address : this.address,
    city : this.city,
    country : this.country,
    postalCode : this.postalCode,
    dateOfBirth : this.dateOfBirth,
    contactNo : this.contactNo,
    appointments : this.appointments
  };
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
    type: this.type
  }, SECRET_KEY);
};

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);
