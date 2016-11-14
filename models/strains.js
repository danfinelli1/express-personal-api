var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StrainsSchema = new Schema({
  name: String,
  tastes: String,
  smellScale: Number,
  treats: String,
  img_url: String
});

var Strains = mongoose.model('Strains', StrainsSchema);

module.exports = Strains;
