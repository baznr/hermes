/*************************************************************************
* HTML <--> Socket.io functions
* Distributed under GPL v2.0
* Copyright (c) 2012 Dimitri Vusunaras <dbaznr@gmail.com>
* All rights reserved.
*************************************************************************/

// requests to peripheral
var macroVar=[];

function setDigitalMode(pin,mode){
	var args=[];
	args[0] = (mode==INPUT)?HRM_PIN_MODE_INPUT:HRM_PIN_MODE_OUTPUT;
	args[1]	= pin;
	sendCommand(args);
};

function setDigitalValue(pin,value){
	var args=[];
	args[0] = (value==HIGH)?HRM_PIN_SET:HRM_PIN_CLEAR;	
	args[1]	= pin;
	sendCommand(args);
};

function reqDigitalToggle(pin){
	var args=[];
	args[0] = HRM_PIN_TOGGLE;	
	args[1]	= pin;
	sendCommand(args);
};

function reqDigitalValue(pin){
	var args=[];
	args[0] = HRM_PIN_GET;
	args[1]	= pin;
	sendCommand(args);
};

function setAnalogValue(pin,value){
	var args=[];
	args[0] = HRM_ANALOG_WRITE;
	args[1]	= pin;
	args[2]	= value;
	sendCommand(args);
};

function reqAnalogValue(pin){
	var args=[];
	args[0] = HRM_ANALOG_READ;
	args[1]	= pin;
	sendCommand(args);
};

function reqAnalogLim(pin,min,max){
	var args=[];
	args[0] = HRM_SET_ANALOG_LIM;
	args[1]	= pin;
	args[2]	= min;
	args[3]	= max;
	sendCommand(args);
};

function setMacroParam(idx,value){
	var args=[];
	args[0] = HRM_MACRO_PARAMS;
	args[1]	= idx;
	args[2]	= value;
	sendCommand(args);	
}

function reqMacroExec(code){ // code:0-63
	var args=[];
	args[0] = HRM_EXECUTE_MACRO;
	args[1]	= code;
	sendCommand(args);	
}

function reqEepromRead(addr){
	var args=[];
	args[0] = HRM_EEPROM_READ;
	args[1]	= addr %1024;
	sendCommand(args);	
}

function reqEepromWrite(addr,value){
	var args=[];
	args[0] = HRM_EEPROM_WRITE;
	args[1]	= addr %1024;
	args[2]	= value %256;
	sendCommand(args);	
}

function reqServoMove(servo,pos,spd){
	var args=[];
	args[0] = HRM_SERVO_MOVE;
	args[1]	= servo %64;
	args[2]	= pos %181;
	args[3]	= spd %64;
	sendCommand(args);	
}

// returns from peripheral
function getDigitalMode(pin,mode){
	dgM[pin]((mode==INPUT)?'I':'O');
};

function getDigitalValue(pin,value){
	dgP[pin](value);
};

function getAnalogValue(pin,value){
	anPin[pin](value);
};

function getAnalogLim(pin,min,max){
	$('#statusbar').html('Analog pin:A'+pin+' limited in range [ '+min+' - '+max+' ]');
};

function getMacroResult(name,value){
	macroVar[name]=value;
	$('#macroRes').html(name+"="+value);
};

function getAlphaAlert(msg,val){
	$('#statusbar').html(serialMsg[msg].replace(/#/i,val));
};

function getFromEeprom(addr,value){
	$('#statusbar').html("EEPROM address:["+addr+"] = "+value);	
};

function getServoMove(servo,pos){
	$('#servoRes').html("Servo #"+servo+" at "+pos+"&deg;");		
};
