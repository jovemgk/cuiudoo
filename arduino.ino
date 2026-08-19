#include <Servo.h>

Servo servo1;
Servo servo2;

const int pinLed1 = 2;
const int pinLed2 = 3;

void setup() {
  Serial.begin(9600);
  
  servo1.attach(9);
  servo2.attach(10);
  
  pinMode(pinLed1, OUTPUT);
  pinMode(pinLed2, OUTPUT);
  
  digitalWrite(pinLed1, LOW);
  digitalWrite(pinLed2, LOW);
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();

    if (input.startsWith("S1:")) {
      int angle = input.substring(3).toInt();
      digitalWrite(pinLed1, HIGH);
      servo1.write(angle);
      delay(150);
      digitalWrite(pinLed1, LOW);
    } 
    else if (input.startsWith("S2:")) {
      int angle = input.substring(3).toInt();
      digitalWrite(pinLed2, HIGH);
      servo2.write(angle);
      delay(150);
      digitalWrite(pinLed2, LOW);
    }
  }
}
