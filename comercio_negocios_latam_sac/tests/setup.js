// Setup global para todos los tests
import { config } from 'dotenv';

// Cargar variables de entorno de test
config({ path: '.env.test' });

// Variables de entorno por defecto para tests
process.env.NODE_ENV = 'test';
process.env.PORT = process.env.PORT || '3001';
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 'test_api_key';
process.env.EMAIL_TO = process.env.EMAIL_TO || 'test@example.com';

// Mock de console para tests más limpios (sin jest global)
const originalConsole = global.console;
global.console = {
  ...console,
  warn: (...args) => {}, // Suprimir warnings en tests
  error: (...args) => {}, // Suprimir errors en tests
};

// Aumentar timeout para tests de integración
if (typeof jest !== 'undefined') {
  jest.setTimeout(10000);
}
