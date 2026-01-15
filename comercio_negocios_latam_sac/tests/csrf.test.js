/**
 * Tests para middleware de protección CSRF
 * @jest-environment node
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import {
  csrfProtection,
  getCsrfTokenEndpoint,
  createCsrfToken,
  validateCsrfToken,
} from '../middleware/csrfProtection.js';

describe('CSRF Protection Middleware', () => {
  let app;
  let csrfToken;
  let sessionId;

  beforeEach(() => {
    // Crear app de prueba
    app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(csrfProtection);

    // Ruta de prueba GET
    app.get('/api/test', (req, res) => {
      res.json({
        success: true,
        csrfToken: req.csrfToken,
        sessionId: req.sessionId,
      });
    });

    // Ruta de prueba POST
    app.post('/api/test', (req, res) => {
      res.json({ success: true, message: 'Request successful' });
    });

    // Endpoint para obtener token
    app.get('/api/csrf-token', getCsrfTokenEndpoint);
  });

  describe('Token Generation', () => {
    test('Debería generar token CSRF en GET request', async () => {
      const response = await request(app).get('/api/test').expect(200);

      expect(response.body).toHaveProperty('csrfToken');
      expect(response.body).toHaveProperty('sessionId');
      expect(typeof response.body.csrfToken).toBe('string');
      expect(response.body.csrfToken.length).toBeGreaterThan(0);
    });

    test('Debería establecer cookies con token CSRF', async () => {
      const response = await request(app).get('/api/test');

      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();

      const csrfCookie = cookies.find((c) => c.includes('csrf-token'));
      const sessionCookie = cookies.find((c) => c.includes('sessionId'));

      expect(csrfCookie).toBeDefined();
      expect(sessionCookie).toBeDefined();
    });

    test('Debería generar token en endpoint dedicado', async () => {
      const response = await request(app).get('/api/csrf-token').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('csrfToken');
    });
  });

  describe('Token Validation', () => {
    beforeEach(async () => {
      // Obtener token válido
      const response = await request(app).get('/api/test');

      const cookies = response.headers['set-cookie'];
      const csrfCookie = cookies.find((c) => c.includes('csrf-token'));
      const sessionCookie = cookies.find((c) => c.includes('sessionId'));

      csrfToken = csrfCookie.split(';')[0].split('=')[1];
      sessionId = sessionCookie.split(';')[0].split('=')[1];
    });

    test('Debería rechazar POST sin token CSRF', async () => {
      await request(app).post('/api/test').send({ data: 'test' }).expect(403);
    });

    test('Debería aceptar POST con token CSRF válido', async () => {
      await request(app)
        .post('/api/test')
        .set('Cookie', [`csrf-token=${csrfToken}`, `sessionId=${sessionId}`])
        .set('X-CSRF-Token', csrfToken)
        .send({ data: 'test' })
        .expect(200);
    });

    test('Debería rechazar POST con token inválido', async () => {
      await request(app)
        .post('/api/test')
        .set('Cookie', [`csrf-token=${csrfToken}`, `sessionId=${sessionId}`])
        .set('X-CSRF-Token', 'invalid-token')
        .send({ data: 'test' })
        .expect(403);
    });

    test('Debería rechazar POST con sessionId incorrecto', async () => {
      await request(app)
        .post('/api/test')
        .set('Cookie', [`csrf-token=${csrfToken}`, `sessionId=wrong-session`])
        .set('X-CSRF-Token', csrfToken)
        .send({ data: 'test' })
        .expect(403);
    });
  });

  describe('Token Functions', () => {
    test('createCsrfToken debería generar token válido', () => {
      const sessionId = 'test-session-123';
      const token = createCsrfToken(sessionId);

      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('validateCsrfToken debería validar token correcto', () => {
      const sessionId = 'test-session-456';
      const token = createCsrfToken(sessionId);

      const isValid = validateCsrfToken(token, sessionId);
      expect(isValid).toBe(true);
    });

    test('validateCsrfToken debería rechazar token con sessionId incorrecto', () => {
      const sessionId = 'test-session-789';
      const token = createCsrfToken(sessionId);

      const isValid = validateCsrfToken(token, 'wrong-session');
      expect(isValid).toBe(false);
    });

    test('validateCsrfToken debería rechazar token usado (one-time use)', () => {
      const sessionId = 'test-session-onetime';
      const token = createCsrfToken(sessionId);

      // Primer uso - debería ser válido
      const firstUse = validateCsrfToken(token, sessionId);
      expect(firstUse).toBe(true);

      // Segundo uso - debería ser inválido
      const secondUse = validateCsrfToken(token, sessionId);
      expect(secondUse).toBe(false);
    });

    test('validateCsrfToken debería rechazar valores vacíos', () => {
      expect(validateCsrfToken('', 'session')).toBe(false);
      expect(validateCsrfToken('token', '')).toBe(false);
      expect(validateCsrfToken(null, 'session')).toBe(false);
      expect(validateCsrfToken('token', null)).toBe(false);
    });
  });

  describe('Cookie Security', () => {
    test('Cookies deberían tener flags de seguridad en producción', async () => {
      // Simular entorno de producción
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const response = await request(app).get('/api/test');
      const cookies = response.headers['set-cookie'];

      const csrfCookie = cookies.find((c) => c.includes('csrf-token'));
      const sessionCookie = cookies.find((c) => c.includes('sessionId'));

      expect(csrfCookie).toContain('SameSite=Strict');
      expect(sessionCookie).toContain('HttpOnly');
      expect(sessionCookie).toContain('SameSite=Strict');

      // Restaurar entorno
      process.env.NODE_ENV = originalEnv;
    });
  });
});
