var express = require("express");
var app = express();



app.get("/",function(req,res) {
	res.send("hello");
	res.end();
});

app.listen(80,function() {
	console.log("app is running at port 80.");
});