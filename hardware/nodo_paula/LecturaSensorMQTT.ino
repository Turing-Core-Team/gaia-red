
#include <AsyncMqttClient.h>
#include <WiFi.h>
#include <esp_now.h>

//pagina importante
// https://www.reddit.com/r/esp8266/comments/plrhkw/how_to_setup_to_use_espnow_and_mqtt_together/

// Struct from esp32 - fabian
typedef struct recieve_board{
	int id;
	float temperatura;
	float humedad;
	//char m[32];
	//bool luz;
} recieve_board;

recieve_board data;

// struct to holds readings from each board
recieve_board esp32_fabian;
recieve_board esp32_santi;
recieve_board esp32_prueba;

// create an array with all structures
recieve_data boards[3] = {esp32_fabian, esp32_santi, esp32_prueba};

/* callback function that will be excuted when data
   is recieved
*/
void onDataRecv(const uint8_t * mac_addr, const uint8_t *incomingData, int len){
Serial.println("Packet recieved...");
memcpy(&data, incomingData, sizeof(data));
Serial.printf("Board_id: %u\nbytes: %u", data.id,len);
boards[data.id-1].temperatura = data.temperatura;
boards[data.id-1].humedad = data.humedad;
Serial.printf("Temperatura: %u °C\nHumedad: %u %",
boards[data.id-1].temperatura, boards[data.id-1].humedad);
Serial.println();
}



//Importa librerías MQTT

#define WIFI_SSID "NOMBRE_WIFI" //aqui ponen su nombre de wifi
#define WIFI_PASS "CONTRASEÑA" // aqui ponen su contraseña 

#define MQTT_HOST IPAddress(52,91,168,223)
//#define MQTT_HOST "ec2-52-91-168-223.compute-1.amazonaws.com"
#define MQTT_PORT 1883

#define USERNAME_BROKER "Usuario" //usen su usuario
#define PASS_BROKER "Contraseña"   // usen su contraseña

// Topico de pruebas
#define MQTT_TOPIC "prueba"

AsyncMqttClient mqttClient;
TimerHandle_t mqttReconnectTimer;
TimerHandle_t wifiReconnectTimer;

const int pinTrigger = 18;
const int pinEcho = 5;

#define VEL_SONIDO 0.0343
long duracion;
int distancia, datoGuardado;
bool primeraVez = true;
char numero[16];

//Conectar al Wi-Fi
void connectToWifi() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.println("Conectando al wifi .....");
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.print("Conectado a la red wifi con direccion IP: ");
  Serial.println(WiFi.localIP());// Esto es opcional, pero puede ser util mas adelante
}

//Conectar MQTT
void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  Serial.println("Connecting to mqtt broker...");
  mqttClient.setCredentials(USERNAME_BROKER, PASS_BROKER);
  mqttClient.connect();
}

void setup() {
  //Inicia los pines de ESP32
  Serial.begin(115200);
  Serial.println();
  pinMode(pinTrigger, OUTPUT);
  pinMode(pinEcho, INPUT);


  // set device as wifi-station
  WiFi.mode(WIFI_STA);
  
  // init esp-now
  if(esp_now_init() != ESP_OK){
	Serial.println("Error initializing esp-now...");
	return;
  }
  esp_now_register_recv_cb(onDataRecv);

  //Para conectarse a internet
  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectToMqtt));
  wifiReconnectTimer = xTimerCreate("wifiTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectToWifi));

  WiFi.onEvent(WiFiEvent);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);

  connectToWifi();
  connectToMqtt();


  // set device as wifi-station
  WiFi.mode(WIFI_STA);
  
  // init esp-now
  if(esp_now_init() != ESP_OK){
	Serial.println("Error initializing esp-now...");
	return;
  }
  esp_now_register_recv_cb(onDataRecv);







}

void loop() {
  //Activa el pin de Trigger para enviar el ultrasonido por 10 microsegundos
  digitalWrite(pinTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(piinTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);
  
  // Lee el pin de Echo para ver la duración en microsegundos
  duracion = pulseIn(pinEcho, HIGH);
  
  // Calcula la distancia
  distancia = duracion * VEL_SONIDO/2;
  uint16_t packetIdSub = mqttClient.subscribe("prueba", 2);
  if(primeraVez){
    primeraVez = false;
    datoGuardado=distancia;
    itoa(distancia, numero, 10);
    uint16_t packetIdSub = mqttClient.publish("prueba", 1, true, numero);
    Serial.print("Publishing at QoS 1, packetID: ");
    Serial.println(packetIdSub);
    Serial.print("Distancia (cm): ");
    Serial.println(distancia);
  }
  else if(distancia>int(datoGuardado+datoGuardado*0.1) || distancia<int(datoGuardado-datoGuardado*0.1)){
    datoGuardado=distancia;
    itoa(distancia, numero, 10);
    uint16_t packetIdSub = mqttClient.publish("prueba", 1, true, numero);
    Serial.print("Publishing at QoS 1, packetID: ");
    Serial.println(packetIdSub);
    Serial.print("Distancia (cm): ");
    Serial.println(distancia);
  }
  delay(1000); 
}
//Handlers. Cuando ocurren eventos inesperados

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
//Cuando se conecta al MQTT
void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  Serial.print("Session present: ");
  Serial.println(sessionPresent);
}
//Cuando se desconecta del MQTT
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
}
