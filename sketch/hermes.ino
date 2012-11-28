
#include <EEPROM.h>
#include <Servo.h>

Servo leftServo;
Servo rightServo;

void setup()
{
  Serial.begin(57600);
  leftServo.attach(10);
  rightServo.attach(11);
  
  initHermes();
}

void loop()
{
  Hermes();
}
