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

// Servir archivos estáticos (Frontend)
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Middleware para URLs limpias - servir .html sin extensión
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1 && req.path !== '/') {
    // Si la ruta comienza con /pages/, remover el prefijo
    const cleanPath = req.path.startsWith('/pages/') ? req.path.substring(7) : req.path;
    const htmlPath = path.join(__dirname, 'pages', cleanPath + '.html');
    if (fs.existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }
    // También intentar sin el prefijo pages/
    const rootHtmlPath = path.join(__dirname, req.path + '.html');
    if (fs.existsSync(rootHtmlPath)) {
      return res.sendFile(rootHtmlPath);
    }
  }
  next();
});

// Rate limiting - máximo 100 requests por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, intente nuevamente más tarde'
});

app.use(limiter);

// Rate limiting específico para formularios - máximo 5 envíos por hora
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Has alcanzado el límite de envíos. Intenta nuevamente en 1 hora'
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
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

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas de contacto
app.use('/api/contact', contactLimiter, contactRouter);

// Servir página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl 
  });
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
