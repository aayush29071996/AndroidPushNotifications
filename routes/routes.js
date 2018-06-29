
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017';
var express = require('express');
var router = express.Router();
var Pushy = require('pushy');
var pushyAPI = new Pushy('e8d98f0138a37b8bee319ecc77ec62b6220047e0ca84d53991f11624392452ad');




var path = require('path'),
    fs = require('fs');
var bodyParser = require('body-parser');


url ="https://butingstiontookeentsedis:c695a552ff0b50e118db3b4bf91c0ff4146cdc78@85c55b26-45df-413a-852a-5f589409004d-bluemix.cloudant.com";

var dbhandle = require('cloudant')(url, function(err,cloudant){
    if (err) {
        return console.log('Error connecting to Cloudant account %s: %s',  err.message);
    }else{
        console.log('Connected to cloudant using %s');
    }
});

var mydb = dbhandle.use("db_pushnotification");



    router.get('/', function (request, response) {
        response.render('index.html');
    });

    router.post('/submit', function (request, response) {
            date1 = request.body.date1;
            startTime = request.body.startTime;
            duration = request.body.duration;
            token = request.body.driverToken;

            console.log(date1);
            console.log(startTime);
            console.log(duration);


        var data = {
            title: 'Light Metrics',

            message: 'Hello Driver',

            body: request.body.date1 +"T"+ request.body.startTime +"T"+ request.body.duration

        };


        var tokens = [token];

        var options = {
            notification: {
                badge: 1,
                sound: 'ping.aiff',
                body1: 'Hello World \u270c'
            },
        };


        pushyAPI.sendPushNotification(data, tokens,options, function (err, id) {
            // Log errors to console
            if (err) {
                return console.log('Fatal Error', err);
            }

            // Log success
            console.log('Push sent successfully! (ID: ' + id + ')');
        });






    });


    router.post('/getToken', function (request, response) {


             token = request.body.token;
             deviceId = request.body.deviceId;
             driverId = request.body.driverId;
             timeStamp = request.body.timeStamp;


        console.log(token);
        console.log(deviceId);
        console.log(driverId);
        console.log(timeStamp);



        mydb.insert({ "TOKEN_ID": token.toString(), "IMEI":deviceId.toString(), "DRIVER_ID":driverId.toString(), "TIMESTAMP":timeStamp.toString() }, "DOCUMENT_"+deviceId.toString()+"_"+driverId.toString()+"_"+timeStamp.toString() , function(err, body) {
            if (err) {
                return console.log('Fatal Error', err);
            }
            console.log('Cloudant document created');
            console.log(body);
        });


        /*

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertToken(db, function() {
                db.close();
            });
        });



        var insertToken = function(db, callback) {
            db.collection('PhoneTokens').insertOne( {
                "Token" : token
            }, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the PhoneTokens collection.");
                callback();
            });
        };

*/

});









module.exports = router;




