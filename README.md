# Sistema de Gestión de Empleados 👥

Una aplicación full-stack para gestionar empleados con un formulario interactivo, tabla dinámica y API REST. Desarrollada con **React** en el frontend, **Node.js + Express** en el backend y **MySQL** como base de datos.

---

## � Inicio Rápido (5 minutos)

¿Tienes prisa? Sigue estos pasos para ejecutar el proyecto en minutos:

### 1. Clonar/descargar el proyecto

```bash
# Opción A: Clonar desde Git
git clone <URL-del-repositorio>
cd empleados

# Opción B: Descargar .zip y descomprimirlo
# Luego abre terminal en la carpeta empleados
cd empleados
```

### 2. Instalar dependencias

```bash
# Instalar servidor
cd server
npm install

# Instalar cliente (en otra carpeta/terminal)
cd ../client
npm install
```

### 3. Configurar base de datos

**En MySQL (Workbench, CLI, etc.):**

```sql
CREATE DATABASE IF NOT EXISTS iberotech;
USE iberotech;

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  pais VARCHAR(50) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  anios INT DEFAULT 0,
  genero VARCHAR(20),
  celular VARCHAR(20),
  correo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Crear archivo `.env` en la carpeta `server/`

Crea el archivo `server/.env` con:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=iberotech
```

> **Nota:** Ajusta `DB_PORT` (si usas 3307) y `DB_PASSWORD` según tu configuración MySQL.

### 5. Ejecutar servidor y cliente

**Terminal 1 — Servidor:**

```bash
cd server
npm run dev
```

Espera a ver: `servidor corriendo en el puerto 3001` ✅

**Terminal 2 — Cliente:**

```bash
cd client
npm start
```

Espera a ver: `Compiled successfully!` ✅

El navegador se abrirá en `http://localhost:3000` 🎉

---

## 📋 Tabla de Contenidos

- [Inicio Rápido](#-inicio-rápido-5-minutos)
- [Descripción General](#descripción-general)
- [Arquitectura](#arquitectura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Características](#características)
- [Troubleshooting](#troubleshooting)

---

## 📝 Descripción General

Este proyecto es un **monolito separado por carpetas** que permite:

- ✅ **Registrar empleados** con datos completos (nombre, edad, país, cargo, años, género, correo, celular).
- ✏️ **Editar empleados** existentes.
- 🗑️ **Eliminar empleados** de la base de datos.
- 📊 **Visualizar lista** de empleados en una tabla interactiva.
- 🎨 **Interfaz moderna** con tema oscuro y colores vibrantes.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │ App.js: Componente principal                      │   │
│  │ - Gestiona estado (useState)                      │   │
│  │ - Carga empleados (useEffect)                     │   │
│  │ - Formulario para crear/editar                    │   │
│  │ - Tabla para visualizar y eliminar                │   │
│  └──────────────────────────────────────────────────┘   │
│               (localhost:3000)                          │
└────────────────┬──────────────────────────────────────┘
                 │  HTTP (Axios / Fetch API)
                 │  REST Endpoints
                 ↓
┌─────────────────────────────────────────────────────────┐
│             Backend (Express.js + Node.js)              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ index.js: Rutas principales                      │   │
│  │ - GET /empleados    (Obtener todos)              │   │
│  │ - POST /empleados   (Crear nuevo)                │   │
│  │ - PUT /empleados/:id (Actualizar)                │   │
│  │ - DELETE /empleados/:id (Eliminar)               │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ db.js: Configuración de conexión MySQL           │   │
│  │ - mysql2 connection pool                         │   │
│  │ - Variables de entorno (.env)                    │   │
│  └──────────────────────────────────────────────────┘   │
│               (localhost:3001)                          │
└────────────────┬──────────────────────────────────────┘
                 │  SQL Queries
                 ↓
┌─────────────────────────────────────────────────────────┐
│                 Base de Datos (MySQL)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Database: iberotech                              │   │
│  │ Tabla: empleados                                 │   │
│  │ - id (PK, AUTO_INCREMENT)                        │   │
│  │ - nombre, edad, pais, cargo, anios               │   │
│  │ - genero, celular, correo                        │   │
│  └──────────────────────────────────────────────────┘   │
│               (localhost:3307)                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
empleados/
├── client/                          # Aplicación React
│   ├── public/
│   │   ├── index.html               # HTML principal
│   │   └── manifest.json            # PWA manifest
│   ├── src/
│   │   ├── App.js                   # Componente principal
│   │   ├── App.css                  # Estilos (tema oscuro)
│   │   ├── index.js                 # Punto de entrada React
│   │   ├── App.test.js              # Tests (opcional)
│   │   └── setupTests.js            # Setup de tests
│   ├── package.json                 # Dependencias React
│   └── README.md                    # Documentación del cliente
│
├── server/                          # Backend Node.js + Express
│   ├── index.js                     # Servidor y rutas principales
│   ├── db.js                        # Conexión a MySQL
│   ├── .env                         # Variables de entorno
│   └── package.json                 # Dependencias del servidor
│
└── README.md                        # Este archivo
```

---

## 🔧 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (v14+) y **npm** — [Descargar](https://nodejs.org/)
- **MySQL Server** (v5.7+) — [Descargar](https://dev.mysql.com/downloads/mysql/)
- **Git** (opcional) — [Descargar](https://git-scm.com/)

### Verificar instalación:

```bash
node --version
npm --version
mysql --version
```

---

## 📦 Instalación

### 1. Clonar o descargar el repositorio

```bash
# Si está en Git
git clone <url-del-repositorio>
cd empleados

# O descargar el .zip y descomprimirlo
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

**Dependencias principales:**
- `express` — Framework web
- `mysql2` — Driver MySQL
- `cors` — Manejo de CORS
- `dotenv` — Variables de entorno
- `nodemon` — Reinicio automático en desarrollo

### 3. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

**Dependencias principales:**
- `react` — Framework UI
- `react-dom` — DOM para React
- `axios` — Cliente HTTP (opcional; usamos Fetch API)
- `react-scripts` — Scripts de compilación (Create React App)

---

## ⚙️ Configuración

### 1. Crear base de datos MySQL

Abre tu cliente MySQL (MySQL Workbench, línea de comandos, etc.) y ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS iberotech;

USE iberotech;

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  pais VARCHAR(50) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  anios INT DEFAULT 0,
  genero VARCHAR(20),
  celular VARCHAR(20),
  correo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Configurar variables de entorno del servidor

Crea o edita el archivo `server/.env`:

```env
DB_HOST=localhost
DB_PORT=3307          # Ajusta según tu puerto MySQL (por defecto 3306)
DB_USER=root
DB_PASSWORD=2301      # Tu contraseña MySQL
DB_NAME=iberotech
```

**Notas:**
- `DB_HOST`: Host donde corre MySQL (usualmente `localhost`)
- `DB_PORT`: Puerto de MySQL (por defecto `3306`, ajusta si usas otro)
- `DB_USER`: Usuario MySQL (por defecto `root`)
- `DB_PASSWORD`: Contraseña del usuario
- `DB_NAME`: Nombre de la base de datos

---

## 🚀 Ejecución

### Opción 1: Dos terminales (recomendado)

#### Terminal 1 — Servidor Backend

```bash
cd server
npm run dev
```

Deberías ver:
```
[nodemon] 3.1.11 watching path(s): *.*
servidor corriendo en el puerto 3001
conexiòn exitosaa!
```

#### Terminal 2 — Cliente Frontend

```bash
cd client
npm start
```

Deberías ver:
```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
```

El navegador se abrirá automáticamente en `http://localhost:3000`.

### Opción 2: Una sola terminal (modo producción)

Si prefieres correr todo en una sola ventana, puedes:

1. Compilar el cliente:
   ```bash
   cd client
   npm run build
   ```

2. Servir el cliente desde el backend (requiere configuración adicional).

---

## 📡 API Endpoints

El servidor expone los siguientes endpoints en `http://localhost:3001`:

### 1. Obtener todos los empleados

```http
GET /empleados
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Kenny",
    "edad": 10,
    "pais": "Colombia",
    "cargo": "Líder",
    "anios": 5,
    "genero": "Masculino",
    "celular": "3227019262",
    "correo": "luisa23moralesss@gmail.com"
  }
]
```

### 2. Crear un nuevo empleado

```http
POST /empleados
Content-Type: application/json

{
  "nombre": "Juan",
  "edad": 28,
  "pais": "Colombia",
  "cargo": "Desarrollador",
  "anios": 3,
  "genero": "Masculino",
  "celular": "3001234567",
  "correo": "juan@example.com"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 2,
  "nombre": "Juan",
  "edad": 28,
  "pais": "Colombia",
  "cargo": "Desarrollador",
  "anios": 3,
  "genero": "Masculino",
  "celular": "3001234567",
  "correo": "juan@example.com"
}
```

### 3. Actualizar un empleado

```http
PUT /empleados/1
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "edad": 29,
  "pais": "Colombia",
  "cargo": "Senior Developer",
  "anios": 4,
  "genero": "Masculino",
  "celular": "3001234567",
  "correo": "juancarlos@example.com"
}
```

**Respuesta (200 OK):** Objeto empleado actualizado.

### 4. Eliminar un empleado

```http
DELETE /empleados/1
```

**Respuesta (200 OK):**
```json
{
  "message": "empleado eliminado correctamente",
  "id": 1
}
```

---

## 💾 Base de Datos

### Estructura de la tabla `empleados`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT | Identificador único (PK, AUTO_INCREMENT) |
| `nombre` | VARCHAR(100) | Nombre completo del empleado |
| `edad` | INT | Edad en años |
| `pais` | VARCHAR(50) | País de origen o residencia |
| `cargo` | VARCHAR(100) | Puesto o posición laboral |
| `anios` | INT | Años de experiencia |
| `genero` | VARCHAR(20) | Género (M/F/Otro) |
| `celular` | VARCHAR(20) | Número de teléfono |
| `correo` | VARCHAR(100) | Correo electrónico |
| `created_at` | TIMESTAMP | Fecha de creación (automática) |

### Ejemplo de inserción manual

```sql
INSERT INTO empleados (nombre, edad, pais, cargo, anios, genero, celular, correo)
VALUES ('María', 32, 'España', 'Diseñadora', 6, 'Femenino', '3156789012', 'maria@example.com');
```

---

## ✨ Características

### Frontend (React)

- ✅ **Formulario dinámico** que cambia entre "Registrar" y "Editar"
- ✅ **Tabla interactiva** con filas editables y eliminables
- ✅ **Validación de campos** antes de enviar
- ✅ **Tema oscuro moderno** con colores morado/magenta
- ✅ **Responsivo** (adapta a móviles y tablets)
- ✅ **Interfaz amigable** con botones de acción destacados

### Backend (Express)

- ✅ **Rutas CRUD completas** (Create, Read, Update, Delete)
- ✅ **Manejo de errores** con respuestas JSON
- ✅ **CORS habilitado** para conexión con frontend
- ✅ **Variables de entorno** para seguridad
- ✅ **Conexión a MySQL** con mysql2/promise

### Base de Datos (MySQL)

- ✅ **Tabla normalizada** con campos adecuados
- ✅ **Primary key** (id) con auto-incremento
- ✅ **Timestamps** de creación automáticos

---

## 🐛 Troubleshooting

### Error: "react-scripts" no se reconoce

**Solución:**
```bash
cd client
npm install
# O usa npx:
npx react-scripts start
```

### Error: "Unknown database 'iberotech'"

**Solución:**
1. Verifica que MySQL está corriendo.
2. Crea la base de datos:
   ```sql
   CREATE DATABASE iberotech;
   ```
3. Revisa las credenciales en `server/.env`.

### Error: "ECONNREFUSED" (servidor no responde)

**Solución:**
1. Asegúrate de que `npm run dev` está corriendo en la carpeta `server/`.
2. Verifica que el puerto 3001 está disponible.
3. Comprueba que la conexión MySQL es correcta.

### Puerto 3000 o 3001 en uso

**Solución:**
```bash
# Windows: Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# Linux/Mac: Ver qué proceso usa el puerto
lsof -i :3000

# Matar el proceso (obtén el PID anterior)
taskkill /PID <PID> /F     # Windows
kill -9 <PID>              # Linux/Mac
```

### CORS error en navegador

**Solución:** Verifica que `server/index.js` tiene:
```javascript
app.use(cors());
```

---

## 📚 Guía Rápida para Nuevos Desarrolladores

1. **Entiende la arquitectura:** Lee la sección [Arquitectura](#arquitectura).
2. **Configura el entorno:** Sigue [Configuración](#configuración).
3. **Ejecuta el proyecto:** Sigue [Ejecución](#ejecución).
4. **Prueba los endpoints:** Usa [Postman](https://www.postman.com/) o `curl` (ver [API Endpoints](#api-endpoints)).
5. **Modifica el código:** El servidor se recarga con `nodemon`, el cliente con HMR (Hot Module Replacement).

### Dónde está cada cosa:

- **Formulario y tabla:** `client/src/App.js`
- **Estilos:** `client/src/App.css`
- **Rutas del servidor:** `server/index.js`
- **Conexión a BD:** `server/db.js`
- **Config de BD:** `server/.env`

---

## 🎓 Conceptos Clave

### Full-Stack Monolítico

Este proyecto es un "monolito separado por carpetas" porque:
- Frontend y backend están en **carpetas separadas** pero en el mismo repositorio.
- Comparten la misma base de datos.
- Ideal para proyectos pequeños/medianos.

### React Hooks Usados

- `useState()` — Gestionar estado de campos del formulario.
- `useEffect()` — Cargar empleados al inicializar.

### Express Middleware

- `cors()` — Permitir peticiones desde el frontend.
- `express.json()` — Parsear JSON en peticiones POST/PUT.

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica los **logs de la consola** (tanto del servidor como del navegador).
2. Consulta la sección [Troubleshooting](#troubleshooting).
3. Revisa que la **base de datos existe** y los **credenciales son correctos**.
4. Asegúrate de que **todos los puertos (3000, 3001, 3307)** están disponibles.

---

## 📄 Licencia

Este proyecto es de uso educativo y libre.

---

**¡Éxito con el proyecto!** 🚀
