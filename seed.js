var db = require('./models');

var new_strains = {
        _id: "5826b102f34db00934be5566",
        name: "Girl Scout Cookies",
        tastes: "sweet, earthy, and pungent",
        outdoorGrown: true,
        smellScale: 9,
        treats: "severe pain, nausea, and appetite loss",
        __v: 0
    }, {
        _id: "5826b1c6f34db00934be5567",
        name: "White Widow",
        tastes: "earthy, woody, and pungent",
        outdoorGrown: true,
        smellScale: 9,
        treats: "stress, depression, pain, fatigue, and insomnia",
        __v: 0
    }, {
        _id: "5826b27f76de55097a76e442",
        name: "Northern Lights",
        tastes: "earthy, sweet, and pine",
        outdoorGrown: false,
        smellScale: 7,
        treats: "stress, pain, insomnia, depression, and headaches",
        __v: 0
    }, {
        _id: "5826b33876de55097a76e443",
        name: "Strawberry Cough",
        tastes: "strawberry, sweet, and berry",
        outdoorGrown: false,
        smellScale: 8,
        treats: "stress, depression, pain, fatigue, and lack of appetite",
        __v: 0
    }, {
        _id: "5826b43d76de55097a76e444",
        name: "Blue Cheese",
        tastes: "blue cheese, pungent, and cheese",
        outdoorGrown: false,
        smellScale: 10,
        treats: "muscle spasms, pain, and stress",
        __v: 0
    }, {
        _id: "5826b4bc76de55097a76e445",
        name: "Granddaddy Purple",
        tastes: "grape, berry, and sweet",
        outdoorGrown: true,
        smellScale: 6,
        treats: "pain, stress, insomnia, appetite loss, and muscle spasms",
        __v: 0
};

db.Strains.create(new_strains, function(err, strains) {
    if (err) {
        return console.log("Error:", err);
    }

    console.log("Created new strain", strains._id);
    process.exit(); // we're all done! Exit the program.
});
