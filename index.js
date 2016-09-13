var express = require("express");
var app = express();

var fs = require("fs");
var path = require("path");

function checkInstall() {
	// create path
	if( !fs.existsSync("path") ) {
		console.log("creating 'path'");
		fs.mkdirSync("path");
	}
	// copy index.json
	var file;
	file = "." + path.sep + "node_modules" + path.sep + "widig_start" + path.sep + "index.json";
	if( fs.existsSync(file) && !fs.existsSync("index.json") ) {
		console.log("copying 'index.json'");
		fs.writeFileSync("index.json",fs.readFileSync(file,"utf8"),"utf8");
	}
	
	file = "." + path.sep + "node_modules" + path.sep + "widig_start" + path.sep + "path" + path.sep + "root.js";
	if( fs.existsSync(file) && !fs.existsSync("path" + path.sep + "root.js") ) {
		console.log("copying 'path/root.js'");
		fs.writeFileSync("path" + path.sep + "root.js",fs.readFileSync(file,"utf8"),"utf8");
	}
	// create public
	if(!fs.existsSync("public")) {
		console.log("creating 'public'");
		fs.mkdirSync("public");
	}
	
	file = "." + path.sep + "node_modules" + path.sep + "widig_start" + path.sep + "public" + path.sep + "index.html";
	if(fs.existsSync(file) && !fs.existsSync("public" + path.sep + "index.html")) {
		console.log("copying 'public/index.html'");
		fs.writeFileSync("public" + path.sep + "index.html",fs.readFileSync(file,"utf8"),"utf8");
	}
	
}
function runServer() {
	var index = JSON.parse( fs.readFileSync("."+path.sep+"index.json","utf8") );
	console.log(process.cwd());
	if("get" in index) {
		for(var key in index.get) {
			app.get(key,require(process.cwd()  + path.sep + "path" + path.sep + index.get[key]));
		}
	}
	if("post" in index) {
		for(var key in index.get) {
			app.post(key,require(process.cwd()  + path.sep + "path" + path.sep + index.post[key]));
		}
	}
	app.listen(80,function() {
		console.log("app is running at port 80.");
	});
}
function main() {
	checkInstall();
	runServer();
}
module.exports = main;