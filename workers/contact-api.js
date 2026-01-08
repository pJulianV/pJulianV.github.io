// Cloudflare Worker for Contact Form with Resend
// Deploy this to Cloudflare Workers at /api/contact

export default {
  async fetch(request, env) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      // Parse request body
      const data = await request.json();
      
      // Validate required fields
      const { firstName, lastName, email, subject, message } = data;
      if (!firstName || !lastName || !email || !subject || !message) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Send email using Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Change this to your verified domain
          to: 'julian.vargasdev@gmail.com', // Your email
          reply_to: email,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                  }
                  .header {
                    background: linear-gradient(135deg, #6366f1, #818cf8);
                    color: white;
                    padding: 30px;
                    border-radius: 10px 10px 0 0;
                    text-align: center;
                  }
                  .content {
                    background: #f8fafc;
                    padding: 30px;
                    border: 1px solid #e2e8f0;
                    border-top: none;
                  }
                  .field {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: white;
                    border-radius: 8px;
                    border-left: 4px solid #6366f1;
                  }
                  .label {
                    font-weight: 600;
                    color: #64748b;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 5px;
                  }
                  .value {
                    color: #1e293b;
                    font-size: 15px;
                  }
                  .message-box {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                  }
                  .footer {
                    text-align: center;
                    padding: 20px;
                    color: #64748b;
                    font-size: 12px;
                  }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1 style="margin: 0;">New Portfolio Contact Message</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">From</div>
                    <div class="value">${firstName} ${lastName}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  
                  ${data.company ? `
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${data.company}</div>
                  </div>
                  ` : ''}
                  
                  <div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${subject}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Message</div>
                    <div class="message-box">${message}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>This message was sent from your portfolio contact form at julianvargasdev.com</p>
                </div>
              </body>
            </html>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend API error:', error);
        throw new Error('Failed to send email');
      }

      const result = await resendResponse.json();
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully',
          id: result.id 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );

    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Internal server error',
          message: error.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
