
byte cardinal(char c){
  for (byte i=0;i<HRM_BASE;i++) if (alpha[i]==c) return i;
  return 0;
}

byte decode_1(char c){
  return cardinal(c);		
}

int decode_2(char m, char l){
  return cardinal(m)*HRM_BASE + cardinal(l);		
}

char getChar(){
  while (!Serial.available());
  return Serial.read();
}

void putChar(char c){
  Serial.print(c);
}

void putCmd(char c){
  Serial.print(':');
  Serial.print(c);
}

byte get_6b(){
  while (!Serial.available());
  char c = Serial.read();    
  return decode_1(c);
}

void put_6b(byte v){
  v%=HRM_BASE;
  Serial.print(alpha[v]);
}

int get_12b(){
  while (!Serial.available());
  char c1 = Serial.read();
  while (!Serial.available());
  char c2 = Serial.read();        
  return decode_2(c1,c2);
}

void put_12b(int v){
  v%=HRM_TOP;
  int r=v%HRM_BASE;
  Serial.print (alpha[(v-r)/HRM_BASE]);
  Serial.print (alpha[r]);
}

void putEnd(){
  Serial.print(HRM_END);
}
