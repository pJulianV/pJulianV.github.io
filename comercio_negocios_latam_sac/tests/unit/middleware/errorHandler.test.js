import { errorHandler } from '../../../middleware/errorHandler.js';
import { jest } from '@jest/globals';

describe('Error Handler Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();

    // Mock console.error para evitar logs en tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('debe manejar errores de validación con status 400', () => {
    const validationError = {
      name: 'ValidationError',
      errors: {
        field1: { message: 'Error en campo 1' },
        field2: { message: 'Error en campo 2' },
      },
    };

    errorHandler(validationError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error de validación',
      errors: ['Error en campo 1', 'Error en campo 2'],
    });
  });

  test('debe manejar errores de CORS con status 403', () => {
    const corsError = {
      message: 'No permitido por CORS',
    };

    errorHandler(corsError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Acceso denegado - CORS',
    });
  });

  test('debe manejar errores genéricos con status 500 en producción', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const genericError = new Error('Error de prueba');

    errorHandler(genericError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
    });

    process.env.NODE_ENV = originalEnv;
  });

  test('debe incluir stack trace en modo desarrollo', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const genericError = new Error('Error de prueba');
    genericError.stack = 'Stack trace de prueba';

    errorHandler(genericError, mockReq, mockRes, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Error de prueba',
        stack: 'Stack trace de prueba',
      })
    );

    process.env.NODE_ENV = originalEnv;
  });

  test('debe usar status personalizado si está presente en el error', () => {
    const customError = new Error('Error personalizado');
    customError.status = 404;

    errorHandler(customError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  test('debe llamar a console.error con el error', () => {
    const error = new Error('Test error');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(console.error).toHaveBeenCalledWith('Error:', error);
  });
});
