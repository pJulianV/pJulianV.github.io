import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Formato personalizado para logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Formato para consola (más legible)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Transport para logs de aplicación (info, warn, error)
const fileTransport = new DailyRotateFile({
  filename: path.join(__dirname, '..', 'logs', 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
  format: customFormat,
});

// Transport para logs de errores
const errorTransport = new DailyRotateFile({
  filename: path.join(__dirname, '..', 'logs', 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error',
  format: customFormat,
});

// Transport para logs de auditoría (eventos sensibles)
const auditTransport = new DailyRotateFile({
  filename: path.join(__dirname, '..', 'logs', 'audit-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '90d', // Mantener 90 días para auditoría
  level: 'info',
  format: customFormat,
});

// Configuración del logger principal
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  transports: [fileTransport, errorTransport],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(__dirname, '..', 'logs', 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(__dirname, '..', 'logs', 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

// Agregar consola en desarrollo
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Logger de auditoría separado
const auditLogger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [auditTransport],
});

/**
 * Registrar evento de auditoría
 * @param {string} action - Acción realizada
 * @param {Object} data - Datos del evento
 */
export const logAudit = (action, data = {}) => {
  auditLogger.info(action, {
    timestamp: new Date().toISOString(),
    ...data,
  });
};

/**
 * Registrar acceso a recursos sensibles
 * @param {Object} req - Request object
 * @param {string} resource - Recurso accedido
 */
export const logAccess = (req, resource) => {
  logAudit('ACCESS', {
    resource,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    method: req.method,
    url: req.originalUrl,
  });
};

/**
 * Registrar envío de formulario de contacto
 * @param {Object} data - Datos del formulario
 * @param {boolean} success - Si fue exitoso
 */
export const logContactSubmission = (data, success) => {
  logAudit('CONTACT_FORM_SUBMISSION', {
    success,
    email: data.email,
    empresa: data.empresa,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Registrar intento de acceso no autorizado
 * @param {Object} req - Request object
 * @param {string} reason - Razón del rechazo
 */
export const logUnauthorizedAccess = (req, reason) => {
  logAudit('UNAUTHORIZED_ACCESS', {
    reason,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    method: req.method,
    url: req.originalUrl,
  });
};

/**
 * Registrar error de validación
 * @param {Object} req - Request object
 * @param {Array} errors - Errores de validación
 */
export const logValidationError = (req, errors) => {
  logger.warn('Validation error', {
    ip: req.ip,
    url: req.originalUrl,
    errors: errors.map((e) => ({ field: e.path, message: e.msg })),
  });
};

/**
 * Middleware de logging para Express
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log cuando la respuesta termine
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
    };

    if (res.statusCode >= 500) {
      logger.error('Server error', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('Client error', logData);
    } else {
      logger.info('Request', logData);
    }
  });

  next();
};

export default logger;
