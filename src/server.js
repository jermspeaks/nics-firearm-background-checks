var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var State = require('./app/models/state');
var ejs = require('ejs');

// connect to our database
mongoose.connect('mongodb://localhost/states'); // TODO Need real local hookup

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging with apache default
app.use(morgan('combined'));

// Set views folder
app.set('views', __dirname + '/app/views');
app.engine('html', ejs.renderFile);

// Use public directory
app.use(express.static(__dirname + '/app/public'))

var port = process.env.PORT || 8080;        // set our port

// Routes for our api
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  // console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/states')
  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    State.find(function(err, states) {
      if (err) {
        res.send(err);
      }

      res.json(states);
    });
  });

router.route('/firearms')
  .get(function(req, res) {
    State.find(req.query, function(err, states) {
      if (err) {
        res.send(err);
      }

      res.json(states);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/', function(req, res) {
  res.render('index.html');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
