# 🌌 AstroReserva: Sistema de Gestión de Experiencias Astronómicas

**AstroReserva** es una plataforma integral diseñada para la consulta, reserva y administración de eventos astronómicos. Este proyecto integra tecnologías de vanguardia para ofrecer una solución robusta y escalable siguiendo el modelo de arquitectura SPA.

---

## 🚀 1. Arquitectura y Tecnologías (DAW / DWES)
El sistema se basa en una arquitectura desacoplada de dos aplicaciones independientes:

* **Frontend:** Desarrollado con **Angular 17+** (Standalone Components).
* **Backend:** API RESTful construida con **Spring Boot / JPA** (Persistencia relacional).
* **Base de Datos:** **MySQL 8** con motor relacional para garantizar integridad.
* **Seguridad:** Implementación de **JWT (JSON Web Tokens)** y guardas de ruta para el control de acceso basado en roles (`ROLE_ADMON`, `ROLE_CLIENTE`).

---

## 🔑 2. Control de Acceso y Roles (DWES / DWEC)
Se han implementado tres niveles de acceso siguiendo estrictamente los criterios de la actividad:

* **Invitado (Anonymous):** Acceso libre a la consulta de eventos (activos, destacados y cancelados). Puede ver detalles pero no realizar reservas.
* **ROLE_CLIENTE:** Usuario registrado con acceso a `/clientes/**`. Gestión de reservas (máximo 10 entradas por evento), visualización de eventos destacados y control de "Mis Reservas".
* **ROLE_ADMON:** Gestión total de los componentes de la aplicación mediante CRUD en rutas `/eventos/alta`, `/eventos/editar/{id}` y `/eventos/cancelar/{id}`.

---

## 🛠️ 3. Funcionalidades y Lógica de Negocio

### Gestión de Eventos (Administración)
* **Estados Dinámicos:** Implementación de ciclo de vida del evento: `ACTIVO` → `TERMINADO` (automático por fecha) o `CANCELADO`.
* **Eventos Destacados:** Marcado mediante atributo `'S'/'N'` para priorización visual en la interfaz de usuario.
* **Panel Administrativo:** Gestión de Usuarios, Perfiles y Tipos de Eventos.

### Experiencia del Cliente
* **Buscador Global:** Filtro multicriterio integrado mediante Query Parameters para una navegación persistente.
* **Control de Aforo:** Lógica en servidor y cliente que impide reservas superiores al aforo máximo disponible.
* **Lógica de Reserva:** Validación estricta de un máximo de 10 entradas por reserva/usuario.
* **Gestión de Histórico:** Consulta de reservas activas y pasadas con capacidad de cancelación en tiempo real.

---

## 🎨 4. Diseño e Interfaz (DIW)
El diseño se ha centrado en los principios de **UX/UI** para un entorno especializado:
* **Sistema Visual:** Estética *Dark Mode* optimizada para astronomía con acentos de alta legibilidad.
* **Responsive Design:** Layout adaptable mediante Grid y Flexbox de Tailwind CSS.
* **Componentes Reutilizables:** Tarjetas dinámicas, calendarios interactivos y banners de búsqueda reactivos.
* **Accesibilidad:** Cumplimiento de ratios de contraste y jerarquía visual clara.

---

## 📦 5. Estructura de Entregables (DAW)
Este repositorio incluye:
1.  **Código Fuente Frontend:** Proyecto Angular estructurado por componentes y servicios.

---