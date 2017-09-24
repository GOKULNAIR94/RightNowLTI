module.exports = function ( arrIds, req, res, callback){ 
    var http = require("https");
    var CloseInc = require("./closeinc");
    
    var options = {
      "method": "POST",
      "hostname": "ntinfotech--tst.custhelp.com",
      "port": null,
      "path": "/services/rest/connect/latest/incidents/" + arrIds[0].id,
      "headers": {
        "authorization": "Basic cHBhdGthcjpsbnRMTlQxMjM0",
        "x-http-method-override": "PATCH",
        "cache-control": "no-cache",
        "postman-token": "453a1486-b373-bf0b-4667-485bb7678b6d"
      }
    };

    var req = http.request(options, function (resp) {
      var responseString = '',
            resObj;
      resp.on("data", function ( data ) {
        responseString += data;
      });

      resp.on("end", function () {
          //console.log( "responseString : " + responseString );
          resObj = JSON.parse(responseString);
          //console.log( "resObj : " + JSON.stringify(resObj));
          
            console.log( "status COde : " + resp.statusCode);
            console.log("Status : " + resp.status);
            console.log("varStatus : " + resp.statusText);
          
          if( arrIds.length == 0 ){
              res.json({
                    statusCode : 200,
                    statusText : "Success",
                    message : "Update Successful"
                });
          }
          else{
              arrIds.remove(0);
              CloseInc( arrIds, req, res, function( result ){
                  console.log("Closed");
              });
          }
          callback( resObj );
      });
    });

    req.write( "{ 'assignedTo.staffGroup.id' : '100107' } " );

    //req.write( "{ 'statusWithType.status.lookupName' : 'Solved' }");
    req.end();
}
