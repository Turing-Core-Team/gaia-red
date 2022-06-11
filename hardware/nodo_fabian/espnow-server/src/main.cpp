#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>

#include "credentials.h"

// struct to recieve data from DHT11
  typedef  struct sensorDHT11{
    int id;
    float humidity;
    float temperature;
    //int dist;
    //char on[32];
  }sensorDHT11;

  // struct to recieve data from HC-SR04
  typedef struct sensorHC{
    int id;
    int dist;
    //char macAddr[18];
  }sensorHC;

  // struct to recieve data from fotoresistor 
  typedef struct sensorFoto{
    int id;
    char on_off[4];
    
  }sensorFoto;

  // create a struct message
  //sensorDHT11 incomingDataSensor;

  // create a structure to hold readings from each boards
  sensorDHT11 dht11;// humedad/temperatura
  sensorHC hc;// distancia
  sensorFoto fotoRes; // luz solar

  // MAC address for data senders
  char hcAddress[18] = "78:e3:6d:18:7c:f8";
  char dht11Address[18] = "78:e3:6d:18:74:1c";
  char fotoAddress[18] = "24:0a:c4:60:C0:a4";


// callback function that will be excecuted when data is recieved
void onDataRecv(const uint8_t * mac_addr, const uint8_t *incomingData, int len){
  // copies sender mac address to a string
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);
  
  // compares the MAC address of the sender with the reciever, then selects a proper select
  switch (macStr){
  case hcAddress:
    memcpy(&hc, incomingData, sizeof(hc));
    Serial.printf("ID: %d \n", hc.id);
    Serial.printf("Dist: %d cm \n", hc.dist);
    break;
  case dht11Address:
    memcpy(&dht11, incomingData, sizeof(dht11));
    Serial.printf("ID: %d \n", dht11.id);
    Serial.printf("Humedad: %.2f % \n", dht11.humidity);
    Serial.printf("Temperatura: %.2f °C \n", dht11.temperature);
    break;
  case fotoAddress:
    memcpy(&fotoRes, incomingData, sizeof(fotoRes));
    Serial.printf("ID: %d \n", fotoRes.id);
    Serial.printf("on-off: %s % \n", fotoRes.on_off);

  default:
    Serial.println("MAC address not available");
    break;
  }
  

}


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  if(!driver.init()){
    Serial.println("init failed...");
  }

  // set device as a wifi station
  WiFi.mode(WIFI_STA);

  // init esp-now
  if(esp_now_init() != ESP_OK){
    Serial.println("Error initializing esp-now...");
    return;
  }

  // once esp-now is succesfully init, we'll register for receive data
  esp_now_register_recv_cb(onDataRecv);

}

void loop() {
 

}