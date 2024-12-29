var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
formidable = require("formidable");
util = require('util');
const path = require('path');
const cors = require('cors');


function start(response) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="上傳檔案" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function text(response) {
  console.log("Request handler 'text' was called.");

  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=utf-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post">'+
  '<textarea name="text" rows="1" cols="20"></textarea>'+
  '<input type="submit" value="發送" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  form.uploadDir="tmp";
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    console.log(files.upload);

     fs.renameSync(files.upload, "/tmp/test.png");
    
    /*var readStream = fs.createReadStream(files.upload.path);
    var writeStream = fs.createWriteStream("/tmp/test.png");
    util.pump(readStream, writeStream, function() {
      fs.unlinkSync(files.upload.path);
    })
    readStream.pipe(writeStream);
    readStream.on('end', function(){fs.unlinkSync(files.upload.path);});*/
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}
  
function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
      }
  });
}

//此為分隔線---------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

function login(response) {
  console.log("Request handler 'login' was called.")

  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=utf-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/start" method="post">'+
  '帳號 : '+
  '<textarea name="text" rows="1" cols="20"></textarea>'+
  '<br>' +
  '密碼 : '+
  '<textarea name="text" rows="1" cols="20"></textarea>'+
  '<input type="submit" value="發送" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function uploadpic(response, request) {
  console.log("有人上傳圖片")

  var form = new formidable.IncomingForm;
  form.uploadDir="articlepic";
  console.log("about to parse");
  form.parse(request, function(error, fields, form) {
    console.log("parsing done");
    console.log(upload.image);
    response.writeHead(200);
})
}


// 上傳md文件並依數字儲存進資料夾
function uploadmd(request, response) {
  console.log("有人上傳文章");

  // 使用handleCors处理CORS请求
  handleCors(request, response, () => {
      if (request.method === 'OPTIONS') {
          // 如果是OPTIONS请求，直接返回200状态码
          console.log("OPTIONS请求");
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.end();
          return;
      }

      if (request.method === 'POST') {
          // 假设上传的文件在request的files属性中
          if (!request.files || Object.keys(request.files).length === 0) {
              response.writeHead(400, {"Content-Type": "text/plain"});
              response.write('No files were uploaded.');
              return response.end();
          }

          const uploadedFile = request.files.file; // 假设文件字段名为'file'
          const filenameDir = path.join(__dirname, 'filename'); // 假设filename文件夹与requesthandler.js在同一目录下

          if (!fs.existsSync(filenameDir)){
              fs.mkdirSync(filenameDir);
          }

          // 检查上传的文件是否为.md文件
          if (path.extname(uploadedFile.name) !== '.md') {
              response.writeHead(400, {"Content-Type": "text/plain"});
              response.write('Only .md files are allowed.');
              return response.end();
          }

          const newFileName = generateFileName(filenameDir, uploadedFile.name); // 假设generateFileName函数会生成新的文件名，保留原始文件扩展名
          const filePath = path.join(filenameDir, newFileName);

          uploadedFile.mv(filePath, function(err) {
              if (err) {
                  console.error("上传文件时发生错误: " + err);
                  response.writeHead(500, {"Content-Type": "text/plain"});
                  response.write("Server Error");
                  return response.end();
              }
              console.log("文件上传成功: " + newFileName);
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.write(`文件已成功上传并存储在 ${newFileName}`);
              response.end();
          });
      } else {
          response.writeHead(405, {"Content-Type": "text/plain"});
          response.write("Method not allowed");
          response.end();
      }
  });
}


// 讀取請求數字的資料夾裡的md檔
function resarticle(request, response) {
    console.log("請求: " + request.url);

    // 假設url中帶有文件數字，例如 '/article/1'
    const folderNumber = request.url.split('/').filter(Boolean)[1]; // 提取url中的文件數字
    const articleDir = path.join(__dirname, 'article', `article${folderNumber}`);

    if (!fs.existsSync(articleDir)) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("該文件夾不存在");
        return response.end();
    }

    fs.readdir(articleDir, (err, files) => {
        if (err) {
            console.error("讀取目錄時發生錯誤: " + err);
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write("Server Error");
            return response.end();
        }

        // 篩選出.md文件
        const mdFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');

        if (mdFiles.length === 0) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("該文件夾中沒有.md文件");
            return response.end();
        }

        // 讀取每個.md文件的內容並累加到一個字符串中
        let allContent = '';
        let filesRead = 0;

        mdFiles.forEach(mdFile => {
            const filePath = path.join(articleDir, mdFile);

            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error("讀取文件時發生錯誤: " + err);
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write("Server Error");
                    return response.end();
                }

                allContent += `<h2>${mdFile}</h2><pre>${content}</pre>`;
                filesRead++;

                // 當所有文件都已讀取，寫入響應
                if (filesRead === mdFiles.length) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(allContent);
                    response.end();
                }
            });
        });
    });
}


// 生成唯一的文件名
function filename(folderPath) {
  let fileNumber = 1;
  while (fs.existsSync(path.join(folderPath, `article${fileNumber}.md`))) {
      fileNumber++;
  }
  return `article${fileNumber}.md`;
}

// 配置CORS选项
const corsOptions = {
  origin: '*', // 允许所有来源的请求，可以根据需要设置为特定的域名
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头部信息
  credentials: true // 允许发送Cookie等凭证信息
};

// 处理CORS请求的函数
function handleCors(request, response, next) {
  cors(corsOptions)(request, response, next);
}




  exports.start = start;
  exports.text = text;
  exports.upload = upload;
  exports.show = show;
  exports.login = login;
  exports.uploadpic = uploadpic;
  exports.uploadmd = uploadmd;
  exports.resarticle = resarticle;