var server = require("./server");
var router = require("./router");
var requesthandler = require("./requesthandler");
var uploadf = require("./uploadf");
var formidable = require("formidable");

var handle = {}
handle["/"] = requesthandler.start;
handle["/start"] = requesthandler.start;
handle["/text"] = requesthandler.text;
handle["/upload"] = requesthandler.upload;
handle["/show"] = requesthandler.show;
handle["/login"] = requesthandler.login;
handle["/uploadpic"] = requesthandler.uploadpic;
handle["/uploadmd"] = requesthandler.uploadmd;
handle["/resarticle"] = requesthandler.resarticle;


server.start(router.route, handle);