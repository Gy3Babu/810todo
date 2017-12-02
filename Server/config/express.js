
// put in requrements
var express = require('express'),
 glob = require('glob'),
 mongoose = require('mongoose'),
 bluebird = require('bluebird'),
 logger = require ('./logger'),
 morgan = require ('morgan'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 multer = require('multer'),
 mkdirp = require('mkdirp');


module.exports = function (app, config) {

  //First express server
  var express = require('express');
  app = express();
  app.set('port',process.env.PORT || 5000);
  app.listen(config.port);

  app.use(cors({origin: 'http://localhost:9001'}));
  
  

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

  app.use(bodyParser.json({limit: '1000mb'}));
  
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));

   var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
     require(model);
   });
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });


  app.use(express.static(config.root + '/public'));

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
  logger.log("Starting application");
};



