var db = require('./models');

var new_strains = {
        name: "Girl Scout Cookies",
        tastes: "sweet, earthy, and pungent",
        outdoorGrown: true,
        smellScale: 9,
        treats: "severe pain, nausea, and appetite loss"
    }, {
        name: "White Widow",
        tastes: "earthy, woody, and pungent",
        outdoorGrown: true,
        smellScale: 9,
        treats: "stress, depression, pain, fatigue, and insomnia"
    }, {

        name: "Northern Lights",
        tastes: "earthy, sweet, and pine",
        outdoorGrown: false,
        smellScale: 7,
        treats: "stress, pain, insomnia, depression, and headaches"

    }, {

        name: "Strawberry Cough",
        tastes: "strawberry, sweet, and berry",
        outdoorGrown: false,
        smellScale: 8,
        treats: "stress, depression, pain, fatigue, and lack of appetite"

    }, {

        name: "Blue Cheese",
        tastes: "blue cheese, pungent, and cheese",
        outdoorGrown: false,
        smellScale: 10,
        treats: "muscle spasms, pain, and stress"

    }, {

        name: "Granddaddy Purple",
        tastes: "grape, berry, and sweet",
        outdoorGrown: true,
        smellScale: 6,
        treats: "pain, stress, insomnia, appetite loss, and muscle spasms"

};

db.Strains.create(new_strains, function(err, strains) {
    if (err) {
        return console.log("Error:", err);
    }

    console.log("Created new strain", strains._id);
    process.exit(); // we're all done! Exit the program.
});
