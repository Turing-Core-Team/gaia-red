CREATE DATABASE prueba_gaia;
USE prueba_gaia;
CREATE TABLE reportes(
nombre char(20) not null,
valor int not null);

INSERT INTO reportes VALUES ('Distancia',190),
('Distancia',70),
('HR',65),
('Temperatura',19),
('Distancia',20)
;

INSERT INTO reportes VALUES ('Temperatura',3),
('HR',0),
('HR',4),
('Temperatura',10),
('HR',1000)
;

DELETE FROM reportes
WHERE valor!=0;


SELECT * FROM reportes;

