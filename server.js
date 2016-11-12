// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
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

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
   res.sendFile(__dirname + '/views/index.html');
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
            }, // CHANGE ME
            {
                method: "GET",
                path: "/api/strains",
                description: "View strains api"
            } // CHANGE ME
        ]
    });
});

app.get('/api/profile', function profile(req, res){
  res.json({
          name: "Daniel Finelli",
          githubLink: "http://github.com/danfinelli1",
          githubProfileImage: '',
          personalSiteLink: '',//TODO
          currentCity: "San Francisco",
          isAwake: true,
          familyMembers: [
            { name: 'Maria Finelli', relationship: 'sister' }
          ],
          pets: null
        });
});

app.get('/api/strains', function(req, res){
  db.Strains.find()
    .exec(function(err, strains) {
      if (err) { return console.log("index error: " + err); }
      res.json(strains);
  });
});

app.post('/api/strains', function(req, res) {
    // create new strain with form data (`req.body`)
    var newStrain = new db.Strains({
        name: req.body.name,
        tastes: req.body.tastes,
        outdoorGrown: req.body.outdoorGrown,
        smellScale: req.body.smellScale,
        treats: req.body.treats
    });
    newStrain.save(function(err, strains) {
        if (err) {
            return console.log("save error: " + err);
        }
        console.log("saved ", strains.name);
        // send back the strain!
        res.json(strains);
    });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
