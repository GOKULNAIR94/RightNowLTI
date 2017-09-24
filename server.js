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
var queryField;

restService.post('/', function(req, res) {
    
    if( (Serial_Number == null || Serial_Number == "") && (PumpAssetId == null || PumpAssetId == "") ) {
        //Error
    }
    else{
        if( (Serial_Number == null && Serial_Number == "")  ) {
            queryField = "PumpAssetId";
            queryValue = req.query.assetid;
            console.log( "PumpAssetId : " + PumpAssetId );
        }
        else{
            queryField = "Serial_Number";
            queryValue = req.query.serialnum;
            console.log( "Serial_Number : " + Serial_Number );
        }

        res.json({
            queryField : queryValue
        });
    }
    
});

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});