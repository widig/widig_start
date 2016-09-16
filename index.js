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
	var app_path = "." + path.sep + "node_modules" + path.sep + "widig_start" + path.sep;
	// copy index.json
	
	var file;
	file = app_path + "index.json";
	if( fs.existsSync(file) && !fs.existsSync("index.json") ) {
		console.log("copying 'index.json'");
		fs.writeFileSync("index.json",fs.readFileSync(file,"utf8"),"utf8");
	}
	
	if( !fs.existsSync("path" + path.sep + "get") ) {
		console.log("creating 'path/get'");
		fs.mkdirSync("path" + path.sep + "get");
	}
	if( !fs.existsSync("path" + path.sep + "post") ) {
		console.log("creating 'path/post'");
		fs.mkdirSync("path" + path.sep + "post");
	}
	if( !fs.existsSync("path" + path.sep + "put") ) {
		console.log("creating 'path/put'");
		fs.mkdirSync("path" + path.sep + "put");
	}
	if( !fs.existsSync("path" + path.sep + "delete") ) {
		console.log("creating 'path/delete'");
		fs.mkdirSync("path" + path.sep + "delete");
	}
	
	file = app_path + "path" + path.sep + "get" + path.sep + "root.js";
	if( fs.existsSync(file) && !fs.existsSync("path" + path.sep + "get" + path.sep + "root.js") ) {
		console.log("copying 'path/get/root.js'");
		fs.writeFileSync("path" + path.sep + "get" + path.sep + "root.js",fs.readFileSync(file,"utf8"),"utf8");
	}
	// create public
	if(!fs.existsSync("public")) {
		console.log("creating 'public'");
		fs.mkdirSync("public");
	}
	
	file = app_path + "public" + path.sep + "index.html";
	if(fs.existsSync(file) && !fs.existsSync("public" + path.sep + "index.html")) {
		console.log("copying 'public/index.html'");
		fs.writeFileSync("public" + path.sep + "index.html",fs.readFileSync(file,"utf8"),"utf8");
	}
	
	if( !fs.existsSync("filter") ) {
		console.log("creating 'filter'");
		fs.mkdirSync("filter");
	}
	
	file = app_path + "filter" + path.sep + "debug.js";
	if(fs.existsSync(file) && !fs.existsSync("filter" + path.sep + "debug.js")) {
		console.log("copying 'filter/debug.js'");
		fs.writeFileSync("filter" + path.sep + "debug.js",fs.readFileSync(file,"utf8"),"utf8");
	}
	
	file = app_path + "filter" + path.sep + "post_querystring.js";
	if(fs.existsSync(file) && !fs.existsSync("filter" + path.sep + "post_querystring.js")) {
		console.log("copying 'filter/post_querystring.js'");
		fs.writeFileSync("filter" + path.sep + "post_querystring.js",fs.readFileSync(file,"utf8"),"utf8");
	}
	
}
function runServer() {
	var index = JSON.parse( fs.readFileSync("."+path.sep+"index.json","utf8") );
	console.log(process.cwd());
	function installRoutes(a) {
		for(var key in index.get) {
			var target = require(process.cwd()  + path.sep + "path" + path.sep + a + path.sep + index[a][key][ index[a][key].length-1 ]);
			if(index[a][key].length>1) {
				for(var x = index[a][key].length-2; x >= 0; x--) {
					target = require(process.cwd() + path.sep + "filter" + path.sep + index[a][key][x])(target);
				}
			}
			app[a](key,target);
		}
	}
	if("get" in index) installRoutes("get");
	if("post" in index) installRoutes("post");
	if("put" in index) installRoutes("put");
	if("delete" in index) installRoutes("delete");
	app.listen(80,function() {
		console.log("app is running at port 80.");
	});
}
function main() {
	checkInstall();
	runServer();
}
module.exports = main;