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

restService.post('/closeincidents', function(req, res) {
    console.log( "closeincidents" );
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
        qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Unresolved'";
        
        Query( qString, req, res, function( result ){
            res.json( result );
        });

        
    }
    
});

var combObj;

restService.post('/getincidents', function(req, res) {
    console.log( "getincidents" );
    
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
        qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Unresolved'&orderBy=createdTime:desc";
        
        Query( qString, req, res, function( result ){
            //res.json( result );
            qString = result.items[0].id;
            Query( qString, req, res, function( result ){
                combObj["Unresolved"] = result;
                qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Solved'&orderBy=createdTime:desc";
                Query( qString, req, res, function( result ){
                    qString = result.items[0].id;
                    Query( qString, req, res, function( result ){
                        combObj["Solved"] = result;
                        res.json( combObj );
                    });
                });
            });
            
        });

        
    }
    
});

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});