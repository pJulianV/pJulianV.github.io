import { sendContactEmail } from '../../../services/emailService.js';
import { Resend } from 'resend';
import { jest } from '@jest/globals';

// Mock de Resend
jest.unstable_mockModule('resend', () => ({
  Resend: jest.fn(),
}));

describe('EmailService', () => {
  let mockResendInstance;

  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();

    // Mock de la instancia de Resend
    mockResendInstance = {
      emails: {
        send: jest.fn(),
      },
    };

    // Mock del constructor de Resend
    Resend.mockImplementation(() => mockResendInstance);

    // Variables de entorno para tests
    process.env.RESEND_API_KEY = 'test_api_key';
    process.env.EMAIL_TO = 'test@example.com';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendContactEmail', () => {
    const mockFormData = {
      nombre: 'Juan Pérez',
      empresa: 'Test Company',
      email: 'juan@test.com',
      telefono: '+51 999 888 777',
      mensaje: 'Este es un mensaje de prueba',
      timestamp: new Date().toISOString(),
    };

    test('debe enviar email correctamente cuando todo está bien configurado', async () => {
      // Configurar mock para respuesta exitosa
      mockResendInstance.emails.send.mockResolvedValue({
        id: 'test-email-id',
        from: 'contacto@comercionegocioslatam.com',
        to: ['test@example.com'],
      });

      const result = await sendContactEmail(mockFormData);

      expect(result).toBe(true);
      expect(mockResendInstance.emails.send).toHaveBeenCalledTimes(2); // Admin + User
    });

    test('debe retornar false si RESEND_API_KEY no está configurada', async () => {
      delete process.env.RESEND_API_KEY;

      const result = await sendContactEmail(mockFormData);

      expect(result).toBe(false);
      expect(mockResendInstance.emails.send).not.toHaveBeenCalled();
    });

    test('debe manejar errores de Resend correctamente', async () => {
      mockResendInstance.emails.send.mockRejectedValue(new Error('Resend API error'));

      const result = await sendContactEmail(mockFormData);

      expect(result).toBe(false);
    });

    test('debe incluir todos los campos del formulario en el email', async () => {
      mockResendInstance.emails.send.mockResolvedValue({ id: 'test-id' });

      await sendContactEmail(mockFormData);

      const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
      expect(callArgs.html).toContain(mockFormData.nombre);
      expect(callArgs.html).toContain(mockFormData.empresa);
      expect(callArgs.html).toContain(mockFormData.email);
      expect(callArgs.html).toContain(mockFormData.telefono);
      expect(callArgs.html).toContain(mockFormData.mensaje);
    });

    test('debe usar EMAIL_TO por defecto si no está configurado', async () => {
      delete process.env.EMAIL_TO;
      mockResendInstance.emails.send.mockResolvedValue({ id: 'test-id' });

      await sendContactEmail(mockFormData);

      const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
      expect(callArgs.to).toContain('info@comercionegocioslatam.com');
    });
  });
});
