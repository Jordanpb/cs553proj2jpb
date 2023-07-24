const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  _id: String,
  vin: String,
  plateNumber: String,
  state: String,
  make: String,
  model: String,
  year: Number,
  ownerName: String,
  ownerAddress: String,
  dlNumber: String,
  problemDescription: String,
  timeInShop: Number,
  workers: [String],
});

module.exports = mongoose.model('cars', carSchema);