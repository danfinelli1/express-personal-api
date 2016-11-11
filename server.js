// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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
 app.get('/api/strains', function (req, res) {
   // send all books as JSON response
   db.Strains.find().populate('strains')
     .exec(function(err, strains) {
       if (err) { return console.log("index error: " + err); }
       res.json(strains);
   });
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
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/strains", description: "View strains api"} // CHANGE ME
    ]
  })
});

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/strains', function (req, res) {
  // create new book with form data (`req.body`)
  var newStrain = new db.Strains({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
