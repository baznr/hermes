/*************************************************************************
* node.js <--> Hermes functions
* Distributed under GPL v2.0
* Copyright (c) 2012 Dimitri Vusunaras <dbaznr@gmail.com>
* All rights reserved.
*************************************************************************/

var serialport = require("serialport");				
var	SerialPort  = serialport.SerialPort;			
var	app = require('express')();						
var	server = require('http').createServer(app);		
var	io = require('socket.io').listen(server);	
	
var socketPort=4000;
var debugON = 0, debugOFF = 1;
var comPort = "/dev/ttyACM0";

server.listen(socketPort);
io.set('log level',debugOFF); 

console.log("Hermes is serving port " + socketPort + '.');

var myPort = new SerialPort(comPort, {
	baudRate: 57600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,	 
	parser: serialport.parsers.readline("\n") 
});
  

io.sockets.on('connection', function (socket) {
	myPort.on('data', function (data) {
		socket.emit('fromDevice', data);
		//console.log('<== '+data);
	});
	socket.on('toDevice',function(cmd){
		//console.log('==> '+cmd);
		myPort.write(cmd);
	});
});


