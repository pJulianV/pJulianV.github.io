# Sistema de Traducción Multiidioma (i18n)

## 🌍 **Características**

- ✅ **100% Gratis** - Sin costos, sin límites
- ✅ **Detección automática** del idioma del navegador
- ✅ **Selector visual** en el header
- ✅ **Persistencia** - Recuerda la preferencia del usuario
- ✅ **Idiomas soportados**: Español (ES) e Inglés (EN)
- ✅ **Expandible** - Fácil agregar más idiomas

## 📁 **Estructura de Archivos**

```
js/
├── i18n.js                    # Motor de traducción
├── translations/
    ├── es.json                # Traducciones en español
    └── en.json                # Traducciones en inglés
```

## 🚀 **Cómo Usar**

### 1. **Agregar el script en HTML**

```html
<!-- Antes del cierre de </body> -->
<script src="js/i18n.js"></script>
<script src="js/script.js"></script>
```

### 2. **Agregar selector de idioma en el header**

```html
<nav>
  <ul>
    <li><a href="#inicio" data-i18n="header.menu.home">Inicio</a></li>
    <!-- ... más elementos del menú ... -->
  </ul>
  <div class="language-selector-wrapper">
    <select id="language-selector" class="language-selector">
      <option value="es">🇪🇸 Español</option>
      <option value="en">🇺🇸 English</option>
    </select>
  </div>
</nav>
```

### 3. **Marcar textos para traducir**

Usa el atributo `data-i18n` con la clave de traducción:

```html
<!-- Texto simple -->
<h1 data-i18n="hero.title">Desarrollo de Negocios</h1>

<!-- Botón -->
<button data-i18n="common.contactUs">Contáctanos</button>

<!-- Atributos especiales -->
<img data-i18n-alt="header.logoAlt" src="logo.png" alt="Logo">
<input data-i18n="common.searchPlaceholder" placeholder="Buscar...">
```

### 4. **Agregar traducciones en JSON**

**es.json:**
```json
{
  "hero": {
    "title": "Desarrollo de Negocios"
  },
  "common": {
    "contactUs": "Contáctanos"
  }
}
```

**en.json:**
```json
{
  "hero": {
    "title": "Business Development"
  },
  "common": {
    "contactUs": "Contact Us"
  }
}
```

## 🎨 **CSS del Selector**

Ya está incluido en `style.css`:
- Diseño consistente con el header azul
- Hover effects profesionales
- Responsive

## 🔧 **Funcionalidades Avanzadas**

### Detección Automática
El sistema detecta automáticamente:
1. Idioma guardado en `localStorage`
2. Idioma del navegador (navigator.language)
3. Por defecto: Español

### Claves Anidadas
Soporta claves anidadas para mejor organización:
```
"header.menu.home" → header > menu > home
```

### Cambio Dinámico
El usuario puede cambiar de idioma en cualquier momento usando el selector.

## 📝 **Agregar Más Idiomas**

1. Crear archivo `js/translations/pt.json` (ejemplo: portugués)
2. Agregar opción al selector:
```html
<option value="pt">🇧🇷 Português</option>
```
3. El sistema lo detectará automáticamente

## ⚡ **Ventajas de Esta Solución**

✅ **Sin dependencias externas** - JavaScript puro  
✅ **Sin costos** - 100% gratis, sin límites  
✅ **Control total** - Traducciones personalizadas  
✅ **SEO friendly** - Contenido traducido en el mismo dominio  
✅ **Rápido** - Sin llamadas a APIs externas  
✅ **Offline** - Funciona sin internet  

## 🚫 **Limitaciones**

- ❌ No traduce contenido dinámico inyectado después de cargar
- ❌ Requiere traducir cada texto manualmente
- ❌ No detecta ubicación por IP (solo idioma del navegador)

## 🔄 **Próximos Pasos Recomendados**

1. **Traducir todas las páginas**: Agregar `data-i18n` a todos los textos
2. **Expandir traducciones**: Completar archivos es.json y en.json
3. **Agregar más idiomas**: Portugués, francés, etc.
4. **Testing**: Probar en diferentes navegadores e idiomas

## 📞 **Soporte**

Para dudas o problemas, revisar el código en `js/i18n.js`
