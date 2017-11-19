
// put in requrements
var express = require('express');
var glob = require('glob');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var logger = require ('./logger');
var morgan = require ('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, config) {

  //First express server
  var express = require('express');
  app = express();
  app.set('port',process.env.PORT || 5000);
  app.get('/', function(req,res){
    res.send('Hello World!');
  });
  app.listen(config.port);

   logger.log("Loading Mongoose functionality");
   mongoose.Promise = require('bluebird');
   mongoose.connect(config.db, {useMongoClient: true});
   var db = mongoose.connection;
   db.on('error', function () {
     throw new Error('unable to connect to database at ' + config.db);
   });

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
    mongoose.set('debug', true);
     mongoose.connection.once('open', function callback() {
       logger.log("Mongoose connected to the database");
     });
    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
   var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
     require(model);
   });
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });

  var users = [ {name:'John', email:'woo@hoo.com'},
              {name: 'Betty', email: 'loo@woo.com'},
              {name: 'Hal', email: 'boo@woo.com'}
  ];
  app.get('/api/users',function (req, res){
    res.status(200).json(users);
  });

  app.use(express.static(config.root + '/public'));    //1

// Error handeling at the end of route chain
// First display route not found.
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
 
// If test mode then show us the error stack in the console log
    app.use(function (err, req, res, next) {
      if(process.env.NODE_ENV !== 'test') {
      console.error(err.stack);
    }
// else just bail out and display a general error
      res.type('text/plan');
      res.status(500);
      res.send('500 Sever Error');  
    });
  //
    logger.log("Starting application");
  };