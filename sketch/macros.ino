
void executeMacro(byte f){	
  switch (f){
    case 0:
      doSomething();
      break;
    }
};

void doSomething(){
// do something...
  int v=analogRead(A0)-analogRead(A1);
// and send the result
  sendAlphaAlert(20,v);
  sendResult('a',v); // 'a': id (any char)
};


