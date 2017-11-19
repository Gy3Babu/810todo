var express = require('express'), //1
config = require('./config/config');    
var logger = require ('./config/logger');

//create app instance of express.js
var app;

//pull in  config files
require('./config/express')(app, config);
logger.log("Creating HTTP server on port: " + config.port);

module.exports = app