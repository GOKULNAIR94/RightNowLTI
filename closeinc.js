module.exports = function ( arrIds, req, res, callback){ 
    var http = require("https");
    var CloseInc = require("./closeinc");
    
    var request = require("request");
    var output;
    var varAuth = 'Basic cHBhdGthcjpsbnRMTlQxMjM0';

    var request = require("request");

var options = { method: 'POST',
  url: 'https://ntinfotech--tst.custhelp.com/services/rest/connect/latest/incidents/' + arrIds[0].id,
  headers: 
   { 'postman-token': '9db60d9f-9762-94fa-5a51-e36d77d114d1',
     'cache-control': 'no-cache',
     'x-http-method-override': 'PATCH',
     authorization: 'Basic cHBhdGthcjpsbnRMTlQxMjM0' },
  body: '{\n"assignedTo": {\n        "account": null,\n        "staffGroup": {\n            "lookupName": "Admin"\n        }\n    }\n }' };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log( "status COde : " + response.statusCode);
        
        if( response.statusCode < 200 || response.statusCode >=300 ){
              res.json({
                    statusCode : response.statusCode,
                    message : "Failed"
                });
          }
          else{
              arrIds.splice(0,1);
              if( arrIds.length == 0 ){
                  res.json({
                        statusCode : 200,
                        message : "Successful"
                    });
              }
              else{
                  console.log( "arrIds : " + arrIds[0].id);  
                  CloseInc( arrIds, req, res, function( result ){
                      console.log("Closed");
                  });
              }
          }
    });
    
    
//    var options = {
//      "method": "POST",
//      "hostname": "ntinfotech--tst.custhelp.com",
//      "port": null,
//      "path": "/services/rest/connect/latest/incidents/" + arrIds[0].id,
//      "headers": {
//        "authorization": "Basic cHBhdGthcjpsbnRMTlQxMjM0",
//        "x-http-method-override": "PATCH",
//        "cache-control": "no-cache",
//        "postman-token": "453a1486-b373-bf0b-4667-485bb7678b6d"
//      }
//    };
//
//    var req = http.request(options, function (resp) {
//      var responseString = '',
//            resObj;
//      resp.on("data", function ( data ) {
//        responseString += data;
//      });
//
//      resp.on("end", function () {
//          //console.log( "responseString : " + responseString );
//          resObj = JSON.parse(responseString);
//          //console.log( "resObj : " + JSON.stringify(resObj));
//          
//          console.log( "status COde : " + resp.statusCode);
//            console.log( "arrIds : " + arrIds[0].id);
//          if( resp.statusCode < 200 || resp.statusCode >=300 ){
//              res.json({
//                    statusCode : resp.statusCode,
//                    message : "Failed"
//                });
//          }
//          else{
//              if( arrIds.length == 0 ){
//                  res.json({
//                        statusCode : 200,
//                        message : "Successful"
//                    });
//              }
//              else{
//                  arrIds.splice(0);
//                  CloseInc( arrIds, req, res, function( result ){
//                      console.log("Closed");
//                  });
//              }
//          }
//      });
//        resp.on("error", function ( error ) {
//            console.log("Error : " + error);
//      });
//    });
//
//    req.write( "{\n\"assignedTo\": {\n        \"account\": null,\n        \"staffGroup\": {\n            \"lookupName\": \"GB Staffs\"\n        }\n    }\n }");
//
//    //req.write( "{ 'statusWithType.status.lookupName' : 'Solved' }");
//    req.end();
}
