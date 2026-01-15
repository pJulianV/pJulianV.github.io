/**
 * Middleware de protección CSRF (Cross-Site Request Forgery)
 * Implementación personalizada usando crypto para generar tokens seguros
 */

import crypto from 'crypto';

// Almacenamiento de tokens en memoria (para producción usar Redis o DB)
const tokenStore = new Map();

// Configuración
const TOKEN_LENGTH = 32;
const TOKEN_EXPIRY = 1000 * 60 * 60; // 1 hora

/**
 * Generar un token CSRF seguro
 * @returns {string} Token CSRF
 */
function generateToken() {
  return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
}

/**
 * Generar y almacenar un token CSRF
 * @param {string} sessionId - ID de sesión del usuario
 * @returns {string} Token generado
 */
export function createCsrfToken(sessionId) {
  const token = generateToken();
  const expiry = Date.now() + TOKEN_EXPIRY;

  tokenStore.set(token, {
    sessionId,
    expiry,
    used: false,
  });

  // Limpiar tokens expirados
  cleanupExpiredTokens();

  return token;
}

/**
 * Validar un token CSRF
 * @param {string} token - Token a validar
 * @param {string} sessionId - ID de sesión del usuario
 * @returns {boolean} true si el token es válido
 */
export function validateCsrfToken(token, sessionId) {
  if (!token || !sessionId) {
    return false;
  }

  const tokenData = tokenStore.get(token);

  if (!tokenData) {
    return false;
  }

  // Verificar si el token expiró
  if (Date.now() > tokenData.expiry) {
    tokenStore.delete(token);
    return false;
  }

  // Verificar si el token ya fue usado
  if (tokenData.used) {
    return false;
  }

  // Verificar que el token pertenece a la sesión correcta
  if (tokenData.sessionId !== sessionId) {
    return false;
  }

  // Marcar el token como usado (one-time use)
  tokenData.used = true;

  return true;
}

/**
 * Limpiar tokens expirados del almacenamiento
 */
function cleanupExpiredTokens() {
  const now = Date.now();

  for (const [token, data] of tokenStore.entries()) {
    if (now > data.expiry || data.used) {
      tokenStore.delete(token);
    }
  }
}

/**
 * Middleware para generar token CSRF y enviarlo en cookie
 */
export function csrfTokenGenerator(req, res, next) {
  // Obtener o crear sessionId
  let sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
    });
  }

  // Generar nuevo token CSRF
  const csrfToken = createCsrfToken(sessionId);

  // Enviar token en cookie (doble submit)
  res.cookie('csrf-token', csrfToken, {
    httpOnly: false, // Necesita ser accesible por JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_EXPIRY,
  });

  // También disponible en el request
  req.csrfToken = csrfToken;
  req.sessionId = sessionId;

  next();
}

/**
 * Middleware para validar token CSRF en requests POST/PUT/DELETE
 */
export function csrfValidator(req, res, next) {
  // Solo validar en métodos de modificación
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return next();
  }

  // Obtener token del header o body
  const token = req.headers['x-csrf-token'] || req.body.csrfToken;

  // Obtener sessionId de la cookie
  const sessionId = req.cookies?.sessionId;

  if (!token || !sessionId) {
    return res.status(403).json({
      success: false,
      message: 'Token CSRF no proporcionado',
    });
  }

  // Validar token
  if (!validateCsrfToken(token, sessionId)) {
    return res.status(403).json({
      success: false,
      message: 'Token CSRF inválido o expirado',
    });
  }

  next();
}

/**
 * Middleware combinado (generar y validar)
 */
export function csrfProtection(req, res, next) {
  // Generar token para GET requests
  if (req.method === 'GET') {
    return csrfTokenGenerator(req, res, next);
  }

  // Validar token para otros métodos
  csrfValidator(req, res, next);
}

/**
 * Endpoint para obtener un nuevo token CSRF
 */
export function getCsrfTokenEndpoint(req, res) {
  let sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }

  const token = createCsrfToken(sessionId);

  res.cookie('csrf-token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_EXPIRY,
  });

  res.json({
    success: true,
    csrfToken: token,
  });
}

// Limpiar tokens expirados cada 5 minutos
setInterval(cleanupExpiredTokens, 1000 * 60 * 5);

export default {
  createCsrfToken,
  validateCsrfToken,
  csrfTokenGenerator,
  csrfValidator,
  csrfProtection,
  getCsrfTokenEndpoint,
};
