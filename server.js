// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

app.use(express.static('public'));

/*
 * HTML Endpoints
 */

//homepage
app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//new strain form
app.get('/api/strains/new', function homepage(req, res) {
    res.sendFile(__dirname + '/views/new-strain.html');
});

//edit strain form
app.get('/api/strains/edit-mode', function homepage(req, res) {
    res.sendFile(__dirname + '/views/edit-mode.html');
});

/*
 * JSON API Endpoints
 */


app.get('/api', function api_index(req, res) {
    // TODO: Document all your api endpoints below
    res.json({
        woopsIForgotToDocumentAllMyEndpoints: false, // done
        message: "Welcome to my personal api! Here's what you need to know!",
        documentationUrl: "https://github.com/danfinelli1/express-personal-api/blob/master/README.md", // TODO
        baseUrl: "https://boiling-bastion-91533.herokuapp.com",
        endpoints: [{
                method: "GET",
                path: "/api",
                description: "Describes all available endpoints"
            }, {
                method: "GET",
                path: "/api/profile",
                description: "Data about me"
            },
            {
                method: "GET",
                path: "/api/strains",
                description: "View strains api"
            },
            {
              method: "GET",
              path: "/api/strains:id",
              description: "returns one strain"
            },
            {
              method: "POST",
              path: "/api/strains/new",
              description: "addes strain to api"
            },
            {
              method: "DELETE",
              path: "/api/strains/:id",
              description: "deletes specific strain"
            },
            {
              method: "POST",
              path: "/api/strains/:id",
              description: "attempt at updating a strain"
            }
        ]
    });
});

//returns all strains
app.get('/api/strains', function(req, res) {
    db.Strains.find()
        .exec(function(err, strains) {
            if (err) {
                return console.log("index error: " + err);
            }
            res.json(strains);
        });
});

//returns one strain
app.get('/api/strains/:id', function(req, res) {
    db.Strains.findOne({
        _id: req.params._id
    }, function(err, data) {
        res.json(data);
    });
});

//data about me
app.get('/api/profile', function profile(req, res) {
    res.json({
        name: "Daniel Finelli",
        githubLink: "http://github.com/danfinelli1",
        githubProfileImage: 'https://avatars1.githubusercontent.com/u/22360983?v=3&s=460',
        personalSiteLink: 'https://danfinelli1.github.io/',
        currentCity: "San Francisco",
        isAwake: true,
        familyMembers: [{
            name: 'Maria Finelli',
            relationship: 'sister'
        }],
        pets: null
    });
});

//adds new strain
app.post('/api/strains/new', function(req, res) {
    var newStrain = new db.Strains({
        name: req.body.name,
        tastes: req.body.tastes,
        smellScale: req.body.smellScale,
        treats: req.body.treats,
        img_url: req.body.img_url
    });
    newStrain.save(function(err, strains) {
        if (err) {
            return console.log("save error: " + err);
        }
        console.log("saved ", strains.name);
        res.json(strains);
    });
});

//attempting update feature
app.post('/api/strains/:id', function(req, res){
    var strainId = req.params.strain_id;
    var strain = db.Strains.findById(strainId);
      strain.populate(req.body)=req.body;
      res.json(strain);
});

//delete one strain
app.delete('/api/strains/:id', function(req, res) {
    console.log('strains delete', req.params);
    var strainId = req.params.id;
    db.Strains.findOneAndRemove({
        _id: strainId
    }, function(err, deletedStrain) {
        res.json(deletedStrain);
    });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
