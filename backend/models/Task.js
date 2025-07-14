const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: String,
  popis: String,
  customPopis: String,
  znacka: String,
  poistovna: String,
  start: String,
  end: String,
  meno: String,
  telefon: String,
  mechanik: String,
  extraInfo: String,
  isCalled: Boolean
});

module.exports = mongoose.model('Task', taskSchema);
