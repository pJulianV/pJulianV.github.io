#!/usr/bin/env node

/**
 * Script de minificación para producción
 * Minifica CSS, JS y HTML para optimizar el tamaño de los assets
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createDistFolder() {
  const distPath = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
    log('✓ Carpeta dist creada', 'green');
  }
}

function minifyCSS() {
  log('\n📦 Minificando CSS...', 'blue');

  try {
    // Minificar archivo CSS principal
    execSync('npx cleancss -o dist/css/style.min.css css/style.css', { stdio: 'inherit' });

    // Copiar estructura de carpetas
    if (!fs.existsSync('dist/css')) {
      fs.mkdirSync('dist/css', { recursive: true });
    }

    log('✓ CSS minificado correctamente', 'green');

    // Mostrar estadísticas
    const originalSize = fs.statSync('css/style.css').size;
    const minifiedSize = fs.statSync('dist/css/style.min.css').size;
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Reducción: ${reduction}%`, 'green');
  } catch (error) {
    log('✗ Error al minificar CSS', 'red');
    console.error(error);
  }
}

function minifyJS() {
  log('\n📦 Minificando JavaScript...', 'blue');

  try {
    // Crear carpeta dist/js si no existe
    if (!fs.existsSync('dist/js')) {
      fs.mkdirSync('dist/js', { recursive: true });
    }

    // Minificar script.js principal
    execSync('npx terser js/script.js -o dist/js/script.min.js --compress --mangle', {
      stdio: 'inherit',
    });

    log('✓ JavaScript minificado correctamente', 'green');

    // Mostrar estadísticas
    const originalSize = fs.statSync('js/script.js').size;
    const minifiedSize = fs.statSync('dist/js/script.min.js').size;
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Reducción: ${reduction}%`, 'green');
  } catch (error) {
    log('✗ Error al minificar JavaScript', 'red');
    console.error(error);
  }
}

function minifyHTML() {
  log('\n📦 Minificando HTML...', 'blue');

  try {
    // Minificar index.html
    execSync(
      'npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true -o dist/index.html index.html',
      { stdio: 'inherit' }
    );

    log('✓ HTML minificado correctamente', 'green');

    // Mostrar estadísticas
    const originalSize = fs.statSync('index.html').size;
    const minifiedSize = fs.statSync('dist/index.html').size;
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Reducción: ${reduction}%`, 'green');
  } catch (error) {
    log('✗ Error al minificar HTML', 'red');
    console.error(error);
  }
}

function copyAssets() {
  log('\n📋 Copiando assets...', 'blue');

  try {
    // Copiar imágenes
    if (fs.existsSync('img')) {
      fs.cpSync('img', 'dist/img', { recursive: true });
      log('✓ Imágenes copiadas', 'green');
    }

    // Copiar páginas
    if (fs.existsSync('pages')) {
      fs.cpSync('pages', 'dist/pages', { recursive: true });
      log('✓ Páginas copiadas', 'green');
    }

    // Copiar traducciones
    if (fs.existsSync('js/translations')) {
      if (!fs.existsSync('dist/js/translations')) {
        fs.mkdirSync('dist/js/translations', { recursive: true });
      }
      fs.cpSync('js/translations', 'dist/js/translations', { recursive: true });
      log('✓ Traducciones copiadas', 'green');
    }
  } catch (error) {
    log('✗ Error al copiar assets', 'red');
    console.error(error);
  }
}

function generateReport() {
  log('\n📊 Resumen de minificación', 'blue');
  log('================================', 'blue');

  try {
    const distPath = path.join(__dirname, '..', 'dist');

    function getDirSize(dirPath) {
      let size = 0;
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          size += getDirSize(filePath);
        } else {
          size += stats.size;
        }
      });

      return size;
    }

    const totalSize = getDirSize(distPath);
    log(`Tamaño total de dist/: ${(totalSize / 1024 / 1024).toFixed(2)} MB`, 'green');
    log('\n✅ Minificación completada exitosamente!', 'green');
    log('Los archivos minificados están en la carpeta dist/', 'yellow');
  } catch (error) {
    log('✗ Error al generar reporte', 'red');
  }
}

// Ejecutar proceso de minificación
log('\n🚀 Iniciando proceso de minificación...', 'blue');
log('=====================================\n', 'blue');

createDistFolder();
minifyCSS();
minifyJS();
minifyHTML();
copyAssets();
generateReport();

log('\n🎉 Proceso completado!\n', 'green');
