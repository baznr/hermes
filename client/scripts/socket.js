/*************************************************************************
* Socket.io <--> Hermes functions
* Distributed under GPL v2.0
* Copyright (c) 2012 Dimitri Vusunaras <dbaznr@gmail.com>
* All rights reserved.
*************************************************************************/
var socket;
var serverAddr='http://192.168.1.4:4000';

function sendCommand(args){
	res='';
	cmd = args[0];
	switch (cmd) {
		case HRM_PIN_MODE_INPUT:
		case HRM_PIN_MODE_OUTPUT:
		case HRM_PIN_SET:
		case HRM_PIN_CLEAR:
		case HRM_PIN_TOGGLE:
		case HRM_PIN_GET:
		case HRM_ANALOG_READ:
		case HRM_EXECUTE_MACRO:
			res = encode_1(args[1]);
			break;
		case HRM_ANALOG_WRITE:
		case HRM_MACRO_PARAM:
			res = encode_1(args[1]) + encode_2(args[2]);
			break;	    	        
		case HRM_EEPROM_READ:
			res = encode_2(args[1]);
			break;	    	        
		case HRM_EEPROM_WRITE:
			res = encode_2(args[1]) + encode_2(args[2]);
			break;	    	        
		case HRM_SET_ANALOG_LIM:
			res = encode_1(args[1]) + encode_2(args[2]) + encode_2(args[3]);
			break;	    	        
		case HRM_SERVO_MOVE:
			res = encode_1(args[1]) + encode_2(args[2]) + encode_1(args[3]);
			break;	    	        
	};
	socket.emit('toDevice',HRM_START + cmd + res);
	$('#outData').prepend(HRM_START + cmd + res+'<br>');
};

$(document).ready(function(){
	socket=io.connect(serverAddr);

	socket.on('fromDevice',function(chunk){
		$('#inData').prepend(chunk + '<br>');
		//alert(chunk);
		cmd = chunk.charAt(1);
		switch (cmd) {
			case HRM_PIN_MODE_INPUT:
				pin=decode_1(chunk.charAt(2));
				getDigitalMode(pin,INPUT);
				break;
			case HRM_PIN_MODE_OUTPUT:
				pin=decode_1(chunk.charAt(2));
				getDigitalMode(pin,OUTPUT);
				break;
			case HRM_PIN_SET:
				pin=decode_1(chunk.charAt(2));
				getDigitalValue(pin,HIGH);
				break;
			case HRM_PIN_CLEAR:
				pin=decode_1(chunk.charAt(2));
				getDigitalValue(pin,LOW);
				break;
			case HRM_PIN_TOGGLE:
			case HRM_PIN_GET:
			case HRM_DGT_PIN_VAR:
				pin=decode_1(chunk.charAt(2));
				value=decode_1(chunk.charAt(3));
				getDigitalValue(pin,value);
				break;
			case HRM_ANALOG_READ:
			case HRM_ANALOG_MIN:
			case HRM_ANALOG_MAX:
				pin=decode_1(chunk.charAt(2));
				value=decode_2(chunk.substr(3,2));
				getAnalogValue(pin,value);
				break;
			case HRM_ANALOG_WRITE:
				pin=decode_1(chunk.charAt(2));
				value=decode_2(chunk.substr(3,2));
				getDigitalValue(pin,value);
				break;
			case HRM_SET_ANALOG_LIM:
				pin=decode_1(chunk.charAt(2));
				min=decode_2(chunk.substr(3,2));
				max=decode_2(chunk.substr(5,2));
				getAnalogLim(pin,min,max);
				break;
			case HRM_VIEW_MACRO_RESULT:
				name=chunk.charAt(2);
				value=decode_2(chunk.substr(3,2));
				getMacroResult(name,value);
				break;				
			case HRM_ALPHA_ALERT:
				msg=decode_2(chunk.substr(2,2));
				value=decode_2(chunk.substr(4,2));
				getAlphaAlert(msg,value);
				break;				
			case HRM_EEPROM_READ:
			case HRM_EEPROM_WRITE:
				addr=decode_2(chunk.substr(2,2));
				value=decode_2(chunk.substr(4,2));
				getFromEeprom(addr,value);
				break;				
			case HRM_SERVO_MOVE:
				servo=decode_1(chunk.charAt(2));
				pos=decode_2(chunk.substr(3,2));
				getServoMove(servo,pos);
				break;				
		};
	});
});

function cardinal(c){
	p=alpha.indexOf(c);
	return (p==-1)?0:p;
}

function decode_1(c){
  return cardinal(c);		
}

function decode_2(ml){
  return cardinal(ml.charAt(0))*HRM_BASE + cardinal(ml.charAt(1));		
}

function encode_1(v){
  v%=HRM_BASE;
  return alpha.charAt(v);
}

function encode_2(v){
  v%=HRM_TOP;
  r=v%HRM_BASE;
  return "".concat(alpha.charAt((v-r)/HRM_BASE),alpha.charAt(r));
}

