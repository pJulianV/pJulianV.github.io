# 🚀 GUÍA: Crear Repositorio en GitHub y Desplegar en Render

## Paso 1: Crear Nuevo Repositorio en GitHub

### 1.1 Ve a GitHub
Abre tu navegador y ve a: https://github.com/new

### 1.2 Configurar el Repositorio
```
Repository name: comercio-negocios-latam-backend
Description: Backend API para Comercio y Negocios Latam SAC
Visibility: Public (o Private si prefieres)

❌ NO marques:
   - Add a README file
   - Add .gitignore
   - Choose a license

(Ya tenemos estos archivos localmente)
```

### 1.3 Crear Repositorio
Haz clic en **"Create repository"**

---

## Paso 2: Conectar tu Proyecto Local con GitHub

Copia y ejecuta estos comandos en tu terminal:

```bash
# Ya estás en la carpeta correcta, así que solo ejecuta:

# Conectar con el repositorio remoto
git remote add origin https://github.com/pJulianV/comercio-negocios-latam-backend.git

# Subir el código a GitHub
git push -u origin main
```

**Nota:** Si te pide usuario y contraseña:
- Usuario: `pJulianV`
- Contraseña: Usa un **Personal Access Token** (no tu contraseña normal)

### Crear Personal Access Token (si es necesario):
1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Dale un nombre: `Render Deploy`
4. Marca el scope: `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPIA el token** (no lo volverás a ver)
7. Usa este token como contraseña al hacer push

---

## Paso 3: Verificar que se Subió Correctamente

1. Ve a: https://github.com/pJulianV/comercio-negocios-latam-backend
2. Deberías ver todos tus archivos (excepto .env que está en .gitignore)
3. Verifica que están:
   - `server.js`
   - `package.json`
   - `render.yaml`
   - carpetas: `routes/`, `services/`, `middleware/`

---

## Paso 4: Desplegar en Render.com

### 4.1 Crear Cuenta en Render
1. Ve a: https://render.com
2. Click en **"Get Started"**
3. Regístrate con tu cuenta de **GitHub** (recomendado)
4. Autoriza a Render para acceder a tus repositorios

### 4.2 Crear Web Service
1. En el dashboard de Render, click **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio:
   - Busca: `comercio-negocios-latam-backend`
   - Click **"Connect"**

### 4.3 Configurar el Servicio
```
Name: comercio-negocios-backend
Region: Oregon (US West)
Branch: main
Root Directory: (dejar vacío)
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 4.4 Agregar Variables de Entorno
Scroll hasta **"Environment Variables"** y agrega:

```
EMAIL_SERVICE = gmail
EMAIL_USER = julianvargastrb@gmail.com
EMAIL_PASSWORD = [tu-contraseña-de-aplicación-de-gmail]
EMAIL_TO = julianvargastrb@gmail.com
ALLOWED_ORIGINS = https://pjulianv.github.io,http://localhost:3000
NODE_ENV = production
```

**Para EMAIL_PASSWORD:**
1. Ve a: https://myaccount.google.com/apppasswords
2. Genera contraseña para "Correo"
3. Cópiala (16 caracteres sin espacios)

### 4.5 Deploy
1. Click **"Create Web Service"**
2. Render comenzará a desplegar (toma 2-3 minutos)
3. Verás los logs en tiempo real

---

## Paso 5: Obtener tu URL

Una vez completado el deploy, tu backend estará disponible en:
```
https://comercio-negocios-backend.onrender.com
```

### Probar que funciona:
```bash
# Desde tu navegador o terminal
https://comercio-negocios-backend.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "..."
}
```

---

## Paso 6: Conectar Frontend con Backend

Actualiza la URL en tu frontend:

**En `js/formValidation.js`:**
```javascript
const API_URL = 'https://comercio-negocios-backend.onrender.com';
```

Luego sube los cambios:
```bash
git add js/formValidation.js
git commit -m "Actualizar URL del backend a Render"
git push
```

---

## 🎯 Comandos Resumidos

```bash
# 1. Crear repo en GitHub: comercio-negocios-latam-backend

# 2. Conectar y subir (ejecutar en tu terminal)
git remote add origin https://github.com/pJulianV/comercio-negocios-latam-backend.git
git push -u origin main

# 3. Ve a render.com y sigue los pasos del Paso 4

# 4. Una vez desplegado, actualiza el frontend con la URL de Render
```

---

## ✅ Checklist

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub (`git push`)
- [ ] Cuenta creada en Render.com
- [ ] Render conectado con GitHub
- [ ] Web Service creado en Render
- [ ] Variables de entorno configuradas
- [ ] Deploy completado exitosamente
- [ ] URL del backend probada (`/api/health`)
- [ ] Contraseña de aplicación de Gmail configurada
- [ ] Frontend actualizado con URL de Render
- [ ] Formulario de contacto probado end-to-end

---

## 🆘 Problemas Comunes

### "Permission denied" al hacer git push
- Crea un Personal Access Token y úsalo como contraseña
- https://github.com/settings/tokens

### Deploy falla en Render
- Verifica que `package.json` tenga `"type": "module"`
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Render para ver el error exacto

### "Invalid login" en emails
- Usa contraseña de aplicación, no tu contraseña de Gmail
- Asegúrate de que la verificación en 2 pasos esté activa
- https://myaccount.google.com/apppasswords

### Backend se duerme
- Es normal en el plan gratuito de Render
- Se despierta automáticamente en ~30 segundos
- Usa UptimeRobot para mantenerlo activo: https://uptimerobot.com

---

## 🎉 ¡Todo Listo!

Una vez completado, tendrás:
- ✅ Backend en la nube (Render.com)
- ✅ Frontend en GitHub Pages (pjulianv.github.io)
- ✅ Sistema de email funcionando
- ✅ Todo gratis y escalable

**¡Tu sitio web corporativo está completo!** 🚀
