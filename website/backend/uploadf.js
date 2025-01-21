const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
function uploadf(request, response){
  console.log("uploadf有被呼叫")
  // 设置存储路径和文件名称
  const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  // 创建文件上传中间件
  const upload = multer({ storage: storage });

  /**
   * 处理文件上传请求
   * upload.single('image') 函数中 `image` 为接收文件的参数名
   */
  app.post("/upload", upload.single("image"), (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    res.json({ filePath: filePath });
  });
}

exports.uploadf = uploadf;