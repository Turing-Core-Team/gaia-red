#include <Arduino.h>
#include <DHT.h>

#include <WiFi.h>
#include <esp_now.h>

// reciever's mac address
uint8_t broadcastAddress[]  = {0x08, 0x3A, 0xF2, 0x68, 0x02, 0x54};

// Struct to send data
typedef struct sensor{
  int id;
  float humidity;
  float temperature;
} sensor;

sensor data;

// create peer interface
esp_now_peer_info peerInfo;

// callback when data is sent
void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status){
  Serial.print("Last packet send status: ");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery success" : "Delivery fail...");
}

#define DHTTYPE DHT11

const int pinDHT = 32;

DHT dht (pinDHT, DHTTYPE);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("DHT11 test...");
  dht.begin();

  // set device as a wifi station and init esp-now
  WiFi.mode(WIFI_STA);

  if(esp_now_init() != ESP_OK){
    Serial.println("Error initializing ESP-now");
    return;
  }

  /* once esp-now is succesfully init, 
    we'll register for send
  */
  esp_now_register_send_cb(onDataSent);

  // register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  // add peer
  if(esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);
  // valores sensor

  float hr = dht.readHumidity();
  float temp = dht.readTemperature();

  // check if any reads failed and exit early, to try again
  if(isnan(hr) || isnan(temp)){
    Serial.println("Failed to read values... D: ");
  }

  // set values to send
  data.id = 1;
  data.humidity = hr;
  data.temperature = temp;

  // send values via esp-now and confirmation
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &data, sizeof(data));

  if(result != ESP_OK ){
    Serial.println("Error sending data...");
  }
  Serial.println("Sent with success");

  // print values

  Serial.print("HR(%): ");
  Serial.println(hr);

  Serial.print("Temp(°C): ");
  Serial.println(temp);
  Serial.println();

}