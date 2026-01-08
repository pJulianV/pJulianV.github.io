# 🚀 DESPLIEGUE GRATUITO - Servicios Recomendados

## 🏆 Top 3 Servicios Gratuitos para Node.js (Enero 2026)

### 1. **Render.com** ⭐ (RECOMENDADO)
**Plan Gratuito:** Ilimitado
- ✅ 750 horas/mes gratis
- ✅ Deploy automático desde GitHub
- ✅ SSL gratis
- ✅ Variables de entorno integradas
- ✅ No requiere tarjeta de crédito
- ⚠️ Se duerme después de 15 min de inactividad

**Deploy en 5 minutos:**
```bash
# 1. Sube tu código a GitHub
git init
git add .
git commit -m "Backend inicial"
git branch -M main
git remote add origin https://github.com/pJulianV/comercio-negocios-backend.git
git push -u origin main

# 2. Ve a https://render.com
# 3. Conecta tu repositorio de GitHub
# 4. Crea un nuevo "Web Service"
# 5. Configura:
#    - Build Command: npm install
#    - Start Command: npm start
# 6. Agrega variables de entorno en el dashboard
# 7. Deploy automático! 🎉
```

**URL resultado:** `https://comercio-negocios.onrender.com`

---

### 2. **Railway.app** 🚂
**Plan Gratuito:** $5 de crédito/mes (suficiente para 200+ horas)
- ✅ Deploy instantáneo
- ✅ Monitoreo incluido
- ✅ Base de datos gratis (PostgreSQL)
- ✅ CLI poderoso
- ⚠️ Requiere tarjeta (sin cobro en plan gratis)

**Deploy:**
```bash
# 1. Instalar CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Iniciar proyecto
railway init

# 4. Agregar variables de entorno
railway variables set EMAIL_USER=julianvargastrb@gmail.com
railway variables set EMAIL_PASSWORD=tu-contraseña
railway variables set EMAIL_TO=julianvargastrb@gmail.com
railway variables set NODE_ENV=production

# 5. Deploy
railway up
```

**URL resultado:** `https://comercio-negocios-production.up.railway.app`

---

### 3. **Vercel** ⚡
**Plan Gratuito:** Ilimitado
- ✅ Deploy ultra rápido
- ✅ Serverless Functions
- ✅ Perfecto para frontend + backend
- ✅ SSL automático
- ⚠️ Límite de 10 segundos por request

**Deploy:**
```bash
# 1. Instalar CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Configurar variables de entorno
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
vercel env add EMAIL_TO

# 5. Deploy a producción
vercel --prod
```

---

## 🎯 MI RECOMENDACIÓN: Render.com

### ¿Por qué Render?
- ✅ **100% Gratuito** sin límite de tiempo
- ✅ **No requiere tarjeta** de crédito
- ✅ **Fácil de usar** - deploy en 5 minutos
- ✅ **Perfecto para Node.js** con Express
- ✅ **Logs y monitoreo** incluidos

### Desventajas (minor):
- ⚠️ Se duerme después de 15 min sin uso (se despierta en ~30 segundos)
- Solución: Usar servicio de ping como UptimeRobot (gratis)

---

## 📝 GUÍA PASO A PASO - RENDER.COM

### Paso 1: Preparar el Código

**1.1 Verificar package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

**1.2 Crear render.yaml (opcional pero recomendado):**
```yaml
services:
  - type: web
    name: comercio-negocios-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Paso 2: Subir a GitHub

```bash
# Si no has inicializado git
git init
git add .
git commit -m "Backend completo con API de contacto"

# Crear repo en GitHub primero, luego:
git remote add origin https://github.com/pJulianV/comercio-negocios-backend.git
git branch -M main
git push -u origin main
```

### Paso 3: Deploy en Render

1. **Ir a:** https://render.com
2. **Registro:** Usar tu cuenta de GitHub
3. **New → Web Service**
4. **Conectar repositorio:** Buscar `comercio-negocios-backend`
5. **Configurar:**
   ```
   Name: comercio-negocios-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

6. **Variables de Entorno:**
   Hacer clic en "Advanced" y agregar:
   ```
   EMAIL_SERVICE = gmail
   EMAIL_USER = julianvargastrb@gmail.com
   EMAIL_PASSWORD = [tu-contraseña-de-aplicación]
   EMAIL_TO = julianvargastrb@gmail.com
   ALLOWED_ORIGINS = https://pjulianv.github.io,http://localhost:3000
   NODE_ENV = production
   ```

7. **Create Web Service** → Esperar ~2 minutos

### Paso 4: Obtener URL y Probar

Tu backend estará en:
```
https://comercio-negocios-backend.onrender.com
```

**Probar:**
```bash
curl https://comercio-negocios-backend.onrender.com/api/health
```

### Paso 5: Conectar Frontend

Actualizar `formValidation.js`:
```javascript
const API_URL = 'https://comercio-negocios-backend.onrender.com';

// En la función handleFormSubmit
const response = await fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});
```

---

## 🔧 Mantener el Servicio Activo (Evitar que se duerma)

### Opción 1: UptimeRobot (Recomendado)

1. Ir a https://uptimerobot.com
2. Crear cuenta gratis
3. Add New Monitor:
   ```
   Monitor Type: HTTP(s)
   Friendly Name: Comercio Negocios Backend
   URL: https://comercio-negocios-backend.onrender.com/api/health
   Monitoring Interval: 5 minutes
   ```

Esto hará ping cada 5 minutos y mantendrá tu backend activo.

### Opción 2: Cron-Job.org

1. Ir a https://cron-job.org
2. Crear cuenta
3. Crear cronjob que llame a tu API cada 10 minutos

---

## 🆘 Troubleshooting

### Error: "Invalid login" en emails
- Verifica que uses contraseña de aplicación, no tu contraseña normal
- Activa verificación en 2 pasos en Gmail
- Genera nueva contraseña en: https://myaccount.google.com/apppasswords

### Error: "CORS"
- Agrega el dominio de GitHub Pages a `ALLOWED_ORIGINS`
- Formato: `https://pjulianv.github.io` (sin trailing slash)

### El servicio se duerme
- Usa UptimeRobot para hacer ping periódico
- Primera request tarda ~30 segundos en despertar

### Logs no aparecen
- En Render: Ve a Logs en el dashboard
- Puedes ver logs en tiempo real

---

## 💰 Comparación de Costos

| Servicio | Horas Gratis | Limitaciones | Tarjeta Requerida |
|----------|--------------|--------------|-------------------|
| **Render** | 750/mes | Se duerme en 15 min | ❌ No |
| Railway | ~200/mes ($5) | $5 crédito/mes | ⚠️ Sí (no cobra) |
| Vercel | Ilimitado | 10 seg/request | ❌ No |
| Heroku | 0 (ya no tiene plan gratis) | - | - |

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] `.env` no está en el repositorio (verificar .gitignore)
- [ ] Cuenta creada en Render.com
- [ ] Web Service creado y conectado al repo
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso (verificar logs)
- [ ] Endpoint `/api/health` responde
- [ ] Contraseña de aplicación de Gmail configurada
- [ ] Formulario de contacto probado
- [ ] UptimeRobot configurado (opcional)
- [ ] URL del backend actualizada en frontend

---

## 🎉 ¡Listo!

Tu backend estará funcionando 24/7 gratis en la nube.

**Siguiente paso:** Actualizar el frontend para usar la URL de Render.

¿Necesitas ayuda con algún paso? ¡Avísame!
