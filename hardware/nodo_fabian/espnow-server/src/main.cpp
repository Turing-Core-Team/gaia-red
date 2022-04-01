#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Arduino_JSON.h>

#include "credentials.h"

// struct to recieve data 
  typedef  struct sensor{
    int id;
    float humidity;
    float temperature;
  }sensor;

  sensor incomingDataSensor;

  JSONVar board;

  AsyncWebServer server(80);
  AsyncEventSource events("/events");


// callback function that will be excecuted when data is recieved
void dataRecv(const uint8_t * mac_addr, const uint8_t *incomingData, int len){
  // char macStr[18]; //copies sender mac address to a string
  memcpy(&incomingDataSensor, incomingData, sizeof(incomingDataSensor));
  board["id"] = incomingDataSensor.id;
  board["humidity"] = incomingDataSensor.humidity;
  board["Temperature"] = incomingDataSensor.temperature;

  String jsonString = JSON.stringify(board);
  events.send(jsonString.c_str(), "New readings", millis());

  Serial.printf("Board id: %u \t %u bytes\n", incomingDataSensor.id, len);
  Serial.printf("Temperatura: %4.2f \n", incomingDataSensor.temperature);
  Serial.printf("Humedad relativa: %4.2f \n", incomingDataSensor.humidity);
  Serial.println();

}

const char index_html[] PROGMEM = R"rawliteral(
  <!DOCTYPE HTML><html>
  <head>
    <title>ESP-NOW DASHBOARD</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="icon" href="data:,">
    <style>
      html {font-family: Arial; display: inline-block; text-align: center;}
      p {  font-size: 1.2rem;}
      body {  margin: 0;}
      .topnav { overflow: hidden; background-color: #2f4468; color: white; font-size: 1.7rem; }
      .content { padding: 20px; }
      .card { background-color: white; box-shadow: 2px 2px 12px 1px rgba(140,140,140,.5); }
      .cards { max-width: 700px; margin: 0 auto; display: grid; grid-gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
      .reading { font-size: 2.8rem; }
      .packet { color: #bebebe; }
      .card.temperature { color: #fd7e14; }
      .card.humidity { color: #1b78e2; }
    </style>
  </head>
  <body>
    <div class="topnav">
      <h3>ESP-NOW DASHBOARD</h3>
    </div>
    <div class="content">
      <div class="cards">
        <div class="card temperature">
          <h4><i class="fas fa-thermometer-half"></i> BOARD #1 - TEMPERATURE</h4><p><span class="reading"><span id="t1"></span> &deg;C</span></p><p class="packet">Reading ID: <span id="rt1"></span></p>
        </div>
        <div class="card humidity">
          <h4><i class="fas fa-tint"></i> BOARD #1 - HUMIDITY</h4><p><span class="reading"><span id="h1"></span> &percnt;</span></p><p class="packet">Reading ID: <span id="rh1"></span></p>
        </div>
        <div class="card temperature">
          <h4><i class="fas fa-thermometer-half"></i> BOARD #2 - TEMPERATURE</h4><p><span class="reading"><span id="t2"></span> &deg;C</span></p><p class="packet">Reading ID: <span id="rt2"></span></p>
        </div>
        <div class="card humidity">
          <h4><i class="fas fa-tint"></i> BOARD #2 - HUMIDITY</h4><p><span class="reading"><span id="h2"></span> &percnt;</span></p><p class="packet">Reading ID: <span id="rh2"></span></p>
        </div>
      </div>
    </div>
  <script>
    if(!!window.EventSource){
      var source = new EventSource('/events');

      source.addEventListener('open', function(e){
        console.log("Events connected...");
      }, false);

      source.addEventListener('error', function(e){
        if(e.target.readyState != Eventsource.OPEN){
          console.log("Events disconnected");
        }
      }, false);

      source.addEventListener('New_readings', function(e){
        console.log("New readings", e.data);
        var obj = JSON.parse(e.data);
        document.getElementById("t",+obj.id).innerHTML = obj.temperature.toFixed(2);
        document.getElementById("h",+obj.id).innerHTML = obj.humidity.toFixed(2);

      }, false);


    }
  </script>
  </body>
  </html>)rawliteral";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  // set the device as a station and soft access point simultaneously
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  

  // set device as a wifi station
  WiFi.mode(WIFI_AP_STA);

  // init esp-now
  if(esp_now_init() != ESP_OK){
    Serial.println("Error initializing esp-now...");
    return;
  }

  // once esp-now is succesfully init, we'll register for receive data
  esp_now_register_recv_cb(dataRecv);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html);
  });

  events.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that got it is: %u\n", client->lastId());
    }
    // send message "hello!!" and set reconnect delay to 1 second
    client->send("hello!", NULL, millis(), 1000);

  });

  server.addHandler(&events);
  server.begin();

}

void loop() {
  // put your main code here, to run repeatedly:
  static unsigned long lastEventTime = millis();
  static const unsigned long EVENT_INTERVAL_MS = 5000;
  if((millis() - lastEventTime) > EVENT_INTERVAL_MS){
    events.send("ping", NULL, millis());
    lastEventTime = millis();
  }

}