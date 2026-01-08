# 🎯 INICIO RÁPIDO - Configuración de Email

## Paso 1: Obtener Contraseña de Aplicación de Gmail

### 1. Habilitar Verificación en 2 Pasos

1. Ve a tu **Cuenta de Google**: https://myaccount.google.com
2. En el menú izquierdo, selecciona **Seguridad**
3. En "Cómo inicias sesión en Google", selecciona **Verificación en 2 pasos**
4. Sigue los pasos para activarla (si no está activada)

### 2. Crear Contraseña de Aplicación

1. Ve directamente a: https://myaccount.google.com/apppasswords
2. En "Seleccionar app", elige **Correo**
3. En "Seleccionar dispositivo", elige **Otro (nombre personalizado)**
4. Escribe: **Comercio Negocios Latam**
5. Haz clic en **Generar**
6. **COPIA** la contraseña de 16 caracteres que aparece (ejemplo: `abcd efgh ijkl mnop`)

### 3. Configurar en el Proyecto

Abre el archivo `.env` y reemplaza:

```env
EMAIL_PASSWORD=AQUI_TU_CONTRASEÑA_DE_APLICACION
```

Por tu contraseña (sin espacios):

```env
EMAIL_PASSWORD=abcdefghijklmnop
```

## Paso 2: Iniciar el Backend

```bash
# En la carpeta del proyecto
cd comercio_negocios_latam_sac

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en puerto 3000
📧 Email configurado: julianvargastrb@gmail.com
🌍 Entorno: development
```

## Paso 3: Probar el Formulario

1. Abre: http://localhost:3000/api/health
2. Deberías ver: `{"status":"OK",...}`
3. Abre la página de contacto en tu navegador
4. Llena el formulario y envía
5. ¡Revisa tu email julianvargastrb@gmail.com!

## ⚠️ Problemas Comunes

### "Invalid login" o error de autenticación
- ✅ Verifica que la verificación en 2 pasos esté ACTIVA
- ✅ Usa la contraseña de aplicación, NO tu contraseña normal de Gmail
- ✅ Copia la contraseña sin espacios en el `.env`
- ✅ Reinicia el servidor después de cambiar `.env`

### "Credenciales no configuradas"
- ✅ Verifica que el archivo `.env` exista
- ✅ Verifica que `EMAIL_USER` y `EMAIL_PASSWORD` estén configurados
- ✅ No uses comillas en los valores del `.env`

### El servidor no inicia
- ✅ Ejecuta `npm install` primero
- ✅ Verifica que Node.js esté instalado: `node --version` (debe ser v16+)

## 🎉 ¡Listo!

Una vez funcionando localmente, sigue la guía de [DEPLOY_GRATUITO.md](./DEPLOY_GRATUITO.md) para subirlo a internet.
