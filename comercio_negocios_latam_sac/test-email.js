import { Resend } from 'resend';
import { config } from 'dotenv';

config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log('\n🧪 Iniciando prueba de envío de email con Resend...\n');
  
  // Verificar API key
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY no configurada en .env');
    return;
  }
  
  console.log('✅ API Key encontrada:', process.env.RESEND_API_KEY.substring(0, 10) + '...');
  console.log('📧 Email destino:', process.env.EMAIL_TO || 'info@comercionegocioslatam.com');
  
  try {
    console.log('\n📤 Enviando email de prueba...\n');
    
    const result = await resend.emails.send({
      from: 'Comercio Negocios Latam <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'julianvargastrb@gmail.com',
      subject: 'Prueba de Contacto - Comercio y Negocios Latam',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background-color: #002156; color: white; padding: 20px; text-align: center; }
            .content { background-color: white; padding: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🧪 Email de Prueba</h2>
            </div>
            <div class="content">
              <h3>Datos de la prueba:</h3>
              <p><strong>Nombre:</strong> Julian David Vargas Avendaño</p>
              <p><strong>Empresa:</strong> Indisoft</p>
              <p><strong>Email:</strong> julianvargastrb@gmail.com</p>
              <p><strong>Teléfono:</strong> 3216961959</p>
              <p><strong>Mensaje:</strong> Esta es una prueba del sistema de envío de correos</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-PE')}</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ EMAIL ENVIADO EXITOSAMENTE!');
    console.log('\n📋 Respuesta de Resend:');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n✉️  Revisa tu bandeja de entrada en:', process.env.EMAIL_TO || 'julianvargastrb@gmail.com');
    
  } catch (error) {
    console.error('\n❌ ERROR AL ENVIAR EMAIL:');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('Respuesta del servidor:', JSON.stringify(error.response, null, 2));
    }
    
    if (error.statusCode) {
      console.error('Código de estado:', error.statusCode);
    }
    
    console.error('\nStack trace:', error.stack);
  }
}

testEmail();
