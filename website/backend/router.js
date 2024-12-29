const cors = require('cors');

// 配置CORS選項
const corsOptions = {
  origin: '*', // 允許所有來源的請求，可以根据需要設置為特定的域名
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 允許的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允許的頭部信息
  credentials: true // 允許發送Cookie等憑證信息
};

function route(handle, pathname, response, request) {
  // 使用cors中間件並應用配置選項
  cors(corsOptions)(request, response, () => {
    if (pathname !== "/favicon.ico") {
      console.log("關於路由 " + pathname + " 的要求");
    }
    if (typeof handle[pathname] === 'function') {
      handle[pathname](response, request);
    } else {
      if (pathname !== "/favicon.ico") {
        console.log("沒有關於 " + pathname + " 的要求");
      }
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not found");
      response.end();
    }
  });
}

exports.route = route;
