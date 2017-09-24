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


var Query = require("./query");

var qString = "";
var Serial_Number = "";
var PumpAssetId = "";
var queryField = "", queryValue="";

restService.post('/', function(req, res) {
    Serial_Number = req.query.serialnum;
    PumpAssetId = req.query.assetid;
    
    if( (Serial_Number == null || Serial_Number == "") && (PumpAssetId == null || PumpAssetId == "") ) {
        res.json({
            statusCode : 404,
            statusText : "Bad Request",
            message : "Required: Serial Number or Asset Id"
        });
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
        qString = "customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Unresolved'";
        
        Query( qString, req, res, function( result ){
            res.json( result );
        });

        
    }
    
});

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});