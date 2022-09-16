#include <SPI.h>
const int pinBuzzer = 9;


void setup() {
  Serial.begin(9600);
  delay(1000);
  pinMode(LED_BUILTIN, OUTPUT);
  
}

void loop() {

  while(Serial.available() > 0){
  
    String datoFruta = Serial.readString();
  
     if(datoFruta == "Rotten-Apple"){
    
        tone(pinBuzzer, 200);
        delay(1000);
        noTone(pinBuzzer);
        delay(500);
      
     }else if(datoFruta == "Fresh-Apple"){
      tone(pinBuzzer, 400);
      delay(500);
    
      noTone(pinBuzzer);
      delay(500);

     }else if(datoFruta == "Fresh-Orange"){
      tone(pinBuzzer, 600);
      delay(500);
    
      noTone(pinBuzzer);
      delay(500);
      
     }else if(datoFruta == "Rotten-Orange"){
      tone(pinBuzzer, 800);
      delay(500);
    
      noTone(pinBuzzer);
      delay(500);
     }else{
      noTone(pinBuzzer);
     }
  }

}
