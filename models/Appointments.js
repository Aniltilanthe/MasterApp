var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
  dateTime: Date,
  physician : { type: mongoose.Schema.Types.ObjectId, ref: 'Physician' },
  physicianName : String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String
});

AppointmentSchema.methods.getDate = function(){
  return this.dateTime.getDate();
};

AppointmentSchema.methods.getTime = function(){
  return this.dateTime.getTime();
};

mongoose.model('Appointment', AppointmentSchema);

module.exports = mongoose.model('Appointment', AppointmentSchema);
