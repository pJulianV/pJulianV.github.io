/**
 * Script para generar hashes SRI (Subresource Integrity) de recursos externos
 *
 * Uso: node scripts/generate-sri.js
 */

import crypto from 'crypto';
import https from 'https';

/**
 * Generar hash SRI desde URL
 * @param {string} url - URL del recurso
 * @param {string} algorithm - Algoritmo (sha256, sha384, sha512)
 * @returns {Promise<string>} Hash SRI
 */
function generateSRIFromURL(url, algorithm = 'sha384') {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const hash = crypto.createHash(algorithm);

        response.on('data', (chunk) => {
          hash.update(chunk);
        });

        response.on('end', () => {
          const digest = hash.digest('base64');
          const integrity = `${algorithm}-${digest}`;
          resolve(integrity);
        });

        response.on('error', reject);
      })
      .on('error', reject);
  });
}

/**
 * Recursos externos a verificar
 */
const resources = [
  {
    name: 'Google Fonts - Poppins',
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    tag: 'link',
  },
  {
    name: 'DOMPurify',
    url: 'https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js',
    tag: 'script',
  },
  // Nota: Google Analytics y GTM no soportan SRI porque sus archivos cambian frecuentemente
];

/**
 * Generar SRI para todos los recursos
 */
async function generateAllSRI() {
  console.log('🔒 Generando hashes SRI para recursos externos...\n');

  for (const resource of resources) {
    try {
      console.log(`📦 ${resource.name}`);
      console.log(`   URL: ${resource.url}`);

      const integrity = await generateSRIFromURL(resource.url);

      console.log(`   ✅ Integrity: ${integrity}`);
      console.log(`   📝 Ejemplo de uso en ${resource.tag}:`);

      if (resource.tag === 'link') {
        console.log(`   <link href="${resource.url}"`);
        console.log(`         integrity="${integrity}"`);
        console.log(`         crossorigin="anonymous">`);
      } else if (resource.tag === 'script') {
        console.log(`   <script src="${resource.url}"`);
        console.log(`           integrity="${integrity}"`);
        console.log(`           crossorigin="anonymous"></script>`);
      }

      console.log('');
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }

  console.log('⚠️  NOTA IMPORTANTE:');
  console.log('   Google Analytics y Google Tag Manager NO soportan SRI');
  console.log('   porque sus archivos cambian frecuentemente.');
  console.log('   Usa CSP (Content Security Policy) para proteger estos recursos.\n');

  console.log('✅ Hashes SRI generados correctamente');
}

// Ejecutar
generateAllSRI().catch(console.error);
