CREATE DATABASE astroreserva;
USE astroreserva;

CREATE TABLE perfiles (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
    username VARCHAR(45) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    direccion VARCHAR(255),
    enabled INT,
    fecha_registro DATETIME
);

CREATE TABLE usuario_perfiles (
    username VARCHAR(45),
    id_perfil INT,
    PRIMARY KEY (username, id_perfil),
    FOREIGN KEY (username) REFERENCES usuarios(username),
    FOREIGN KEY (id_perfil) REFERENCES perfiles(id_perfil)
);

CREATE TABLE tipos (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255)
);

CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    fecha_inicio DATETIME,
    duracion INT,
    direccion VARCHAR(255),
    estado ENUM('ACTIVO','CANCELADO','TERMINADO'),
    destacado CHAR(1),
    aforo_maximo INT,
    minimo_asistencia INT,
    precio DECIMAL(8,2),
    id_tipo INT,
    FOREIGN KEY (id_tipo) REFERENCES tipos(id_tipo)
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT,
    username VARCHAR(45),
    precio_venta DECIMAL(8,2),
    observaciones VARCHAR(255),
    cantidad INT,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
    FOREIGN KEY (username) REFERENCES usuarios(username)
);

-- ======================================================
-- EVENT: Actualiza eventos ACTIVOS a TERMINADOS
-- ======================================================
SET GLOBAL event_scheduler = ON;

DELIMITER $$

CREATE EVENT IF NOT EXISTS actualizar_eventos_terminados
ON SCHEDULE EVERY 1 HOUR
STARTS NOW()
DO
BEGIN
    UPDATE eventos
    SET estado = 'TERMINADO'
    WHERE estado = 'ACTIVO'
    AND DATE_ADD(fecha_inicio, INTERVAL duracion MINUTE) < NOW();
END$$

DELIMITER ;

-- ======================================================
-- DATOS INICIALES
-- ======================================================
INSERT INTO perfiles (nombre) VALUES 
('ROLE_ADMIN'),
('ROLE_CLIENTE');

INSERT INTO usuarios VALUES (
'admin',
'$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lBOi',
'admin@gmail.com',
'Admin',
'Principal',
'Calle',
1,
NOW()
);

INSERT INTO usuario_perfiles VALUES ('admin', 1);

INSERT INTO tipos (nombre, descripcion) VALUES
('Observación', 'Eventos astronómicos'),
('Fotografía', 'Fotografía nocturna');

INSERT INTO eventos (
nombre, descripcion, fecha_inicio, duracion, direccion,
estado, destacado, aforo_maximo, minimo_asistencia, precio, id_tipo
) VALUES (
'Lluvia de estrellas',
'Observación guiada',
'2026-06-15 22:00:00',
120,
'Sierra Nevada',
'ACTIVO',
'S',
20,
5,
30.00,
1
);

SHOW EVENTS FROM astroreserva;
SELECT * FROM eventos;
SELECT * FROM usuarios;
SELECT * FROM perfiles;
