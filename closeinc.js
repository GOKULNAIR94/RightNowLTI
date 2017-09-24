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
            console.log( "arrIds : " + arrIds[0].id);
          if( resp.statusCode < 200 || resp.statusCode >=300 ){
              res.json({
                    statusCode : resp.statusCode,
                    message : "Failed"
                });
          }
          else{
              if( arrIds.length == 0 ){
                  res.json({
                        statusCode : 200,
                        message : "Successful"
                    });
              }
              else{
                  arrIds.splice(0);
                  CloseInc( arrIds, req, res, function( result ){
                      console.log("Closed");
                  });
              }
          }
      });
    });

    req.write( "{ 'assignedTo.staffGroup.lookupName' : 'Admin' } ");  //GB Staffs

    //req.write( "{ 'statusWithType.status.lookupName' : 'Solved' }");
    req.end();
}
