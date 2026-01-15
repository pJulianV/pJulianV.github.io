export default {
  // Usar node como entorno de test
  testEnvironment: 'node',

  // Patrón para encontrar archivos de test
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],

  // Cobertura de código
  collectCoverageFrom: [
    'server.js',
    'routes/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
  ],

  // Umbral mínimo de cobertura
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },

  // Directorio para reportes de cobertura
  coverageDirectory: 'coverage',

  // Formatos de reporte
  coverageReporters: ['text', 'lcov', 'html'],

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Transform vacío para ES modules
  transform: {},

  // Extensiones de archivos a procesar
  moduleFileExtensions: ['js', 'json'],

  // Timeout para tests
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Clear mocks entre tests
  clearMocks: true,

  // Restore mocks entre tests
  restoreMocks: true,

  // Configuración para módulos ES
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
