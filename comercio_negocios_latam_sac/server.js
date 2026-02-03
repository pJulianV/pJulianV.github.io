import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import contactRouter from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';
import aiChatProxy from './services/aiChatProxy.js';

// Para usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS - permitir todos los orígenes para mismo dominio
app.use(cors({
  origin: true, // Permite cualquier origen (incluyendo mismo dominio)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: false, // Desactivar para permitir inline scripts
  crossOriginEmbedderPolicy: false
}));


// Servir archivos estáticos desde dist/ en producción
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));


// Middleware para servir cualquier HTML directamente (soporta rutas limpias y con .html)
app.get(['/', '/index', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir páginas HTML en /pages y /en/pages
app.get(['/pages/:file', '/pages/:file.html'], (req, res, next) => {
  const file = req.params.file.replace('.html', '');
  const htmlPath = path.join(__dirname, 'pages', `${file}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  next();
});
app.get(['/en/pages/:file', '/en/pages/:file.html'], (req, res, next) => {
  const file = req.params.file.replace('.html', '');
  const htmlPath = path.join(__dirname, 'en', 'pages', `${file}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  next();
});

// Fallback: si la ruta no es API ni asset, devolver index.html (SPA)
app.get(/^\/(?!api|js|css|img|services|utils|tests|scripts|middleware|routes|logs|docs|en|robots\.txt|sitemap\.xml|manifest\.json|sw\.js|offline\.html|favicon\.ico).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Rate limiting específico para formularios - máximo 5 envíos por hora
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Has alcanzado el límite de envíos. Intenta nuevamente en 1 hora'
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz para servir la interfaz normal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas
// Ruta para la API (opcional, si quieres mantenerla)
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Backend API - Comercio y Negocios Latam SAC',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: 'POST /api/contact'
    }
  });
});
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas de contacto
app.use('/api/contact', contactLimiter, contactRouter);

// Ruta para el proxy seguro de AI
app.use('/api/ai-chat', aiChatProxy);

// ...existing code...


// Manejo de rutas no encontradas para API y archivos
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ 
      error: 'Ruta no encontrada',
      path: req.originalUrl 
    });
  }
  // Para todo lo demás, fallback a index.html (SPA)
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de errores global
app.use(errorHandler);

// Iniciar servidor
const PORT_TO_USE = process.env.PORT || PORT;
app.listen(PORT_TO_USE, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT_TO_USE}`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER || 'No configurado'}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📌 Endpoints disponibles:`);
  console.log(`   GET  /api/health - Estado del servidor`);
  console.log(`   POST /api/contact - Enviar formulario de contacto`);
});

export default app;
