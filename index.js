var express = require("express");
var app = express();

var fs = require("fs");


var index = JSON.parse( fs.readFileSync("index.json","utf8") );
if("get" in index) {
	for(var key in index.get) {
		app.get(key,require(index.get[key]));
	}
}
if("post" in index) {
	for(var key in index.get) {
		app.post(key,require(index.get[key]));
	}
}

app.listen(80,function() {
	console.log("app is running at port 80.");
});