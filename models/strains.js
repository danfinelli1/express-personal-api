var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StrainsSchema = new Schema({
  name: String,
  tastes: String,
  outdoorGrown: Boolean,
  smellScale: Number,
  treats: String
});

var Strains = mongoose.model('Strains', StrainsSchema);

module.exports = Strains;
