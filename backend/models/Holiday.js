const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  holidayEmployee: String,
  from: String,
  to: String,
  type: String,
  notes: String
});

module.exports = mongoose.model('Holiday', holidaySchema);
