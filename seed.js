
var db = require('./models');

var new_strains = {  name: 'Granddaddy Purple',
                     tastes: 'Grapes, Berries, Sweet',
                     outdoorGrown: false,
                     smellScale: 6,
                     treats: 'pain, stress, insomnia, appetite loss, and muscle spasms.' };

 db.Strains.create(new_strains,  function(err, strains){
   if (err){
    return console.log("Error:", err);
  }

  console.log("Created new strain", strains._id)
  process.exit(); // we're all done! Exit the program.
});
