var db = require('./models');

var new_strains = {
        name: "Girl Scout Cookies",
        tastes: "sweet, earthy, and pungent",
        smellScale: 9,
        treats: "severe pain, nausea, and appetite loss",
        img_url: "https://d3ix816x6wuc0d.cloudfront.net/cdn/strain-photo/525764/b/girl-scout-cookies__primary_a53a.jpg"
    };


db.Strains.create(new_strains, function(err, strains) {
    if (err) {
        return console.log("Error:", err);
    }

    console.log("Created new strain", strains._id);
    process.exit();
});
