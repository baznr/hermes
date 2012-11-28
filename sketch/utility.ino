
void pinWrite(byte pin, byte val){
  digitalWrite(pin, val);
  digitalVal[pin]=val;  
}

void echoPinInput(byte pin){
  pinMode(pin, INPUT);
  modeSt[pin]=INPUT;
  putCmd(HRM_PIN_MODE_INPUT);
  put_6b(pin);
  putEnd();
};

void echoPinOutput(byte pin){
  pinMode(pin, OUTPUT);
  modeSt[pin]=OUTPUT;
  putCmd(HRM_PIN_MODE_OUTPUT);
  put_6b(pin);
  putEnd();
};

void echoPinSet(byte pin){
  if (modeSt[pin]==OUTPUT){                
    pinWrite(pin, HIGH);
    putCmd(HRM_PIN_SET);
    put_6b(pin);
    putEnd();
  };
};
      
void echoPinClear(byte pin){
  if (modeSt[pin]==OUTPUT){                
    pinWrite(pin, LOW);
    putCmd(HRM_PIN_CLEAR);
    put_6b(pin);
    putEnd();
  };
};

void echoPinToggle(byte pin){
  if (modeSt[pin]==OUTPUT){
    byte sval = !digitalVal[pin];
    pinWrite(pin, sval);
    putCmd(HRM_PIN_TOGGLE);
    put_6b(pin);
    put_6b(sval);
    putEnd();
  };
};

void echoPinGet(byte pin){
  if (modeSt[pin]==INPUT){ 
    byte sval=digitalRead(pin);
    digitalVal[pin]=sval;
    putCmd(HRM_PIN_GET);
    put_6b(pin);
    put_6b(sval);
    putEnd();
  };
};

void echoPinWrite(byte pin, int val){
  if (modeSt[pin]==OUTPUT){
    analogWrite(pin, val);
    putCmd(HRM_ANALOG_WRITE);
    put_6b(pin);
    put_12b(val);
    putEnd();
  };
};

void echoPinRead(byte pin){
  putCmd(HRM_ANALOG_READ);
  put_6b(pin);
  put_12b(analogRead(pin));
  putEnd();
};

void echoEepromRead(int addr){
  byte val=EEPROM.read(addr);        
  putCmd(HRM_EEPROM_READ);
  put_12b(addr);
  put_12b(val);
  putEnd();
};

void echoEepromWrite(int addr, int val){
  EEPROM.write(addr,val);
  putCmd(HRM_EEPROM_WRITE);
  put_12b(addr);
  put_12b(val);
  putEnd();
};

void sendResult(char c, int v){
  putCmd(HRM_VIEW_MACRO_RESULT);
  putChar(c);
  put_12b(v);
  putEnd();
};

void sendAlphaAlert(int s, int v){
  putCmd(HRM_ALPHA_ALERT);
  put_12b(s);
  put_12b(v);
  putEnd();
};

void echoPinLimit(byte pin){
  putCmd(HRM_SET_ANALOG_LIM);
  put_6b(pin);
  put_12b(analogMin[pin]);
  put_12b(analogMax[pin]);
  putEnd();
};

void sendMaxAlarm(byte pin, int v){
  putCmd(HRM_ANALOG_MAX);
  put_6b(pin);
  put_12b(v);
  putEnd();
};

void sendMinAlarm(byte pin, int v){
  putCmd(HRM_ANALOG_MIN);
  put_6b(pin);
  put_12b(v);
  putEnd();
};

void resetPin(byte pin){
  pinMode(pin, OUTPUT);    
  digitalWrite(pin, digitalVal[pin]);
};

void resetAllPins(){
  for (byte i=2;i<HRM_DIGITAL_PINS;i++){
    if (modeSt[i]==OUTPUT) resetPin(i);
  };
};

void servoMove(byte srv, int pos, byte spd){
 if (spd==0){
  servoArr[srv].write(pos);
 }else{
   int prev=servoPos[srv];
   if (pos>prev){
     for (int i=prev;i<=pos;i++){
      // servoArr[srv].write(i);
      delay(spd);
     }
   }else{
     for (int i=prev;i>=pos;i--){
       servoArr[srv].write(i);
       delay(spd); 
     }    
   }
   servoPos[srv]=pos;   
 }
  putCmd(HRM_SERVO_MOVE);
  put_6b(srv);
  put_12b(pos);
  putEnd();
};

