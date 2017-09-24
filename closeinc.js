module.exports = function ( id, last, req, res, callback){ 
    var http = require("https");
    var CloseInc = require("./closeinc");
    
    var request = require("request");
    var output;
    var varAuth = 'Basic cHBhdGthcjpsbnRMTlQxMjM0';

    var request = require("request");

var options = { method: 'POST',
  url: 'https://ntinfotech--tst.custhelp.com/services/rest/connect/latest/incidents/' + id,
  headers: 
   { 'postman-token': '9db60d9f-9762-94fa-5a51-e36d77d114d1',
     'cache-control': 'no-cache',
     'x-http-method-override': 'PATCH',
     authorization: 'Basic cHBhdGthcjpsbnRMTlQxMjM0' },
  body: '{\n"statusWithType": {\n       "status": {\n            "lookupName": "Solved"\n        }\n    }\n }' };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log( "status COde : " + response.statusCode);
        
        try{
            if( response.statusCode < 200 || response.statusCode >=300 ){
                res.json({
                    statusCode : response.statusCode,
                    message : "Failed"
                });
            }
            else{
                if( last == 1 ){
                    res.json({
                        statusCode : 200,
                        message : "Successful"
                    });
                }
            }
        }
        catch( e ){
            res.json({
                statusCode : 500,
                message : "Internal Server Error!"
            });
        }
    });
}
