# 📧 Configuración de EmailJS (Sin Contraseñas)

## ✅ Ventajas de EmailJS

- ✅ **NO necesitas tu contraseña de Gmail**
- ✅ **100% Gratis** - 200 emails/mes
- ✅ **Sin backend** - Funciona directo desde el navegador
- ✅ **5 minutos** de configuración
- ✅ **Totalmente seguro**

---

## 🚀 Configuración Paso a Paso (5 minutos)

### Paso 1: Crear Cuenta en EmailJS

1. Ve a: **https://www.emailjs.com/**
2. Click en **"Sign Up"** (Registro)
3. Usa tu email: **julianvargastrb@gmail.com**
4. Crea una contraseña (cualquiera, NO la de Gmail)
5. Verifica tu email

---

### Paso 2: Conectar tu Gmail (SIN contraseña)

1. En el dashboard, ve a **"Email Services"**
2. Click **"Add New Service"**
3. Selecciona **"Gmail"**
4. Click en **"Connect Account"**
5. **Se abrirá una ventana de Google** para autorizar
6. Selecciona tu cuenta **julianvargastrb@gmail.com**
7. Acepta los permisos
8. ¡Listo! Tu Gmail está conectado **sin compartir contraseña**
9. Copia el **Service ID** (algo como `service_abc123`)

---

### Paso 3: Crear Plantilla de Email

1. Ve a **"Email Templates"**
2. Click **"Create New Template"**
3. Usa esta configuración:

**Template Name:** `contact_form`

**Subject:**
```
Nuevo contacto desde el sitio web - {{from_empresa}}
```

**Content:**
```html
<p>Has recibido un nuevo mensaje de contacto:</p>

<p><strong>Nombre:</strong> {{from_name}}</p>
<p><strong>Empresa:</strong> {{from_empresa}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Teléfono:</strong> {{from_telefono}}</p>

<p><strong>Mensaje:</strong></p>
<p>{{message}}</p>

<hr>
<p><small>Este mensaje fue enviado desde el formulario de contacto de Comercio y Negocios Latam SAC</small></p>
```

**To Email:**
```
julianvargastrb@gmail.com
```

4. Click **"Save"**
5. Copia el **Template ID** (algo como `template_xyz789`)

---

### Paso 4: Obtener Public Key

1. Ve a **"Account"** (tu perfil)
2. En la sección **"API Keys"**
3. Copia tu **Public Key** (algo como `user_KLMnopQRSTuvWXYZ`)

---

### Paso 5: Configurar en tu Código

Abre el archivo: `pages/contacto.html`

Busca esta línea:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Reemplázala con tu Public Key:
```javascript
emailjs.init("user_KLMnopQRSTuvWXYZ");
```

Ahora abre: `js/formValidation.js`

Busca estas líneas:
```javascript
const result = await emailjs.send(
  'YOUR_SERVICE_ID',  
  'YOUR_TEMPLATE_ID',
```

Reemplázalas con tus IDs:
```javascript
const result = await emailjs.send(
  'service_abc123',      // Tu Service ID
  'template_xyz789',     // Tu Template ID
```

---

### Paso 6: Probar

1. Abre tu página de contacto
2. Llena el formulario
3. Click "Enviar Mensaje"
4. ¡Revisa tu email!

---

## 📋 Resumen de lo que Necesitas

```javascript
// En contacto.html (línea ~11)
emailjs.init("TU_PUBLIC_KEY_AQUI");

// En formValidation.js (línea ~35)
const result = await emailjs.send(
  'TU_SERVICE_ID',      // Del paso 2
  'TU_TEMPLATE_ID',     // Del paso 3
  { ... }
);
```

---

## 🔧 Configuración Visual

```
EmailJS Dashboard
├── Email Services
│   └── Gmail (conectado)
│       └── Service ID: service_abc123 ← Copiar esto
│
├── Email Templates
│   └── contact_form
│       └── Template ID: template_xyz789 ← Copiar esto
│
└── Account
    └── Public Key: user_KLMnopQRSTuvWXYZ ← Copiar esto
```

---

## 💰 Plan Gratuito

- **200 emails/mes** - Gratis forever
- Sin tarjeta de crédito
- Suficiente para un sitio de contacto
- Si necesitas más: $8/mes por 1000 emails

---

## ✅ Checklist

- [ ] Cuenta creada en EmailJS
- [ ] Gmail conectado (sin contraseña)
- [ ] Service ID copiado
- [ ] Template creado
- [ ] Template ID copiado
- [ ] Public Key copiado
- [ ] `contacto.html` actualizado con Public Key
- [ ] `formValidation.js` actualizado con Service y Template IDs
- [ ] Probado y funcionando

---

## 🆘 Problemas Comunes

### "User not found" o "Invalid public key"
- Verifica que copiaste el Public Key correctamente
- Debe empezar con `user_` o similar

### "Service not found"
- Verifica que el Service ID sea correcto
- Debe empezar con `service_`

### "Template not found"
- Verifica que el Template ID sea correcto
- Debe empezar con `template_`

### No llegan los emails
- Revisa tu carpeta de SPAM
- Verifica que el Template tenga configurado "To Email"
- Espera 1-2 minutos (a veces demora)

---

## 🎉 ¡Listo!

Una vez configurado, tu formulario enviará emails **directamente sin backend y sin contraseñas**.

**Beneficios:**
- ✅ Más seguro (no compartes contraseñas)
- ✅ Más simple (sin backend)
- ✅ Más rápido (sin servidor)
- ✅ Gratis forever

---

## 🔗 Links Útiles

- **Dashboard EmailJS:** https://dashboard.emailjs.com/
- **Documentación:** https://www.emailjs.com/docs/
- **Ejemplos:** https://www.emailjs.com/docs/examples/

---

¿Necesitas ayuda? Revisa la documentación o contáctame.
