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

UPDATE  reportes
SET valor=20
WHERE valor=200 and nombre LIKE '%HR%';

INSERT INTO reportes VALUES ('Temperatura',25),
('HR',0),
('HR',65),
('Temperatura',10),
('HR',2)
;

DELETE FROM reportes
WHERE valor=1000;

INSERT INTO reportes VALUES ('Distancia',90),('Distancia',50);

SELECT * FROM reportes;

