import { Resend } from 'resend';
import { config } from 'dotenv';

config();

let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend configured');
} else {
  console.warn('⚠️  RESEND_API_KEY not configured');
}

export const sendContactEmail = async (data) => {
  try {
    if (!resend) {
      console.error('⚠️  RESEND_API_KEY not configured');
      return false;
    }

    const { nombre, email, mensaje, timestamp } = data;
    const adminEmail = process.env.EMAIL_TO || 'julianvargastrb@gmail.com';

    const result = await resend.emails.send({
      from: 'Julian Vargas Portfolio <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Contact from ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .info-row { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #667eea; }
            .label { font-weight: 600; color: #667eea; display: block; margin-bottom: 5px; }
            .message-box { background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>💼 New Portfolio Contact</h2>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">From:</span>
                <span>${nombre}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span><a href="mailto:${email}">${email}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Date:</span>
                <span>${new Date(timestamp).toLocaleString('en-US', { 
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</span>
              </div>
              <div class="message-box">
                <h3 style="margin-top: 0; color: #667eea;">Message:</h3>
                <p>${mensaje.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div class="footer">
              <p>Sent from <strong>julianvargasdev.com</strong> contact form</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log(`✅ Email sent to ${adminEmail}`, result);
    return true;

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};
