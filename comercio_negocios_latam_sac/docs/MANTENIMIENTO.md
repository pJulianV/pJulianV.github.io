# Guía de Mantenimiento y Estructura del Proyecto

## 📂 Estructura Organizada

El proyecto ha sido organizado en carpetas lógicas para facilitar el mantenimiento:

```
comercio_negocios_latam_sac/
│
├── index.html              ← Página principal (NO MOVER)
├── README.md               ← Documentación general
│
├── css/                    ← Todos los estilos
│   ├── style.css          ← Estilos principales
│   └── style.css.backup   ← Respaldo
│
├── js/                     ← Scripts JavaScript
│   └── script.js          ← Animaciones y funcionalidad
│
├── img/                    ← Todas las imágenes
│   ├── logos/
│   ├── backgrounds/
│   └── services/
│
├── pages/                  ← Todas las páginas secundarias
│   ├── Institucionales:
│   │   ├── nosotros.html
│   │   ├── equipo.html
│   │   ├── carreras.html
│   │   ├── ubicacion.html
│   │   └── contacto.html
│   │
│   ├── Servicios:
│   │   ├── desarrollo-negocios.html
│   │   ├── inteligencia-comercial.html
│   │   ├── expansion-internacional.html
│   │   ├── consultoria-estrategica.html
│   │   └── gestion-proyectos.html
│   │
│   └── Recursos:
│       ├── sectores.html
│       ├── insights.html
│       └── casos-exito.html
│
├── docs/                   ← Documentación del proyecto
└── ejemplos/              ← Referencias de diseño

```

## 🔗 Sistema de Referencias

### Desde index.html (raíz) hacia otras ubicaciones:
```html
<!-- CSS y JS -->
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>

<!-- Imágenes -->
<img src="img/logo.png">

<!-- Páginas -->
<a href="pages/nosotros.html">Nosotros</a>
<a href="pages/contacto.html">Contacto</a>
```

### Desde páginas en /pages/ hacia otras ubicaciones:
```html
<!-- CSS y JS -->
<link rel="stylesheet" href="../css/style.css">
<script src="../js/script.js"></script>

<!-- Imágenes -->
<img src="../img/logo.png">
<div style="background: url('../img/hero.jpg')"></div>

<!-- Volver a inicio -->
<a href="../index.html">Inicio</a>
<a href="../index.html#servicios">Servicios</a>

<!-- Entre páginas del mismo nivel -->
<a href="nosotros.html">Nosotros</a>
<a href="contacto.html">Contacto</a>
```

## ✏️ Tareas Comunes de Edición

### 1. Cambiar un texto en una página
**Ubicación:** `pages/nombre-pagina.html`
**Pasos:**
1. Abrir el archivo HTML
2. Buscar el texto con Ctrl+F
3. Modificar directamente
4. Guardar
5. Refrescar navegador

### 2. Actualizar una imagen
**Ubicación:** `img/`
**Pasos:**
1. Guardar nueva imagen en `img/` con nombre descriptivo
2. Buscar referencia en HTML: `<img src="../img/vieja.jpg">`
3. Cambiar a: `<img src="../img/nueva.jpg">`
4. Mantener mismo tamaño/proporciones para evitar ajustes CSS

### 3. Modificar colores globales
**Ubicación:** `css/style.css`
**Colores principales:**
```css
/* Buscar y reemplazar estos valores en style.css */
#002156  → Azul header
#002a6e  → Azul títulos
#c19e5c  → Dorado acentos
#fff     → Blanco
#555     → Gris texto
```

### 4. Agregar nueva página de servicio
**Template:** Copiar `pages/desarrollo-negocios.html`

**Checklist:**
- [ ] Crear `pages/nuevo-servicio.html` copiando template
- [ ] Actualizar `<title>` en `<head>`
- [ ] Cambiar contenido del hero
- [ ] Modificar service-intro
- [ ] Actualizar los 6 service-item del grid
- [ ] Cambiar los 4 process-step
- [ ] Agregar enlace en `index.html` footer
- [ ] Agregar enlace en todas las páginas existentes (footer)

### 5. Actualizar footer en todas las páginas
**Ubicación:** Footer de cada archivo HTML

**Método rápido con PowerShell:**
```powershell
# Buscar un texto específico en todos los HTML
Get-ChildItem -Path "pages/*.html" | Select-String "texto a buscar"

# Reemplazar en todos los archivos
Get-ChildItem -Path "pages/*.html" | ForEach-Object {
    (Get-Content $_.FullName) -replace 'texto viejo', 'texto nuevo' | 
    Set-Content $_.FullName
}
```

## 🚨 Errores Comunes y Soluciones

### Error: Imagen no se muestra
**Causa:** Ruta incorrecta
**Solución:** 
- Desde `index.html`: `img/nombre.jpg`
- Desde `pages/*.html`: `../img/nombre.jpg`
- Verificar mayúsculas/minúsculas (importante en servers Linux)

### Error: CSS no se aplica
**Causa:** Ruta incorrecta o cache del navegador
**Solución:**
1. Verificar ruta en `<head>`: `href="../css/style.css"`
2. Limpiar cache: Ctrl+F5 en navegador
3. Agregar versión: `style.css?v=3`

### Error: Enlace roto entre páginas
**Causa:** Referencia incorrecta después de reorganización
**Solución:**
- Entre páginas mismo nivel: `href="otra-pagina.html"`
- A index desde pages: `href="../index.html"`
- A sección en index: `href="../index.html#servicios"`

### Error: JavaScript no funciona
**Causa:** Ruta incorrecta a script.js
**Solución:**
- Desde index: `<script src="js/script.js"></script>`
- Desde pages: `<script src="../js/script.js"></script>`
- Verificar en Consola del navegador (F12)

## 📋 Checklist de Deploy

Antes de subir a producción:

- [ ] Verificar que `index.html` esté en raíz
- [ ] Comprobar todos los enlaces funcionan
- [ ] Probar en diferentes navegadores
- [ ] Verificar responsive en móvil
- [ ] Optimizar imágenes (compresión)
- [ ] Validar HTML (W3C Validator)
- [ ] Comprobar que no hay enlaces rotos
- [ ] Verificar meta tags y SEO
- [ ] Probar formulario de contacto
- [ ] Limpiar archivos innecesarios (.backup, .old)

## 🔄 Workflow de Actualización

1. **Desarrollo local**
   - Editar archivos
   - Probar en navegador local
   - Verificar responsive

2. **Testing**
   - Probar todos los enlaces
   - Verificar en diferentes navegadores
   - Revisar consola de errores (F12)

3. **Commit y Deploy**
   - Git add/commit
   - Push a repositorio
   - Verificar en producción

## 📞 Recursos de Ayuda

- **HTML:** https://developer.mozilla.org/es/docs/Web/HTML
- **CSS:** https://developer.mozilla.org/es/docs/Web/CSS
- **JavaScript:** https://developer.mozilla.org/es/docs/Web/JavaScript
- **W3C Validator:** https://validator.w3.org/
- **Google Fonts:** https://fonts.google.com/

---

**Nota:** Este documento debe actualizarse cada vez que se haga un cambio estructural importante al proyecto.

Última actualización: Enero 2026
