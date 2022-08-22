# Proyecto Gaia Red del semillero TuringBox - UNAL
## Buscamos conectar el campo colombiano con las tecnologías 4.0, especialmente con el *internet of things*
## Datos generales

Integrantes del proyecto:

* Cristian Fabian Lopez Medina
* Maria Camila Pineros Martinez
* Maria Paula Perez Vargas
* Juan Manuel Cortes Jimenez
* Santiago Andrés Acosta Parra

**[Biblioteca-drive](https://drive.google.com/drive/folders/1PNXdVDubuhvfd8hPiqWIIwecvO1fES7n?usp=sharing) del grupo. Contiene principalmente artículos científicos de trabajos que han realizado proyecto similares.**

**[Cronograma del proyecto](https://docs.google.com/spreadsheets/d/1GQgq72xkRkWXU8qoF6ObeE-OGSBeCGb7VJPeUb51bbg/edit?usp=sharing): muestra las diferentes actividades que se plantean para el desarrollo del proyecto. Sugiero leerlo para ver lo que se va a realizar a corto y mediano plazo.**

**[Gihub](https://github.com/cflopezm/iot_turing) del proyecto. Es privado y si quieren acceso deben enviarme su usuario/email**

**[Notion - Gaia
Red](https://www.notion.so/Gaia-Red-4abe3758f4b7439880df293b6c6d439e): Notion
del proyecto**

## Arbol del proyecto en github:

Este **árbol** muestra la estructura actual del proyecto. 


```
.
├── hardware
│   ├── nodo_fabian
│   ├── nodo_paula
│   ├── nodo_santiago
│   └── raspberry
├── README.md
└── software
    └── frontend

```
Cada persona que trabaja en la parte de hardware tiene su carpeta, allí va a subir el código de su microcontrolador.

---

## ESP32

El ESP32 es un microcontrolador integrado con WiFi y bluetooth. A continuación hay algunos recursos importantes para iniciar con la placa:

* [instalar el esp32 al IDE arduino 2.0](https://randomnerdtutorials.com/installing-esp32-arduino-ide-2-0/)
* [Instalar el esp32 en IDE arduino (version antigua)](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)
* [Guía básica: especificaciones, pinout, led blink](https://randomnerdtutorials.com/getting-started-with-esp32/)
* Si quieren profundizar en la programcion mas allá del IDE de arduino les recomiendo [esp32.net](http://esp32.net/)
* **PlatformIO**: Permite programar el esp32 mediante visual studio code. En este [link](https://randomnerdtutorials.com/vs-code-platformio-ide-esp32-esp8266-arduino/) hay un ejemplo de como configurarlo. Es opcional pero recomendable
* **AsyncMqttClient**: Para usar MQTT se requieren dos librerias: AsyncTCP y AsyncMqttClient. [Esta página](https://github.com/marvinroger/async-mqtt-client/blob/develop/docs/1.-Getting-started.md) es la documentación oficial y menciona como descargar ambas librerías. 


### Sensor humedad-temperatura DHT11-DHT22

Los sensores **DHT11** y **DHT22** permiten medir humedad relativa y temperatura del ambiente. En este [link](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/) se encuentra un ejemplo de uso.


* Recomiendo leer la documentación oficial de la librería [aquí](https://github.com/adafruit/DHT-sensor-library)

* La hoja de datos del sensor esta [aquí](https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf)

### Sensor de distancia con ultrasonido (HC-SR04)

El sensor **HC-SR04** permite detectar la distancia de los objetos mediante ondas de ultrasonido. Al saber la velocidad de las ondas y el tiempo que transcurre entre la emisión de la onda y su reflejo se puede saber la distancia a la que se encuentra el objeto. Se puede asumir la velocidad del sonido en el aire **V = 343 m/s**(20°C).

* En este [link](https://randomnerdtutorials.com/esp32-hc-sr04-ultrasonic-arduino/) hay un ejemplo de uso

* La hoja de datos del sensor esta [aquí](https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf)

### Fotoresistencia

Resistencia que cambia según la luz incidente. Según wikipedia:


> Su funcionamiento se basa en el efecto fotoeléctrico. Un fotorresistor está hecho de un semiconductor de alta resistencia como el sulfuro de cadmio, CdS.2​ Si la luz que incide en el dispositivo es de alta frecuencia, los fotones son absorbidos por las elasticidades del semiconductor dando a los electrones la suficiente energía para saltar la banda de conducción. El electrón libre que resulta, y su hueco asociado, conducen la electricidad, de tal modo que disminuye la resistencia. Los valores típicos varían entre 1 MΩ, o más, en la oscuridad y 100 Ω con luz brillante. 

* En este [link](https://www.instructables.com/Interfacing-Photoresistor-With-ESP32/) hay un ejemplo de funcionamiento

### MQTT

MQTT es un protocolo de mensajeria usado en IoT.

* En este [link](https://randomnerdtutorials.com/what-is-mqtt-and-how-it-works/) explica que es y como funciona en detalle


---

# ESP8266

 en esp8266

El [**esp8266**](https://randomnerdtutorials.com/getting-started-with-esp8266-wifi-transceiver-review/) es un micro que tiene antena wifi y se puede programar desde el IDE de arduino.


Recursos para librerías:

* [Async-mqqtt-client](https://github.com/marvinroger/async-mqtt-client/blob/develop/docs/2.-API-reference.md): esta es la documentacion de la libreria que permite conectarse con mqtt desde el microcontrolador 

* [WiFiESP8266](https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi): esta libreria permite conectarse a internet usando el esp8266

Recursos adicionales:

* [fully-featured-mqtt](https://github.com/marvinroger/async-mqtt-client/blob/develop/examples/FullyFeatured-ESP8266/FullyFeatured-ESP8266.ino) 

* [API-reference](https://github.com/marvinroger/async-mqtt-client/blob/develop/docs/2.-API-reference.md)

* [ejemplo-mqtt](https://randomnerdtutorials.com/esp8266-nodemcu-mqtt-publish-bme680-arduino/)



