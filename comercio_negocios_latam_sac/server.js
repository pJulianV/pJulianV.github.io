import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import responseTime from 'response-time';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRouter from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';

// Para usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Compresión gzip/deflate (CRÍTICO para performance)
app.use(compression({
  level: 6, // Balance entre velocidad y compresión
  threshold: 1024, // Solo comprimir respuestas > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Response time header (para medir performance)
app.use(responseTime());

// Logging de requests (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

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

// Servir archivos estáticos con cache y extensiones automáticas
app.use(express.static(__dirname, {
  extensions: ['html', 'htm'],
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true,
  index: 'index.html'
}));

app.use('/css', express.static(path.join(__dirname, 'css'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  immutable: true
}));

app.use('/js', express.static(path.join(__dirname, 'js'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  immutable: true
}));

app.use('/img', express.static(path.join(__dirname, 'img'), {
  maxAge: process.env.NODE_ENV === 'production' ? '30d' : 0,
  immutable: true
}));

app.use('/pages', express.static(path.join(__dirname, 'pages'), {
  extensions: ['html', 'htm'],
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true
}));

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
