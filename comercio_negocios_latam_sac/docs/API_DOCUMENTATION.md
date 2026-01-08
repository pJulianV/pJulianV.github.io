# 📚 Documentación del Backend - Comercio y Negocios Latam SAC

## 📋 Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [API Endpoints](#api-endpoints)
- [Configuración de Email](#configuración-de-email)
- [Despliegue](#despliegue)
- [Seguridad](#seguridad)
- [Mantenimiento](#mantenimiento)

---

## 🏗️ Estructura del Proyecto

```
comercio_negocios_latam_sac/
├── server.js                 # Servidor principal Express
├── package.json              # Dependencias y scripts
├── .env.example              # Ejemplo de variables de entorno
├── .env                      # Variables de entorno (NO commitear)
├── routes/
│   └── contact.js           # Rutas de contacto
├── services/
│   └── emailService.js      # Servicio de envío de emails
├── middleware/
│   └── errorHandler.js      # Manejo de errores global
├── utils/
│   └── imageOptimization.js # Utilidades de optimización
├── js/
│   ├── script.js            # Scripts principales frontend
│   └── formValidation.js    # Validación de formularios
└── docs/
    ├── API_DOCUMENTATION.md # Esta documentación
    └── OPTIMIZACION_IMAGENES.md
```

---

## ⚙️ Instalación y Configuración

### 1. Requisitos Previos
- Node.js v16 o superior
- npm o yarn
- Cuenta de email (Gmail recomendado)

### 2. Instalación de Dependencias

```bash
cd comercio_negocios_latam_sac
npm install
```

### 3. Configuración de Variables de Entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
copy .env.example .env
```

Edita el archivo `.env`:

```env
# Puerto del servidor
PORT=3000

# Configuración de email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicación

# Email de destino
EMAIL_TO=info@comercionegocioslatam.com

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://pjulianv.github.io

# Entorno
NODE_ENV=development
```

### 4. Configurar Gmail para Envío de Emails

#### Paso 1: Habilitar verificación en 2 pasos
1. Ve a [Cuenta de Google](https://myaccount.google.com/)
2. Seguridad → Verificación en 2 pasos
3. Activa la verificación en 2 pasos

#### Paso 2: Crear contraseña de aplicación
1. Ve a [Contraseñas de aplicación](https://myaccount.google.com/apppasswords)
2. Selecciona "Correo" y "Otro (nombre personalizado)"
3. Ingresa "Comercio Negocios Latam"
4. Copia la contraseña generada (16 caracteres)
5. Pégala en `.env` como `EMAIL_PASSWORD`

### 5. Iniciar el Servidor

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

---

## 🌐 API Endpoints

### Base URL
- **Desarrollo:** `http://localhost:3000/api`
- **Producción:** `https://tu-dominio.com/api`

### Endpoints Disponibles

#### 1. Health Check
```http
GET /api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2026-01-08T14:30:00.000Z"
}
```

---

#### 2. Enviar Formulario de Contacto
```http
POST /api/contact
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "empresa": "Tech Solutions SAC",
  "email": "juan.perez@techsolutions.com",
  "telefono": "+51 999 888 777",
  "mensaje": "Quisiera información sobre sus servicios de expansión internacional."
}
```

**Validaciones:**
- `nombre`: Requerido, 2-100 caracteres
- `empresa`: Requerido, 2-100 caracteres
- `email`: Requerido, formato email válido
- `telefono`: Opcional, solo números y símbolos (+, -, (, ))
- `mensaje`: Requerido, 10-1000 caracteres

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Nos pondremos en contacto pronto."
}
```

**Respuesta Error de Validación (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Debe ser un email válido"
    }
  ]
}
```

**Respuesta Error del Servidor (500):**
```json
{
  "success": false,
  "message": "Error interno del servidor. Por favor, intenta más tarde."
}
```

**Rate Limiting:**
- Máximo 5 envíos por hora por IP
- Respuesta al exceder límite (429):
```json
{
  "message": "Has alcanzado el límite de envíos. Intenta nuevamente en 1 hora"
}
```

---

## 📧 Configuración de Email

### Servicios Soportados

El backend usa Nodemailer y soporta múltiples servicios:

- **Gmail** (recomendado)
- Outlook/Hotmail
- Yahoo
- SendGrid
- Mailgun
- Amazon SES

### Ejemplo con SendGrid

```env
EMAIL_SERVICE=SendGrid
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.tu-api-key-aqui
```

### Ejemplo con Outlook

```env
EMAIL_SERVICE=hotmail
EMAIL_USER=tu-email@outlook.com
EMAIL_PASSWORD=tu-contraseña
```

### Plantillas de Email

El servicio envía 2 emails automáticamente:

1. **Email al Administrador:**
   - Asunto: "Nuevo contacto desde el sitio web - [Empresa]"
   - Contiene todos los datos del formulario
   - Diseño profesional en HTML

2. **Email de Confirmación al Usuario:**
   - Asunto: "Hemos recibido tu mensaje - Comercio y Negocios Latam SAC"
   - Confirmación de recepción
   - Información de contacto de la empresa

---

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. **Instalar Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Configurar proyecto:**
```bash
vercel
```

4. **Configurar variables de entorno en Vercel:**
```bash
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
vercel env add EMAIL_TO
vercel env add ALLOWED_ORIGINS
```

5. **Deploy:**
```bash
vercel --prod
```

### Opción 2: Railway

1. Crear cuenta en [Railway.app](https://railway.app)
2. Conectar repositorio de GitHub
3. Configurar variables de entorno en el dashboard
4. Deploy automático en cada push

### Opción 3: Heroku

1. **Instalar Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login y crear app:**
```bash
heroku login
heroku create comercio-negocios-backend
```

3. **Configurar variables:**
```bash
heroku config:set EMAIL_USER=tu-email@gmail.com
heroku config:set EMAIL_PASSWORD=tu-contraseña
heroku config:set EMAIL_TO=info@comercionegocioslatam.com
```

4. **Deploy:**
```bash
git push heroku main
```

### Opción 4: VPS (DigitalOcean, AWS EC2, etc.)

1. **Conectar al servidor:**
```bash
ssh usuario@tu-servidor-ip
```

2. **Instalar Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clonar repositorio:**
```bash
git clone https://github.com/tu-usuario/comercio-negocios-latam.git
cd comercio-negocios-latam/comercio_negocios_latam_sac
```

4. **Instalar dependencias:**
```bash
npm install
```

5. **Configurar PM2:**
```bash
npm install -g pm2
pm2 start server.js --name comercio-backend
pm2 startup
pm2 save
```

6. **Configurar Nginx como proxy:**
```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Seguridad

### Medidas Implementadas

1. **Helmet.js** - Headers de seguridad HTTP
2. **CORS** - Control de orígenes permitidos
3. **Rate Limiting** - Protección contra spam y DDoS
4. **Express Validator** - Validación y sanitización de inputs
5. **Variables de Entorno** - Credenciales nunca en código

### Configuración CORS

Edita `ALLOWED_ORIGINS` en `.env`:

```env
# Permitir múltiples dominios
ALLOWED_ORIGINS=http://localhost:3000,https://pjulianv.github.io,https://www.tudominio.com
```

### Rate Limiting

Configurado en [server.js](../server.js):

- **General:** 100 requests / 15 minutos
- **Formulario:** 5 envíos / hora

Para ajustar:

```javascript
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Cambiar a 10 envíos
  message: 'Límite excedido'
});
```

### HTTPS

En producción, **SIEMPRE** usar HTTPS:

1. **Vercel/Railway:** HTTPS automático
2. **VPS:** Usar Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.tudominio.com
```

---

## 🛠️ Mantenimiento

### Logs

**Desarrollo:**
Los logs se muestran en consola.

**Producción con PM2:**
```bash
pm2 logs comercio-backend
pm2 logs comercio-backend --lines 100
```

### Monitoreo

**PM2 Monit:**
```bash
pm2 monit
```

**Ver status:**
```bash
pm2 status
```

### Backup

Backup periódico de `.env` (encriptado):

```bash
# Crear backup
cp .env .env.backup.$(date +%Y%m%d)

# Encriptar (opcional)
gpg -c .env.backup.20260108
```

### Actualización

```bash
git pull origin main
npm install
pm2 restart comercio-backend
```

### Testing

**Probar endpoint de salud:**
```bash
curl http://localhost:3000/api/health
```

**Probar formulario de contacto:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "empresa": "Test Corp",
    "email": "test@test.com",
    "mensaje": "Este es un mensaje de prueba"
  }'
```

---

## 📞 Soporte

Para problemas o preguntas:
- **Email:** info@comercionegocioslatam.com
- **GitHub Issues:** [Reportar problema](https://github.com/pJulianV/pJulianV.github.io/issues)

---

## 📝 Changelog

### v1.0.0 (2026-01-08)
- ✅ Backend inicial con Express
- ✅ Endpoint de contacto funcional
- ✅ Servicio de email con Nodemailer
- ✅ Validación de formularios
- ✅ Rate limiting y seguridad
- ✅ Documentación completa

---

**Última actualización:** 8 de Enero, 2026
