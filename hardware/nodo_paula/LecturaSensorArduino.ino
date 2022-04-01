const int Trigger = 2;
const int Echo = 3;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(Trigger, OUTPUT);
  pinMode(Echo, INPUT); 
  digitalWrite(Trigger, LOW);
}

void loop() {
  //Se manda una señal desde Trigger para emitir el ultrasonido
  digitalWrite(Trigger, HIGH);
  //El pulso mínimo necesario para encender el Trigger es 10us
  delay(10);
  digitalWrite(Trigger, LOW);

  //Se mide el tiempi que dura el pulso, para así hallar la distancia recorrida según la velocidad del sonido
  long tiempo = pulseIn(Echo, HIGH);
  //Se imprime el resultado
  Serial.println("Distancia: "+String(distancia(tiempo))+" cm" );
  //Se espera un segundo para volver a hacer la operación
  delay(1000);
  
}
long distancia(long tiempo){
  //La ecuación de velocidad es V=2d/t, así la ecuación de la distancia es d=V*t/2
  return 0.01715*tiempo;//Velocidad del sonido es 343m/s, en unidades de cm/us es 0.0343cm/us y la mitad de la misma es 0.01715cm/us
}
