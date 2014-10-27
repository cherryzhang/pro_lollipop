/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');
var ejs = require('ejs');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/lollipop');
//var db = monk('mongodb://026e5d33-bfef-4cc9-b278-7ebcbf2fcce2:dbd0760a-bd07-424d-b13e-bf5fd32b1d0a@192.155.236.85:10054/db');


// setup middleware
var app = express();
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

require('./routes/index').init(app, db);


// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);
//test