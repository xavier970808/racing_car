var http = require("http");
var url = require("url");
const cors = require('cors');

function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    (req, res) => {
      const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
      };
    
      if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
      }
    
      if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers);
        res.end('Hello World');
        return;
      }
    
      res.writeHead(405, headers);
      res.end(`${req.method} is not allowed for the request.`);
    }
    if (pathname != "/favicon.ico"){
      console.log("收到 " + pathname + " 的要求");
    }
      route(handle, pathname, res, req);
  

  }

  http.createServer(onRequest).listen(20842);
  console.log("伺服器已啟動");
}

exports.start = start;