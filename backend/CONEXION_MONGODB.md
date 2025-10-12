# 📚 Guía de Conexión a MongoDB mediante SSH

## 🎯 Opción 1: SSH Tunnel (RECOMENDADO)

Esta es la forma más segura y sencilla. El túnel SSH redirige el puerto de MongoDB del servidor remoto a tu máquina local.

### Paso 1: Crear el archivo .env

En la carpeta `backend/`, crea un archivo llamado `.env` con este contenido:

```env
# Configuración de MongoDB
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_DB=tc2007b
MONGO_USER=
MONGO_PASS=

# Configuración del servidor
PORT=3000
JWT_SECRET=secretKey
```

**IMPORTANTE:** El `.env` ya está en `.gitignore` para que no se suba a GitHub.

### Paso 2: Crear el túnel SSH

Abre una terminal y ejecuta este comando (reemplaza con los datos que te dio tu profesor):

```bash
ssh -L 27017:localhost:27017 USUARIO@IP_DEL_SERVIDOR
```

**Ejemplo:**
```bash
ssh -L 27017:localhost:27017 alumno@192.168.1.100
```

**Explicación del comando:**
- `-L 27017:localhost:27017` → Redirige el puerto 27017 del servidor a tu puerto local 27017
- `USUARIO` → Tu usuario SSH
- `IP_DEL_SERVIDOR` → La IP del servidor que te dio tu profesor

**Mantén esta terminal abierta** mientras trabajes en tu proyecto.

### Paso 3: Iniciar tu backend

En otra terminal, ve a la carpeta backend e inicia el servidor:

```bash
cd backend
node index.js
```

Deberías ver:
```
Conectando a MongoDB en 127.0.0.1:27017...
✓ Conectado a la base de datos
aplicacion corriendo en puerto 3000
```

---

## 🔐 Opción 2: Conexión Directa con Credenciales

Si MongoDB en el servidor remoto está configurado para aceptar conexiones externas (menos común y menos seguro):

### Paso 1: Modificar el archivo .env

```env
# Configuración de MongoDB
MONGO_HOST=IP_DEL_SERVIDOR
MONGO_PORT=27017
MONGO_DB=tc2007b
MONGO_USER=tu_usuario_mongo
MONGO_PASS=tu_password_mongo

# Configuración del servidor
PORT=3000
JWT_SECRET=secretKey
```

### Paso 2: Iniciar tu backend

```bash
cd backend
node index.js
```

---

## 🆘 Solución de Problemas

### Error: "Connection refused"
- ✅ Verifica que el túnel SSH esté activo
- ✅ Verifica que MongoDB esté corriendo en el servidor remoto
- ✅ Verifica los puertos en el archivo `.env`

### Error: "Authentication failed"
- ✅ Verifica que `MONGO_USER` y `MONGO_PASS` sean correctos
- ✅ Pregunta a tu profesor las credenciales correctas

### Error: "Address already in use"
- ✅ Ya existe un túnel SSH activo o MongoDB local corriendo
- ✅ Cierra el túnel anterior o usa otro puerto:
  ```bash
  ssh -L 27018:localhost:27017 USUARIO@IP_DEL_SERVIDOR
  ```
  Y en `.env` cambia `MONGO_PORT=27018`

---

## 💡 Tips Útiles

### Mantener el túnel SSH activo
Si no quieres mantener la terminal abierta, puedes ejecutar el túnel en background:

```bash
ssh -f -N -L 27017:localhost:27017 USUARIO@IP_DEL_SERVIDOR
```

Para cerrarlo después:
```bash
ps aux | grep ssh
kill [PID_del_proceso]
```

### Crear un alias para facilitar la conexión
Edita tu `~/.zshrc` (o `~/.bashrc` si usas bash) y agrega:

```bash
alias mongo-tunnel='ssh -L 27017:localhost:27017 USUARIO@IP_DEL_SERVIDOR'
```

Luego solo ejecuta:
```bash
mongo-tunnel
```

---

## 📋 Checklist

- [ ] Archivo `.env` creado en la carpeta `backend/`
- [ ] Túnel SSH establecido (o conexión directa configurada)
- [ ] Backend iniciado exitosamente
- [ ] Frontend puede conectarse al backend

---

## 🤝 Necesitas Ayuda?

Contacta a tu profesor para:
- IP del servidor MongoDB
- Usuario y contraseña SSH
- Usuario y contraseña de MongoDB (si aplica)
- Puerto de MongoDB (usualmente 27017)
- Nombre de la base de datos (actualmente: tc2007b)


