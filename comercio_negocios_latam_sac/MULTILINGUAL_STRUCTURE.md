# Estructura Multilingüe - Subdirectorios

## 📂 Estructura de Carpetas

```
comercio_negocios_latam_sac/
├── / (raíz) - Versión en Español (por defecto)
│   ├── index.html
│   └── pages/
│       ├── contacto.html
│       ├── nosotros.html
│       └── ...
│
└── /en/ - Versión en Inglés
    ├── index.html
    └── pages/
        ├── contact.html
        ├── about-us.html
        └── ...
```

## 🌐 URLs de Acceso

### Español (Predeterminado)
- Home: `https://cynlatam.com/`
- Contacto: `https://cynlatam.com/pages/contacto`

### Inglés
- Home: `https://cynlatam.com/en/`
- Contact: `https://cynlatam.com/en/pages/contact`

## 🔄 Selector de Idioma

El selector de idioma en el header redirige automáticamente:
- Seleccionar Español → redirige a `/` o `/pages/xxx`
- Seleccionar English → redirige a `/en/` o `/en/pages/xxx`

## 🎯 Beneficios SEO

### Hreflang Tags
Cada página tiene etiquetas hreflang en el `<head>`:

```html
<link rel="alternate" hreflang="es" href="https://cynlatam.com/pagina" />
<link rel="alternate" hreflang="en" href="https://cynlatam.com/en/page" />
<link rel="alternate" hreflang="x-default" href="https://cynlatam.com/pagina" />
```

### Ventajas
✅ URLs amigables para SEO  
✅ Contenido 100% estático (sin JavaScript para traducir)  
✅ Google indexa cada versión por separado  
✅ Mejora ranking en búsquedas locales  
✅ No duplica contenido (gracias a hreflang)  

## 📝 Páginas Implementadas

### ✅ Completadas
- [x] `/index.html` + `/en/index.html`
- [x] `/pages/contacto.html` + `/en/pages/contact.html`

### 🔜 Pendientes
### ✅ Completadas
- [x] `/pages/nosotros.html` → `/en/pages/about-us.html`
- [x] `/pages/desarrollo-negocios.html` → `/en/pages/business-development.html`
- [x] `/pages/inteligencia-comercial.html` → `/en/pages/commercial-intelligence.html`
- [x] `/pages/expansion-internacional.html` → `/en/pages/international-expansion.html`
- [x] `/pages/consultoria-estrategica.html` → `/en/pages/strategic-consulting.html`
- [x] `/pages/gestion-proyectos.html` → `/en/pages/project-management.html`
- [x] Todas las páginas principales cuentan con su versión en inglés y estructura i18n.

## 🛠️ Próximos Pasos

1. Crear versión en inglés de todas las páginas restantes
2. Agregar hreflang a todas las páginas españolas existentes
3. Configurar redirecciones automáticas en servidor
4. Actualizar sitemap.xml con ambas versiones
5. Enviar ambas versiones a Google Search Console
