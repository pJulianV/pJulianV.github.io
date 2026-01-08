import { Resend } from 'resend';
import { config } from 'dotenv';

config();

/**
 * Configurar cliente de Resend
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Enviar email de formulario de contacto
 * @param {Object} data - Datos del formulario
 * @returns {Promise<boolean>}
 */
export const sendContactEmail = async (data) => {
  try {
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('⚠️  RESEND_API_KEY no configurada en variables de entorno');
      return false;
    }

    const { nombre, empresa, email, telefono, mensaje, timestamp } = data;
    const adminEmail = process.env.EMAIL_TO || 'info@comercionegocioslatam.com';

    // HTML para email al administrador
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #002156;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
          }
          .info-row {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .label {
            font-weight: bold;
            color: #002156;
            display: inline-block;
            min-width: 120px;
          }
          .message-box {
            background-color: #f5f5f5;
            padding: 15px;
            border-left: 4px solid #c19e5c;
            margin-top: 20px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Nuevo Mensaje de Contacto</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">Nombre:</span>
              <span>${nombre}</span>
            </div>
            <div class="info-row">
              <span class="label">Empresa:</span>
              <span>${empresa}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span><a href="mailto:${email}">${email}</a></span>
            </div>
            ${telefono ? `
            <div class="info-row">
              <span class="label">Teléfono:</span>
              <span><a href="tel:${telefono}">${telefono}</a></span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Fecha:</span>
              <span>${new Date(timestamp).toLocaleString('es-PE', { 
                timeZone: 'America/Lima',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</span>
            </div>
            <div class="message-box">
              <h3 style="margin-top: 0; color: #002156;">Mensaje:</h3>
              <p>${mensaje.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de<br>
            <strong>Comercio y Negocios Latam SAC</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // HTML para email de confirmación al usuario
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #002156;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
          }
          .highlight {
            color: #c19e5c;
          }
          .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Gracias por contactarnos!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${nombre}</strong>,</p>
            
            <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
            
            <p>En <strong class="highlight">Comercio y Negocios Latam SAC</strong>, estamos comprometidos con impulsar el crecimiento de tu empresa en mercados nacionales e internacionales.</p>
            
            <p>Mientras tanto, puedes conocer más sobre nuestros servicios en nuestra página web.</p>
            
            <p>Saludos cordiales,<br>
            <strong>El equipo de Comercio y Negocios Latam SAC</strong><br>
            <em>Una empresa del Grupo CASNU</em></p>
            
            <div class="footer">
              <p><strong>Comercio y Negocios Latam SAC</strong><br>
              San Isidro, Lima, Perú<br>
              📧 info@comercionegocioslatam.com<br>
              📱 +51 969 406 930</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email al administrador
    const result = await resend.emails.send({
      from: 'Comercio Negocios Latam <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Nuevo contacto desde el sitio web - ${empresa}`,
      html: adminHtml
    });

    // Por ahora solo enviamos al admin hasta verificar dominio
    // TODO: Configurar dominio verificado en Resend para enviar confirmación al usuario
    
    console.log(`✅ Email enviado correctamente a ${adminEmail}`, result);
    return true;

  } catch (error) {
    console.error('❌ Error al enviar email con Resend:', error);
    return false;
  }
};

/**
 * Verificar conexión con Resend
 */
export const verifyEmailConnection = async () => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('⚠️  RESEND_API_KEY no configurada');
      return false;
    }
    
    console.log('✅ Resend API Key configurada');
    return true;
  } catch (error) {
    console.error('❌ Error al verificar conexión de Resend:', error.message);
    return false;
  }
};
