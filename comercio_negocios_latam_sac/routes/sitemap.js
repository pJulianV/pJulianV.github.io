import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const router = express.Router();

/**
 * Genera sitemap dinámico en XML
 * @route GET /sitemap.xml
 */
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://cynlatam.com';
  const today = new Date().toISOString().split('T')[0];

  // Rutas estáticas principales
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/pages/nosotros.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/pages/contacto.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/pages/equipo.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/pages/carreras.html', priority: '0.8', changefreq: 'weekly' },
    { url: '/pages/ubicacion.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/pages/sectores.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/pages/insights.html', priority: '0.8', changefreq: 'weekly' },
    { url: '/pages/casos-exito.html', priority: '0.8', changefreq: 'monthly' },
  ];

  // Servicios
  const servicios = [
    '/pages/desarrollo-negocios.html',
    '/pages/inteligencia-comercial.html',
    '/pages/expansion-internacional.html',
    '/pages/consultoria-estrategica.html',
    '/pages/gestion-proyectos.html',
    '/pages/asesoria-financiera.html',
  ];

  servicios.forEach((servicio) => {
    staticRoutes.push({
      url: servicio,
      priority: '0.9',
      changefreq: 'monthly',
    });
  });

  // Versión en inglés
  const englishRoutes = [
    { url: '/en/', priority: '1.0', changefreq: 'weekly' },
    { url: '/en/pages/about-us.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/en/pages/contact.html', priority: '0.9', changefreq: 'monthly' },
  ];

  // Generar XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Agregar rutas españolas
  staticRoutes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Agregar rutas inglesas
  englishRoutes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

/**
 * Genera robots.txt dinámico
 * @route GET /robots.txt
 */
router.get('/robots.txt', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');

  const robotsTxt = `# Comercio y Negocios Latam SAC
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Bloquear directorios sensibles
Disallow: /api/
Disallow: /node_modules/
Disallow: /.env
Disallow: /tests/
`;

  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

export default router;
