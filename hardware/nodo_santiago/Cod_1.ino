#include <AsyncTCP.h>

#include <AsyncTCP.h>

#include <ArduinoMqttClient.h>

// Importa librerias necesarias. Verifica que esten descargadas en el IDE de arduino
#include <WiFi.h>
#include <AsyncMqttClient.h>


// Definen variables fijas para conexion a wifi y servidor del broker

#define SSID "..." //aqui ponen su nombre de wifi
#define WIFI_PASS "..." // aqui ponen su contraseña 

#define MQTT_HOST IPAddress(34,230,72,6) // este valor es variable, deben pedirmelo
#define MQTT_PORT 1883

#define USERNAME_BROKER "..." //usen su usuario
#define PASS_BROKER "electronica3"   // usen su contraseña

// Topico de pruebas

#define MQTT_TOPIC "prueba"



AsyncMqttClient mqttClient;
TimerHandle_t mqttReconnectTimer;
TimerHandle_t wifiReconnectTimer;

// funcion para inciar y conectarse al wifi
void connectToWifi() {
  Serial.begin(115200); // verificar que el monitor serial tenga esta misma velocidad
  WiFi.begin(SSID, WIFI_PASS);
  Serial.println("Conectando al wifi .....");
  while(WiFi.status() != WL_CONNECTED){
  delay(500);
  Serial.print(".");
  }
  Serial.print("Conectado a la red wifi con direccion IP: ");
  Serial.println(WiFi.localIP());// Esto es opcional, pero puede ser util mas adelante
}


// Funcion para conectarse al broker mqtt

void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

/*
A continuacion se definen algunos handlers. Un handler es una funcion que
se activa cuando ocurre un problema y define acciones definidas por el usuario
*/


void WiFiEvent(WiFiEvent_t event) {
  Serial.printf("[WiFi-event] event: %d\n", event);
  switch(event) {
    case SYSTEM_EVENT_STA_GOT_IP:
      Serial.println("WiFi connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());
      connectToMqtt();
      break;
    case SYSTEM_EVENT_STA_DISCONNECTED:
      Serial.println("WiFi lost connection");
      xTimerStop(mqttReconnectTimer, 0); // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
      xTimerStart(wifiReconnectTimer, 0);
      break;
  }
}

void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  Serial.print("Session present: ");
  Serial.println(sessionPresent);
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT.");
  if (WiFi.isConnected()) {
    xTimerStart(mqttReconnectTimer, 0);
  }
}

void onMqttPublish(uint16_t packetId) {
  Serial.print("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);

// Funcion para conectarse al wifi
void setup() {
  
  Serial.begin(115200); // esto inicia la transmision serial. Recuerden verificar la velocidad
  Serial.println();
  
  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectToMqtt));
  wifiReconnectTimer = xTimerCreate("wifiTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectToWifi));

  WiFi.onEvent(WiFiEvent);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  
  connectToWifi();
  
  
  /*
  Aqui puede ir un mensaje de prueba. Se envia un mensaje una unica vez debe tener la siguiente forma:
  
     // publish pruebas
  // prueba 1
  uint16_t packetIdSub = mqttClient.subscribe("prueba", 2); // Aqui se define el topico y el QoS
  Serial.print("Subscribing at QoS 2, packetID: ");
  Serial.println(packetIdSub);
  mqttClient.publish("prueba", 0, true, "prueba 1");
  Serial.println("publishing at QoS 0");
  //prueba 2
  uint16_t packetIdSub1 = mqttClient.publish("prueba", 1, true, "prueba 2");
  Serial.print("Publishing at QoS 1, packetID: ");
  Serial.println(packetIdSub);
  //prueba 3
  uint16_t packetIdSub2 = mqttClient.publish("prueba", 0, true, "prueba 3");
  Serial.print("Publishing at QoS 0, packetID: ");
  Serial.println(packetIdSub2);  
  
  */
  
}

void loop() {
  
  // Revisando el esatdo de la conexion wifi
  
  
}
