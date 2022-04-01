#include <WiFi.h>
#include <esp_now.h>

//Dirección del ESP receptor
uint8_t direccionPlaca[] = {0x24, 0x0A, 0xC4, 0x60, 0xC0, 0xA4};

//Estructura del mensaje
typedef struct struct_message {
  int distancia;
  float temp;
  float hr;
  //int id;
  bool booleano;
} struct_message;
//Objeto tipo struct_message
struct_message myData;

//Guarda info del peer
esp_now_peer_info_t peerInfo;

const int pinTrigger = 18;
const int pinEcho = 5;
#define VEL_SONIDO 0.0343
long duracion;
int distancia;
bool primeraVez = true;

//Callback para cuando envía info
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status){
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}

void setup(){
  Serial.begin(115200);
  Serial.println();
  pinMode(pinTrigger, OUTPUT);
  pinMode(pinEcho, INPUT);

 
  WiFi.mode(WIFI_STA);
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  esp_now_register_send_cb(OnDataSent);

  //Registra el peer
  memcpy(peerInfo.peer_addr, direccionPlaca, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  //Añade un peer
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
}

void loop(){
  /*Serial.print("mac address: ");
  Serial.println(WiFi.macAddress());*/
  //Activa el pin de Trigger para enviar el ultrasonido por 10 microsegundos
  digitalWrite(pinTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(pinTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);
 
  // Lee el pin de Echo para ver la duración en microsegundos
  duracion = pulseIn(pinEcho, HIGH);
 
  // Calcula la distancia
  distancia = duracion * VEL_SONIDO/2;

  Serial.print("Distancia (cm): ");
  Serial.println(distancia);

  //Asignación de datos booleano
  //myData.id = 1;
  myData.distancia = distancia;
  myData.booleano = true;

  Serial.print("Bool: ");
  Serial.println(myData.booleano);
 
  //Manda los datos vía ESP_NOW
  esp_err_t result = esp_now_send(direccionPlaca, (uint8_t *) &myData, sizeof(myData));
  if (result == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }
  delay(5000);
}
//mac address: 78:E3:6D:18:7C:F8
