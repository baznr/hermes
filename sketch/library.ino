/*************************************************************************
* Hermes Arduino library 
* Distributed under GPL v2.0
* Copyright (c) 2012 Dimitri Vusunaras <dbaznr@gmail.com>
* All rights reserved.
*************************************************************************/
void initHermes(){
  for (byte i=0;i<HRM_ANALOG_PINS;i++){
    analogMax[i]=1023;
    analogMin[i]=0;
  }
  
  servoArr[0]=leftServo;
  servoArr[1]=rightServo;

  servoMove(0,0,0);
  servoMove(1,0,0);
  
  sendAlphaAlert(0,0); //Device connected
}


void parseCommand(){
  
byte pin, sval;
int val,addr;

if (Serial.read()!=HRM_START) return; 
	
char cmd = getChar();
if (cmd>' '){
  switch (cmd) {
    case HRM_PIN_MODE_INPUT:
      pin = get_6b();
      echoPinInput(pin);
      break;
    case HRM_PIN_MODE_OUTPUT:
      pin = get_6b();
      echoPinOutput(pin);
      break;
    case HRM_PIN_SET:
      pin = get_6b();
      echoPinSet(pin);
      break;
    case HRM_PIN_CLEAR:
      pin = get_6b();
      echoPinClear(pin);
      break;
    case HRM_PIN_TOGGLE:
      pin = get_6b();
      echoPinToggle(pin);
      break;
    case HRM_PIN_GET:
      pin = get_6b();
      echoPinGet(pin);
      break;
    case HRM_ANALOG_WRITE:
      pin = get_6b();
      val = get_12b();                
      echoPinWrite(pin, val);
      break;
    case HRM_ANALOG_READ:
      pin = get_6b();
      echoPinRead(pin);
      break;
    case HRM_SET_ANALOG_LIM:
      pin = get_6b();
      analogMin[pin] = get_12b();                
      analogMax[pin] = get_12b();
      echoPinLimit(pin);
      break;
    case HRM_EXECUTE_MACRO:
      sval = get_6b();
      executeMacro(sval);
      break;
    case HRM_MACRO_PARAM:
      sval = get_6b();
      sval%=HRM_TOT_PARAMS;
      val = get_12b();
      macroParam[sval]=val;
      break;	    	        
    case HRM_EEPROM_READ:
      addr = get_12b();
      echoEepromRead(addr);
      break;
    case HRM_EEPROM_WRITE:
      addr = get_12b();                
      val = get_12b();
      echoEepromWrite(addr, val);
      break;
    case HRM_SERVO_MOVE:
      pin = get_6b();
      addr = get_12b();                
      sval = get_6b();
      servoMove(pin, addr, sval);
      break;
    }
  }
}

void monitorPins(){
  if (startTime + interval > millis()) return;
  startTime=millis();
  
  // Digital Pins
  for (byte i=2;i<HRM_DIGITAL_PINS;i++){
    if (modeSt[i]==INPUT){
      if (digitalVal[i]!=digitalRead(i)){
        digitalVal[i]=!digitalVal[i];
        putCmd(HRM_DGT_PIN_VAR);
        put_6b(i);
        put_6b(digitalVal[i]);
      	putEnd();
      }
    }
  }
  // Analog Pins
  int val;
  for (byte i=0;i<HRM_ANALOG_PINS;i++){
    val=analogRead(i);
    if (val < analogMin[i]) sendMinAlarm(i,val);
    if (val > analogMax[i]) sendMaxAlarm(i,val);
  }
}

void Hermes(){
  if (Serial.available() && Serial.peek()==HRM_START) parseCommand();
  monitorPins();
}

