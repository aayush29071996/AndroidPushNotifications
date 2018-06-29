var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8081;
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017';


fs = require('fs');
var http = require('http')
var server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);








app.listen(8081);
console.log('Listening  to  port ' + port);

