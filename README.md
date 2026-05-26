# AstroReserva

## Descripcion General
AstroReserva es una plataforma integral diseñada para la gestión y reserva de eventos astronómicos. El sistema permite a los usuarios consultar un catálogo de eventos, realizar filtrado por categorías y fechas, mientras que los administradores poseen herramientas para la gestión del ciclo de vida de dichos eventos. El proyecto sigue una arquitectura cliente-servidor con una API RESTful.

![AstroReserva App](showcase-astroreserva.png)

## Arquitectura del Sistema

### 1. Backend (API REST)
El backend está desarrollado con Java utilizando el framework Spring Boot.
* **Framework:** Spring Boot 3.x.
* **Seguridad:** Implementación de Spring Security con autenticación basada en JWT (JSON Web Tokens).
* **Persistencia:** Spring Data JPA con Hibernate para la gestión de entidades.
* **Gestión de Dependencias:** Maven.
* **Endpoints:** Los endpoints están bajo el prefijo `/api` y siguen las convenciones RESTful para operaciones CRUD.

### 2. Frontend
El frontend es una Single Page Application (SPA) desarrollada con Angular.
* **Framework:** Angular 17+ (Stand-alone components).
* **Gestión de Estado:** Utilización de Signals para la reactividad de los datos en tiempo real.
* **Interacción HTTP:** HttpClient para la comunicación con la API, utilizando interceptores para la gestión de tokens de autorización.
* **Estilizado:** Tailwind CSS para el diseño responsivo.

### 3. Base de Datos
La persistencia de datos se gestiona mediante un sistema relacional (MySQL).
* **Motor:** MySQL 8.0.
* **Despliegue:** Contenerización mediante Docker para garantizar la persistencia y la portabilidad del entorno de desarrollo.

## Requisitos Previos
Para la ejecución del proyecto, es necesario contar con:
* Java Development Kit (JDK) 17 o superior.
* Node.js (v18+) y Angular CLI.
* Docker Desktop instalado.

## Instalación y Ejecución

### Base de Datos
Levantar la infraestructura mediante Docker:
1. Navegar al directorio raíz donde se encuentra el `docker-compose.yml`.
2. Ejecutar: `docker-compose up -d`

### Backend
1. Navegar a la carpeta `backend`.
2. Configurar las propiedades de conexión a la base de datos en `application.properties`.
3. Ejecutar: `./mvnw spring-boot:run`

### Frontend
1. Navegar a la carpeta `frontend`.
2. Instalar dependencias: `npm install`
3. Ejecutar: `ng serve`
4. Acceder en el navegador a `http://localhost:4200`.

## Configuración de Seguridad
El sistema utiliza un filtro JWT personalizado (`JwtFilter`). Para acceder a las rutas protegidas, el cliente debe incluir en el header de las peticiones HTTP:
`Authorization: Bearer <token>`

Las rutas de consulta de eventos (GET) se encuentran abiertas al público mediante la configuración `permitAll()` en la clase `SecurityConfig`, mientras que las operaciones de modificación requieren permisos de administrador.

## Estructura de Directorios
* `/backend`: Código fuente de Spring Boot y configuraciones de seguridad.
* `/frontend`: Estructura de componentes, servicios e interceptores de Angular.
* `/database`: Scripts SQL de inicialización y configuración de Docker.
* `/docs`: Documentación técnica adicional.
