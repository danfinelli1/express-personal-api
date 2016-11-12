var db = require('./models');

var new_strains = {
        name: "Girl Scout Cookies",
        tastes: "sweet, earthy, and pungent",
        outdoorGrown: true,
        smellScale: 9,
        treats: "severe pain, nausea, and appetite loss"
    };


db.Strains.create(new_strains, function(err, strains) {
    if (err) {
        return console.log("Error:", err);
    }

    console.log("Created new strain", strains._id);
    process.exit(); // we're all done! Exit the program.
});
