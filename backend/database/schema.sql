-- ======================================================
-- SCRIPT - RETO TRANSVERSAL DAW
-- ======================================================

CREATE DATABASE IF NOT EXISTS reto_daw_db;
USE reto_daw_db;

-- 1. TIPOS DE EVENTO (Categorización)
CREATE TABLE tipos (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- Ejemplo: 'Taller', 'Cata', 'Excursión'
    descripcion TEXT
);

-- 2. PERFILES / ROLES (Seguridad)
CREATE TABLE perfiles (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL -- 'ROLE_ADMON', 'ROLE_CLIENTE'
);

-- 3. USUARIOS
CREATE TABLE usuarios (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL, -- Longitud para hashes (BCrypt)
    email VARCHAR(100) UNIQUE NOT NULL,
    nombre VARCHAR(50),
    apellidos VARCHAR(100),
    enabled TINYINT(1) DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. RELACIÓN USUARIO-PERFIL
CREATE TABLE usuario_perfiles (
    username VARCHAR(50),
    id_perfil INT,
    PRIMARY KEY (username, id_perfil),
    FOREIGN KEY (username) REFERENCES usuarios(username) ON DELETE CASCADE,
    FOREIGN KEY (id_perfil) REFERENCES perfiles(id_perfil)
);

-- 5. EVENTOS (La entidad principal)
CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    duracion_min INT,
    ubicacion VARCHAR(150),
    estado ENUM('ACTIVO', 'CANCELADO', 'TERMINADO') DEFAULT 'ACTIVO',
    destacado CHAR(1) DEFAULT 'N', -- 'S' o 'N'
    aforo_max INT NOT NULL,
    min_asistentes INT DEFAULT 1,
    precio DECIMAL(10, 2) NOT NULL,
    id_tipo INT,
    imagen_url VARCHAR(255), -- Para el frontal
    FOREIGN KEY (id_tipo) REFERENCES tipos(id_tipo)
);

-- 6. RESERVAS (Lógica de negocio aplicada)
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT,
    username VARCHAR(50),
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INT NOT NULL,
    precio_total DECIMAL(10, 2),
    observaciones VARCHAR(255),
    CONSTRAINT chk_cantidad_max CHECK (cantidad <= 10), -- Requisito: Máximo 10
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
    FOREIGN KEY (username) REFERENCES usuarios(username)
);

-- ======================================================
-- TRIGGER OBLIGATORIO (Lógica de negocio en BD)
-- Actualiza a 'TERMINADO' si la fecha ya ha pasado
-- ======================================================

DELIMITER //
CREATE PROCEDURE actualizar_estados_eventos()
BEGIN
    UPDATE eventos 
    SET estado = 'TERMINADO' 
    WHERE fecha_inicio < NOW() AND estado = 'ACTIVO';
END //
DELIMITER ;