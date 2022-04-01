#include <WiFi.h>

void setup(){
	Serial.begin(115200);
	Serial.println();

}

void loop(){
	Serial.print("mac address: ");
	Serial.println(WiFi.macAddress());

	delay(5000);


}
