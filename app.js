var http=require('http');
var url=require('url');
var js2xmlparser = require("js2xmlparser");

var server=http.createServer(function(req,res){

    var url_parts = url.parse(req.url, true);
    var pathname = url_parts.pathname;
    var querystring = url_parts.query;
    console.log('querystring: ', querystring);
    console.log(req.headers);
    console.log("1");
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.writeHead(200, {
//        'X-Powered-By': 'bacon'
//    });

    switch(pathname){
        case '/jsonresult/json':
            res.setHeader('Content-Type', 'application/json');
            var otherArray = ["item1", "item2"];
            var otherObject = { item1: "item1val", item2: "item2val" };
            var json = JSON.stringify({
              anObject: otherObject,
              anArray: otherArray,
              another: "item"
            });
            res.end(json);
        break;
        case '/xmlresult/xml':
            res.setHeader('Content-Type', 'application/xml');
            var otherObject = { item1: "item1val", item2: "item2val" };
            var xml = js2xmlparser.parse("person", otherObject);
            console.log(xml);
            res.end(xml);
        break;
        default:
            res.end('plaintextresult');
        break;
    }

}).listen(3001,"0.0.0.0");

console.log('Server running at http://0.0.0.0:3001/');
