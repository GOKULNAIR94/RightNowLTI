module.exports = function ( qString, req, res, callback){ 
    var http = require("https");

    var options = {
      "method": "GET",
      "hostname": "ntinfotech--tst.custhelp.com",
      "port": null,
      "path": "/services/rest/connect/latest/incidents?q=" + qString, //customFields.CO.Serial_Number%3D'C355'%20AND%20statusWithType.status.lookupName%3D'Solved'
      "headers": {
        "authorization": "Basic cHBhdGthcjpsbnRMTlQxMjM0",
        "cache-control": "no-cache",
        "postman-token": "bb2621fe-1913-b93a-3ab3-03dcae7c592c"
      }
    };

    var req = http.request(options, function (res) {
      var responseString = '',
            resObj;

      res.on("data", function ( data ) {
        responseString += data;
      });

      res.on("end", function () {
          console.log("Body : " + responseString);
          resObj = JSON.parse(responseString);
          var rowCount = resObj.count;
          console.log( "rowCount : " + rowCount);
          console.log( "resObj : " + JSON.stringify(resObj.items));
          callback( resObj.items );
      });
    });

    req.end();
}
