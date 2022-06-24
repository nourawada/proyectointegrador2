CREATE SCHEMA proyectoIntegrador;

USE proyectoIntegrador;


CREATE TABLE users (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(250) UNIQUE NOT NULL,
username VARCHAR(250) NOT NULL,
password VARCHAR(250) NOT NULL,
nacimiento DATE NOT NULL,
dni VARCHAR(8) NOT NULL,
image VARCHAR(250) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
deletedAt DATETIME 

);

CREATE TABLE products (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(250) NOT NULL,
image VARCHAR(250) NOT NULL,
brand VARCHAR(250) NOT NULL,
descripcion VARCHAR(500) NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
deletedAt DATETIME ,
usersId INT UNSIGNED NOT NULL,

FOREIGN KEY (usersId) REFERENCES users(id)
);

CREATE TABLE comments (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
text VARCHAR(250) NOT NULL, 
productsId INT UNSIGNED NOT NULL,
usersId INT UNSIGNED NOT NULL,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
deletedAt DATETIME ,

FOREIGN KEY(productsId) REFERENCES products(id),
FOREIGN KEY(usersId) REFERENCES users(id)
);

CREATE TABLE user_Followers (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
followers_id INT UNSIGNED NOT NULL,
usersId INT UNSIGNED NOT NULL,

FOREIGN KEY(usersId) REFERENCES users(id),
FOREIGN KEY(followers_id) REFERENCES users(id)
);

INSERT INTO users (email, username, password, nacimiento, dni, image, createdAt, updatedAt, deletedAt)
VALUES ('nawada@udesa.edu.ar','nourawada','nour123', '2002-03-25', '43992391', 'homero.jpeg',curdate(), curdate(), curdate()),
('facundomartinezz@udesa.edu.ar','facumartinez', 'facu2022', '2003-01-13', '42400567', 'morty1.jpeg',curdate(), curdate(), curdate());

INSERT INTO products (name, image, brand, descripcion ,createdAt, updatedAt, deletedAt, usersId)
VALUES ('Placa de video', '1.jpeg' , 'MSI', 'Está dedicada al procesamiento de datos relacionados con el vídeo y las imágenes que se están reproduciendo en el ordenador', curdate(), curdate(),curdate(), 1),
('Gabinete Kolink Void ARGB ATX Vidrio Templado', '2.jpg', 'KOLINK', 'Armazón que contiene los componentes que integran una computadora (tarjeta madre, procesador, memoria RAM, dispositivos periféricos, etc.)', curdate(), curdate(),curdate(),1),
('Teclado Mecanico ASUS TUF Gaming K3 US Red','3.jpg','ASUS','Un dispositivo de entrada que utiliza un sistema de puntadas o márgenes, para que actúen como palancas mecánicas o interruptores electrónicos que envían toda la información a la computadora', curdate(), curdate() ,curdate(), 1),
('Procesador AMD Ryzen 5 1600 AF Zen+ 12nm AM4 Wraith Stealth Cooler','4.jpg','AMD','Es la unidad de procesamiento encargada de interpretar las instrucciones de un hardware haciendo uso de distintas operaciones aritméticas y matemáticas', curdate(), curdate(),curdate(), 1),
('Silla Gamer Cooler Master Caliber R2C Grey','5.jpg','Cooler Master','Estas sillas  corrigen los problemas de la columna con ciencia ergonómica simple. En lugar de que su columna vertebral sostenga su cuerpo contra la gravedad, las sillas de juego hacen el trabajo por usted. Un respaldo alto acolchado con cojines lumbares y para el cuello proporciona el soporte principal',curdate(), curdate(),curdate(),1),
('Memoria GeiL DDR4 16GB (2x8GB) 3200MHz EVO X II RGB Black','6.jpg','GeiL','Una nueva serie de memorias RAM DDR4 que pretende ser una opción mas para los jugadores de PC, que necesitan unos kits con la mayor velocidad posible, y así sacar el mayor rendimiento del PC', curdate(), curdate(), curdate(),1),
('Auriculares HP HyperX Cloud II Pro Gun Metal PC','7.jpg','HyperX','Tu auricular gaming será un transductor de algo más que de música. Sonidos graves, agudos sin distorsión (drivers), sensibilidad del altavoz y frecuencia disponible, hacen que la calidad del sonido sea buena', curdate(), curdate(),curdate(),1),
('Monitor Samsung 24 Curvo F390','8.jpg','Samsung','Esta diseñado para las necesidades muy específicas de los videojuegos. Tiene paneles con alta velocidad de respuesta y frecuencias de actualización. Mantienen el input lag al mínimo y no agregan ninguna molestia a tu imagen', curdate(), curdate(),curdate(),1),
('Mouse Redragon M710 Memeanlion Chroma RGB 10,000dpi','9.jpg','Redragon','Estos mouses son visualmente mucho más atractivos, ideales para complementarlos con los notebooks gamers. Suelen tener más luces que los tradicionales, especialmente en los laterales. Además, cuentan con muchas más funciones y botones,', curdate(), curdate(),curdate(),1),
('Disco Solido SSD Externo Team Treasure Touch RGB 1TB 400MB/s','10.jpg','Team','El disco solido es una nueva generación de dispositivos de almacenamiento que se emplea en equipos. Estos reemplazan los discos duros mecánicos tradicionales con una memoria basada en flash, significativamente más rápida', curdate(), curdate(),curdate(),1),
('Mother Asrock B365 Phantom Gaming 4 9th Gen 1151 M.2 RGB ','11.jpg','Asrock','La placa mother es una tarjeta de circuito impreso a la que se conectan los componentes que constituyen la computadora',curdate(), curdate(),curdate(),1),
('Cooler CPU ID-Cooling FROSTFLOW X 240 CPU Intel 1151 & AMD AM4','12.jpg','ID-Cooling','Un cooler, es un ventilador capaz de enfriar y mantener la temperatura, ni más ni menos. Estos cooler tienden a utilizar para todo tipo de aspectos de la vida, y no sólo están presentes en el mundo de la informatica', curdate(), curdate(),curdate(),1);





