# Backend TC2007B

Backend del proyecto usando Express.js, MongoDB, y JWT para autenticación.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
El archivo `.env` ya está creado con valores por defecto. Si necesitas modificarlo, edítalo directamente.

### 3. Conectar a MongoDB mediante SSH

Abre una **terminal separada** y ejecuta (reemplaza con los datos de tu profesor):

```bash
ssh -L 27017:localhost:27017 USUARIO@IP_DEL_SERVIDOR
```

**Ejemplo:**
```bash
ssh -L 27017:localhost:27017 alumno@192.168.1.100
```

**¡Mantén esta terminal abierta!** 🔓

### 4. Probar la conexión (Opcional pero recomendado)

```bash
npm run test-connection
```

Si ves "✅ ¡Conexión exitosa!", todo está bien configurado.

### 5. Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
Conectando a MongoDB en 127.0.0.1:27017...
✓ Conectado a la base de datos
aplicacion corriendo en puerto 3000
```

## 📖 Documentación Completa

Para instrucciones detalladas sobre la conexión a MongoDB, ver [CONEXION_MONGODB.md](./CONEXION_MONGODB.md)

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor backend
- `npm run test-connection` - Prueba la conexión a MongoDB

## 📁 Estructura del Proyecto

```
backend/
├── index.js              # Servidor principal
├── test-connection.js    # Script para probar conexión a MongoDB
├── .env                  # Variables de entorno (NO SUBIR A GIT)
├── env.example           # Ejemplo de .env
├── package.json          # Dependencias
└── README.md            # Este archivo
```

## 🔐 Endpoints

### Autenticación
- `POST /login` - Iniciar sesión
- `POST /registrarse` - Registrar nuevo usuario

### Reportes (requiere autenticación)
- `GET /reportes` - Obtener lista de reportes
- `GET /reportes/:id` - Obtener un reporte específico
- `POST /reportes` - Crear nuevo reporte
- `PUT /reportes/:id` - Actualizar reporte
- `DELETE /reportes/:id` - Eliminar reporte

## 🆘 ¿Problemas?

Ver la [Guía de Solución de Problemas](./CONEXION_MONGODB.md#-solución-de-problemas) en CONEXION_MONGODB.md

