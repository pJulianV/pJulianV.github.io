/**
 * Tests para sanitización frontend
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// Mock de DOMPurify
global.DOMPurify = {
  sanitize: (input, config) => {
    // Implementación simplificada para tests
    if (config?.ALLOWED_TAGS?.length === 0) {
      // Remover todos los tags HTML
      return input.replace(/<[^>]*>/g, '');
    }
    return input;
  },
};

// Importar después del mock
const {
  sanitizeText,
  sanitizeHTML,
  sanitizeURL,
  sanitizeEmail,
  sanitizePhone,
  sanitizeContactForm,
} = await import('../js/sanitizer.js');

describe('Sanitization Functions', () => {
  describe('sanitizeText', () => {
    test('Debería remover tags HTML', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeText(input);
      expect(result).not.toContain('<script>');
      expect(result).toBe('Hello');
    });

    test('Debería manejar strings vacíos', () => {
      expect(sanitizeText('')).toBe('');
    });

    test('Debería manejar valores no-string', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
      expect(sanitizeText(123)).toBe('');
    });

    test('Debería preservar texto normal', () => {
      const input = 'Hello World';
      expect(sanitizeText(input)).toBe('Hello World');
    });
  });

  describe('sanitizeEmail', () => {
    test('Debería validar y sanitizar emails válidos', () => {
      const valid = 'test@example.com';
      expect(sanitizeEmail(valid)).toBe('test@example.com');
    });

    test('Debería rechazar emails inválidos', () => {
      expect(sanitizeEmail('not-an-email')).toBe('');
      expect(sanitizeEmail('test@')).toBe('');
      expect(sanitizeEmail('@example.com')).toBe('');
    });

    test('Debería convertir a minúsculas', () => {
      expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    });

    test('Debería remover espacios', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    test('Debería rechazar emails con scripts', () => {
      expect(sanitizeEmail('<script>test@example.com')).toBe('');
    });
  });

  describe('sanitizePhone', () => {
    test('Debería permitir números y símbolos válidos', () => {
      expect(sanitizePhone('+1 (555) 123-4567')).toBe('+1 (555) 123-4567');
      expect(sanitizePhone('555-1234')).toBe('555-1234');
    });

    test('Debería remover caracteres inválidos', () => {
      expect(sanitizePhone('555<script>1234')).toBe('5551234');
      expect(sanitizePhone('555abc1234')).toBe('5551234');
    });

    test('Debería manejar strings vacíos', () => {
      expect(sanitizePhone('')).toBe('');
    });
  });

  describe('sanitizeURL', () => {
    test('Debería permitir URLs HTTPS válidas', () => {
      const url = 'https://example.com';
      expect(sanitizeURL(url)).toBe(url);
    });

    test('Debería permitir URLs HTTP', () => {
      const url = 'http://example.com';
      expect(sanitizeURL(url)).toBe(url);
    });

    test('Debería permitir mailto:', () => {
      const url = 'mailto:test@example.com';
      expect(sanitizeURL(url)).toBe(url);
    });

    test('Debería rechazar protocolos peligrosos', () => {
      expect(sanitizeURL('javascript:alert(1)')).toBe('');
      expect(sanitizeURL('data:text/html,<script>alert(1)</script>')).toBe('');
    });

    test('Debería rechazar URLs inválidas', () => {
      expect(sanitizeURL('not a url')).toBe('');
      expect(sanitizeURL('')).toBe('');
    });
  });

  describe('sanitizeContactForm', () => {
    test('Debería sanitizar todos los campos del formulario', () => {
      const formData = {
        nombre: '<script>John</script>',
        empresa: 'Company<img>',
        email: '  TEST@EXAMPLE.COM  ',
        telefono: '+1-555-abc-1234',
        mensaje: 'Hello<script>alert(1)</script>World',
      };

      const result = sanitizeContactForm(formData);

      expect(result.nombre).toBe('John');
      expect(result.empresa).toBe('Company');
      expect(result.email).toBe('test@example.com');
      expect(result.telefono).toBe('+1-555--1234');
      expect(result.mensaje).toBe('HelloWorld');
    });

    test('Debería manejar datos incompletos', () => {
      const result = sanitizeContactForm({});

      expect(result.nombre).toBe('');
      expect(result.empresa).toBe('');
      expect(result.email).toBe('');
      expect(result.telefono).toBe('');
      expect(result.mensaje).toBe('');
    });

    test('Debería preservar datos válidos', () => {
      const formData = {
        nombre: 'John Doe',
        empresa: 'ACME Corp',
        email: 'john@example.com',
        telefono: '+1-555-1234',
        mensaje: 'Hello, I need help with...',
      };

      const result = sanitizeContactForm(formData);

      expect(result.nombre).toBe('John Doe');
      expect(result.empresa).toBe('ACME Corp');
      expect(result.email).toBe('john@example.com');
      expect(result.telefono).toBe('+1-555-1234');
      expect(result.mensaje).toBe('Hello, I need help with...');
    });
  });

  describe('XSS Attack Prevention', () => {
    test('Debería prevenir XSS básico', () => {
      const xss = '<script>alert("XSS")</script>';
      expect(sanitizeText(xss)).toBe('');
    });

    test('Debería prevenir XSS con event handlers', () => {
      const xss = '<img src=x onerror="alert(1)">';
      expect(sanitizeText(xss)).toBe('');
    });

    test('Debería prevenir XSS en URLs', () => {
      expect(sanitizeURL('javascript:alert(1)')).toBe('');
    });

    test('Debería prevenir XSS en formulario completo', () => {
      const maliciousData = {
        nombre: '<script>steal()</script>',
        empresa: '<img src=x onerror=alert(1)>',
        email: 'user@example.com',
        telefono: '555-1234',
        mensaje: '<iframe src="evil.com"></iframe>',
      };

      const result = sanitizeContactForm(maliciousData);

      expect(result.nombre).not.toContain('<script>');
      expect(result.empresa).not.toContain('<img');
      expect(result.mensaje).not.toContain('<iframe');
    });
  });
});
