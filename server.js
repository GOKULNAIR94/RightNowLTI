'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var http = require('https'),
    fs = require('fs');

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

var serialNum = "";
var assetId = "";

restService.post('/', function(req, res) {
    serialNum = request.query.serialnum;
    assetId = request.query.assetid;

    console.log( "serialNum : " + serialNum );
    console.log( "assetId : " + assetId );
    res.json({
        "serialNum" : serialNum,
        "assetId" : assetId
    });
    }
});

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});