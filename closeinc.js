module.exports = function ( id, req, res, callback){ 
    var http = require("https");

    var options = {
      "method": "POST",
      "hostname": "ntinfotech--tst.custhelp.com",
      "port": null,
      "path": "/services/rest/connect/latest/incidents/" + id,
      "headers": {
        "authorization": "Basic cHBhdGthcjpsbnRMTlQxMjM0",
        "x-http-method-override": "PATCH",
        "cache-control": "no-cache",
        "postman-token": "453a1486-b373-bf0b-4667-485bb7678b6d"
      }
    };

    var req = http.request(options, function (res) {
      var responseString = '',
            resObj;
      res.on("data", function ( data ) {
        responseString += data;
      });

      res.on("end", function () {
          console.log( "responseString : " + responseString );
          resObj = JSON.parse(responseString);
          console.log( "resObj : " + JSON.stringify(resObj));
          callback( resObj );
      });
    });

    req.write( "{ 'statusWithType.status.lookupName' : 'Solved' }");
    req.end();
}
