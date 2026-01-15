import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRouter from '../../routes/contact.js';
import { errorHandler } from '../../middleware/errorHandler.js';
import * as emailService from '../../services/emailService.js';
import { jest } from '@jest/globals';

// Mock del email service
jest.unstable_mockModule('../../services/emailService.js', () => ({
  sendContactEmail: jest.fn(),
}));

describe('API Integration Tests', () => {
  let app;

  beforeAll(() => {
    // Crear app similar a la del servidor
    app = express();

    // Middleware
    app.use(cors());
    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/api/contact', contactRouter);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Error handler
    app.use(errorHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check', () => {
    test('GET /api/health debe retornar status OK', async () => {
      const response = await request(app).get('/api/health').expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Contact Form Flow', () => {
    test('Flujo completo de envío de formulario exitoso', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const formData = {
        nombre: 'Carlos Rodríguez',
        empresa: 'Innovación Tech SAC',
        email: 'carlos@innovacion.com',
        telefono: '+51 987 654 321',
        mensaje:
          'Estoy interesado en sus servicios de consultoría estratégica. Me gustaría agendar una reunión.',
      };

      const response = await request(app)
        .post('/api/contact')
        .send(formData)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
      });

      // Verificar que se llamó al servicio de email
      expect(emailService.sendContactEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: formData.nombre,
          empresa: formData.empresa,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
          timestamp: expect.any(String),
        })
      );
    });

    test('Debe manejar múltiples errores de validación', async () => {
      const invalidData = {
        nombre: 'A', // Muy corto
        empresa: '', // Vacío
        email: 'email-mal-formado', // Email inválido
        mensaje: 'Corto', // Mensaje muy corto
      };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);

      // Verificar que contiene errores para múltiples campos
      const errorFields = response.body.errors.map((e) => e.field);
      expect(errorFields).toContain('nombre');
      expect(errorFields).toContain('empresa');
      expect(errorFields).toContain('email');
      expect(errorFields).toContain('mensaje');
    });

    test('Debe rechazar JSON malformado', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send('{"nombre": "Test", malformed json}')
        .set('Content-Type', 'application/json')
        .expect(400);

      // Express maneja JSON malformado automáticamente
      expect(response.status).toBe(400);
    });

    test('Debe manejar body vacío', async () => {
      const response = await request(app).post('/api/contact').send({}).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('CORS and Security Headers', () => {
    test('Debe incluir headers de CORS', async () => {
      const response = await request(app).get('/api/health');

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });

    test('Debe incluir headers de seguridad (Helmet)', async () => {
      const response = await request(app).get('/api/health');

      // Helmet agrega varios headers de seguridad
      expect(
        response.headers['x-content-type-options'] ||
          response.headers['x-frame-options'] ||
          response.headers['x-xss-protection']
      ).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('Debe manejar rutas no existentes', async () => {
      const response = await request(app).get('/api/ruta-inexistente').expect(404);

      expect(response.status).toBe(404);
    });

    test('Debe manejar errores del servidor en contact endpoint', async () => {
      emailService.sendContactEmail.mockRejectedValue(new Error('Database connection failed'));

      const validData = {
        nombre: 'Test User',
        empresa: 'Test Company',
        email: 'test@example.com',
        mensaje: 'Este es un mensaje de prueba con suficiente longitud',
      };

      const response = await request(app).post('/api/contact').send(validData).expect(500);

      expect(response.body).toEqual({
        success: false,
        message: 'Error interno del servidor. Por favor, intenta más tarde.',
      });
    });
  });

  describe('Content Type Handling', () => {
    test('Debe aceptar application/json', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const response = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'application/json')
        .send({
          nombre: 'Test',
          empresa: 'Company',
          email: 'test@test.com',
          mensaje: 'Mensaje de prueba válido',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('Debe aceptar application/x-www-form-urlencoded', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const response = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('nombre=Test&empresa=Company&email=test@test.com&mensaje=Mensaje de prueba válido')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('Rate Limiting Simulation', () => {
    test('Debe procesar múltiples requests válidos', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const formData = {
        nombre: 'Test User',
        empresa: 'Test Company',
        email: 'test@example.com',
        mensaje: 'Mensaje de prueba con longitud suficiente',
      };

      // Simular 3 requests consecutivos
      for (let i = 0; i < 3; i++) {
        const response = await request(app).post('/api/contact').send(formData);

        expect(response.status).toBe(200);
      }

      expect(emailService.sendContactEmail).toHaveBeenCalledTimes(3);
    });
  });
});
