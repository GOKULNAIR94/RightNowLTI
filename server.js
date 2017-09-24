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
var CloseInc = require("./closeinc");

var qString = "";
var Serial_Number = "";
var PumpAssetId = "";
var queryField = "", queryValue="";
var combObj = {};

restService.post('/closeincidents', function(req, res) {
    
    try{
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
            //res.json( result );
            var arrIds = result.items;
            var last = 0;
            if( arrIds.length > 0 ){
                for( var i=0; i < arrIds.length; i++){
                    if( i == arrIds.length -1)
                        last = 1;
                    
                    CloseInc( arrIds[i].id, last, req, res, function( result ){
                        console.log("Close Incidents");
                    });
                    
                        
                }
//                CloseInc( arrIds, req, res, function( result ){
//                    console.log("Close Incidents");
//                });
            }
            else{
                res.json({
                    message : "No records found!"
                });
            }
            
        });
        
    }
    }
    catch( e ){
        res.json({
            message : "Error: " + e 
        });
    }
    
});

    


restService.post('/getincidents', function(req, res) {
    console.log( "getincidents" );
    
    try{
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
        combObj = {};
        qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Unresolved'&orderBy=createdTime:desc";
        Query( qString, req, res, function( result ){
            //res.json( result );
            if( result.items.length > 0 ){
                qString = result.items[0].id;
                
                Query( qString, req, res, function( result ){
                    combObj["Unresolved"] = result;
                    
                    qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Solved'&orderBy=createdTime:desc";
                    Query( qString, req, res, function( result ){
                        if( result.items.length > 0 ){
                            qString = result.items[0].id;
                            Query( qString, req, res, function( result ){
                                combObj["Solved"] = result;
                                console.log( "combObj 1: " + JSON.stringify(combObj));
                                res.json( combObj );
                            });
                        }
                        else{
                            console.log( "combObj 2: " + JSON.stringify(combObj) );
                            res.json( combObj );
                        }
                            
                    });

                });
            }
            else{
                qString = "?q=customFields.CO." + queryField + "%3D'" + queryValue + "'%20AND%20statusWithType.status.lookupName%3D'Solved'&orderBy=createdTime:desc";
                Query( qString, req, res, function( result ){
                    if( result.items.length > 0 ){
                        qString = result.items[0].id;
                        Query( qString, req, res, function( result ){
                            combObj["Solved"] = result;
                            console.log( "combObj 3: " + JSON.stringify(combObj) );
                            res.json( combObj );
                        });
                    }
                    else{
                            console.log( "combObj 4: " + JSON.stringify(combObj) );
                            res.json( combObj );
                        }
                });
                
            }
            
        });

    }
    }
    catch( e ){
        res.json({
            message : "Error: " + e 
        });
    }
    
});

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});