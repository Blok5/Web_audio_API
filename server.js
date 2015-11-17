'use strict';

var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {

	var pathName = request.url;

	if ( pathName.lastIndexOf('/') == pathName.length-1 ) {
		pathName = '/index.html';
	}

	console.log("Запрос по адресу: " + __dirname + '/app' + pathName);

	fs.readFile(__dirname + '/app' + pathName, function (err, data) {
		if (err) {
			response.writeHead(404);
			response.end(JSON.stringify(err));
			return;
		} else {
			response.writeHead(200);
			response.end(data);
		}
	})
}).listen(3000);

console.log("Сервер запущен! Порт: 3000");
