# Comercio y Negocios Latam SAC - Website

Sitio web corporativo para Comercio y Negocios Latam SAC, empresa de consultoría especializada en desarrollo comercial y expansión internacional en América Latina.

## � Backend API - NUEVO

Este proyecto ahora incluye un backend completo con:

- ✅ API REST con Express.js
- ✅ Sistema de envío de emails (Nodemailer)
- ✅ Validación de formularios (frontend + backend)
- ✅ Rate limiting y seguridad (Helmet, CORS)
- ✅ Documentación completa de API

### Inicio Rápido del Backend

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
copy .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Probar
# Abrir: http://localhost:3000/api/health
```

📖 **Documentación completa:** Ver [docs/QUICKSTART.md](./docs/QUICKSTART.md) y [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

---

## �📁 Estructura del Proyecto

```
comercio_negocios_latam_sac/
├── index.html                 # Página principal (landing page)
├── README.md                  # Este archivo
├── css/                       # Hojas de estilo
│   ├── style.css             # Estilos principales del sitio
│   └── style.css.backup      # Respaldo de estilos anteriores
├── js/                        # Scripts JavaScript
│   └── script.js             # Funcionalidad principal (animaciones, observers)
├── img/                       # Imágenes y recursos visuales
│   ├── logoAclaradoAcorta.png
│   ├── Icon.jpeg
│   ├── SanIsidroLima.jpg
│   ├── propuesta.jpg
│   ├── DesarrolloNeg.jpg
│   ├── InteligenciaComercial.jpg
│   ├── ExpancionIntern.jpg
│   ├── Consultoria.jpg
│   └── Gestion.jpg
├── pages/                     # Páginas HTML secundarias
│   ├── nosotros.html         # Sobre la empresa
│   ├── contacto.html         # Formulario de contacto
│   ├── desarrollo-negocios.html        # Servicio: Business Development
│   ├── inteligencia-comercial.html     # Servicio: Market Intelligence
│   ├── expansion-internacional.html    # Servicio: Internacionalización
│   ├── consultoria-estrategica.html    # Servicio: Strategic Consulting
│   ├── gestion-proyectos.html          # Servicio: Project Management
│   ├── sectores.html         # Industrias atendidas
│   ├── insights.html         # Blog, eventos, noticias
│   ├── casos-exito.html      # Casos de éxito con métricas
│   ├── equipo.html           # Equipo profesional
│   ├── carreras.html         # Oportunidades laborales
│   └── ubicacion.html        # Oficinas y contacto
├── docs/                      # Documentación adicional del proyecto
└── ejemplos/                  # Referencias de diseño y ejemplos

```

## 📄 Páginas del Sitio

### 🏠 Principal
- **index.html** - Landing page con hero section, propuesta de valor y Core de la Marca (5 servicios principales)

### 🏢 Páginas Institucionales
- **nosotros.html** - Historia de la empresa, misión, visión, valores corporativos, sectores atendidos
- **equipo.html** - Perfiles del equipo de liderazgo (3 partners) y consultores senior (6 consultores)
- **carreras.html** - 6 posiciones abiertas, programa de prácticas, beneficios y cultura organizacional
- **ubicacion.html** - Oficinas en Lima (principal), Bogotá y Santiago con mapas y datos de contacto
- **contacto.html** - Formulario de contacto, horarios de atención, información de oficinas

### 💼 Páginas de Servicios (Core de la Marca)
- **desarrollo-negocios.html** - Business Development estratégico, identificación de oportunidades
- **inteligencia-comercial.html** - Investigación de mercados, análisis competitivo, Business Intelligence
- **expansion-internacional.html** - Estrategias de entrada a mercados internacionales, compliance
- **consultoria-estrategica.html** - Asesoramiento comercial, transformación, optimización de procesos
- **gestion-proyectos.html** - PMO Comercial, gestión integral de proyectos empresariales

### 📚 Páginas de Recursos
- **sectores.html** - 5 sectores industriales: Tecnología, Manufactura, Retail, Servicios, Exportación
- **insights.html** - Hub de contenido con Blog (6 artículos), Eventos (4 próximos), Noticias (6 notas)
- **casos-exito.html** - 6 casos de éxito detallados con métricas, resultados y testimonios de clientes

## 🎨 Diseño y Tecnologías

### Tecnologías Utilizadas
- **HTML5** - Estructura semántica moderna
- **CSS3** - Estilos personalizados con Grid, Flexbox, animaciones
- **JavaScript (Vanilla)** - Intersection Observer API para animaciones on-scroll
- **Google Fonts** - Tipografía Poppins (pesos: 300, 400, 500, 600, 700)

### Paleta de Colores
- **Azul Corporativo**: `#002156` - Header, navegación
- **Azul Oscuro**: `#002a6e` - Títulos de sección, botones principales
- **Dorado/Gold**: `#c19e5c` - Acentos, highlights, hover states, taglines
- **Blanco**: `#fff` - Backgrounds principales, texto en dark backgrounds
- **Gris Claro**: `#f5f5f5`, `#f9f9f9` - Backgrounds alternos, tarjetas
- **Gris Texto**: `#555`, `#888`, `#222` - Jerarquía de texto

### Diseño Responsivo
- **Desktop**: 1600px max-width para contenedores principales
- **Tablet**: Breakpoint a 1024px (2 columnas en grids)
- **Mobile**: Breakpoint a 768px (1 columna, navegación vertical)

## ✨ Características Principales

### UX/UI
- ✅ Diseño responsivo mobile-first
- ✅ Animaciones suaves con Intersection Observer
- ✅ Hover effects en tarjetas, botones y enlaces
- ✅ Navegación sticky header
- ✅ Footer extenso con 5 columnas de enlaces
- ✅ Transiciones de 0.3s en elementos interactivos

### SEO y Accesibilidad
- ✅ Meta tags apropiados en cada página
- ✅ Estructura semántica HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Alt text descriptivos en todas las imágenes
- ✅ Aria-labels en enlaces de iconos
- ✅ Contraste de colores WCAG AA compliant

### Performance
- ✅ CSS y JS externos para mejor caching
- ✅ Imágenes optimizadas en carpeta centralizada
- ✅ Lazy loading con Intersection Observer
- ✅ Sin dependencias de frameworks pesados

## 🛠️ Cómo Editar el Sitio

### Actualizar Contenido de Texto
1. Abrir el archivo HTML correspondiente en `pages/`
2. Localizar el contenido a editar (usar búsqueda Ctrl+F)
3. Modificar el texto directamente en los tags HTML
4. Guardar y refrescar en navegador

### Cambiar Imágenes
1. Agregar nueva imagen a la carpeta `img/`
2. Actualizar el `src` en el HTML correspondiente
3. Formato recomendado: JPG para fotos, PNG para logos/iconos
4. Mantener nombres descriptivos (ej: `oficina-lima.jpg`)

### Agregar Nueva Página
1. Crear nuevo archivo HTML en `pages/`
2. Copiar estructura de una página existente similar
3. Actualizar referencias relativas:
   - CSS: `href="../css/style.css"`
   - JS: `src="../js/script.js"`
   - Imágenes: `src="../img/..."`
   - Index: `href="../index.html"`
4. Agregar enlaces en footer de TODAS las páginas
5. Agregar enlace en index.html si corresponde

### Modificar Estilos Globales
- Archivo principal: `css/style.css`
- Buscar la sección correspondiente (comentada en el CSS)
- Clases reutilizables principales:
  - `.service-hero` - Hero banners de páginas internas
  - `.service-grid` - Grid de 6 items (servicios, features)
  - `.process-steps` - Steps numerados (metodologías)
  - `.service-cta` - Call-to-action sections
  - `.core-card` - Tarjetas del Core de la Marca

### Actualizar Navegación
Header (todas las páginas):
```html
<li><a href="../index.html#inicio">Inicio</a></li>
<li><a href="nosotros.html">Nosotros</a></li>
<li><a href="../index.html#servicios">Servicios</a></li>
<li><a href="contacto.html">Contáctanos</a></li>
```

Footer (5 columnas):
- Soluciones (5 servicios)
- Sectores (5 industrias)
- Recursos (insights, casos, blog)
- Empresa (nosotros, equipo, carreras, ubicación)
- Contáctanos (datos de contacto y redes sociales)

## 📐 Convenciones de Código

### HTML
- Indentación: 2 espacios
- Atributos con comillas dobles `""`
- Clases en kebab-case: `service-hero`, `core-card-link`
- IDs para anchors: `#tecnologia`, `#blog`, `#eventos`
- Comentarios para secciones: `<!-- Sección Hero -->`

### CSS
- Mobile-first approach (media queries al final)
- Selectores específicos sobre `!important`
- Transiciones consistentes: `transition: all 0.3s ease`
- Colores con valores hex directos (no variables CSS por ahora)
- Comentarios para cada sección principal

### JavaScript
- Vanilla JS (sin jQuery, sin frameworks)
- Comentarios descriptivos en funciones
- `const` y `let` (no `var`)
- Código modular y reutilizable

## 🚀 Deploy

### Para GitHub Pages
1. Asegurar que `index.html` esté en la raíz del repositorio
2. Settings → Pages → Source: main branch, / (root)
3. Esperar deploy (2-3 minutos)
4. Acceder via `https://usuario.github.io/repositorio/`

### Para Hosting Tradicional
1. Subir toda la carpeta via FTP/SFTP
2. Asegurar que `index.html` esté en la raíz del dominio
3. Verificar permisos de archivos (644 para archivos, 755 para carpetas)
4. Configurar `.htaccess` si se requiere (redirects, SEO)

## 📞 Información de Contacto

**Comercio y Negocios Latam SAC**
- **Email:** info@comercionegocioslatam.com
- **Teléfono:** +51 1 234 5678
- **Ubicación:** Av. República de Panamá 3591, Piso 10, San Isidro, Lima 27, Perú
- **Oficinas Regionales:** Bogotá (Colombia), Santiago (Chile)

---

### 📝 Última Actualización
Enero 2026 - Estructura reorganizada en carpetas `css/`, `js/`, `pages/`

**Una empresa del Grupo CASNU**
