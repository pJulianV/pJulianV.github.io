import request from 'supertest';
import express from 'express';
import contactRouter from '../../../routes/contact.js';
import * as emailService from '../../../services/emailService.js';
import { jest } from '@jest/globals';

// Mock del email service
jest.unstable_mockModule('../../../services/emailService.js', () => ({
  sendContactEmail: jest.fn(),
}));

describe('Contact Route', () => {
  let app;

  beforeEach(() => {
    // Crear app de Express para tests
    app = express();
    app.use(express.json());
    app.use('/api/contact', contactRouter);

    // Limpiar mocks
    jest.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    const validFormData = {
      nombre: 'Juan Pérez',
      empresa: 'Test Company SAC',
      email: 'juan@test.com',
      telefono: '+51 999 888 777',
      mensaje: 'Este es un mensaje de prueba con más de 10 caracteres',
    };

    test('debe enviar formulario correctamente con datos válidos', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const response = await request(app).post('/api/contact').send(validFormData).expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
      });

      expect(emailService.sendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: validFormData.nombre,
          empresa: validFormData.empresa,
          email: validFormData.email,
          telefono: validFormData.telefono,
          mensaje: validFormData.mensaje,
        })
      );
    });

    test('debe rechazar formulario sin nombre', async () => {
      const invalidData = { ...validFormData, nombre: '' };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some((e) => e.field === 'nombre')).toBe(true);
    });

    test('debe rechazar formulario sin empresa', async () => {
      const invalidData = { ...validFormData, empresa: '' };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((e) => e.field === 'empresa')).toBe(true);
    });

    test('debe rechazar email inválido', async () => {
      const invalidData = { ...validFormData, email: 'email-invalido' };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((e) => e.field === 'email')).toBe(true);
    });

    test('debe rechazar mensaje muy corto', async () => {
      const invalidData = { ...validFormData, mensaje: 'Corto' };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((e) => e.field === 'mensaje')).toBe(true);
    });

    test('debe rechazar teléfono con caracteres inválidos', async () => {
      const invalidData = { ...validFormData, telefono: 'abc123xyz' };

      const response = await request(app).post('/api/contact').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
    });

    test('debe aceptar formulario sin teléfono (campo opcional)', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);
      const dataWithoutPhone = { ...validFormData };
      delete dataWithoutPhone.telefono;

      const response = await request(app).post('/api/contact').send(dataWithoutPhone).expect(200);

      expect(response.body.success).toBe(true);
    });

    test('debe retornar error 500 si el servicio de email falla', async () => {
      emailService.sendContactEmail.mockResolvedValue(false);

      const response = await request(app).post('/api/contact').send(validFormData).expect(500);

      expect(response.body).toEqual({
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
      });
    });

    test('debe retornar error 500 si hay excepción en el servicio', async () => {
      emailService.sendContactEmail.mockRejectedValue(new Error('Service error'));

      const response = await request(app).post('/api/contact').send(validFormData).expect(500);

      expect(response.body).toEqual({
        success: false,
        message: 'Error interno del servidor. Por favor, intenta más tarde.',
      });
    });

    test('debe sanitizar y trimear los datos de entrada', async () => {
      emailService.sendContactEmail.mockResolvedValue(true);

      const dataWithSpaces = {
        ...validFormData,
        nombre: '  Juan Pérez  ',
        email: '  JUAN@TEST.COM  ',
      };

      await request(app).post('/api/contact').send(dataWithSpaces).expect(200);

      expect(emailService.sendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: 'Juan Pérez',
          email: 'juan@test.com', // normalizeEmail lowercase
        })
      );
    });
  });
});
