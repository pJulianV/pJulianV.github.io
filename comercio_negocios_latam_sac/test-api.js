import fetch from 'node-fetch';

const API_URL = process.argv[2] || 'https://comercio-negocios-latam.onrender.com';

async function testContactAPI() {
  console.log('\n🧪 Probando endpoint de contacto...');
  console.log('🌐 URL:', `${API_URL}/api/contact`);
  
  const testData = {
    nombre: 'Julian David Vargas Avendaño',
    empresa: 'Indisoft',
    email: 'julianvargastrb@gmail.com',
    telefono: '3216961959',
    mensaje: 'Esta es una prueba del formulario de contacto desde script de testing. Si recibes este email, el sistema funciona correctamente.'
  };
  
  console.log('\n📤 Datos a enviar:');
  console.log(JSON.stringify(testData, null, 2));
  
  try {
    console.log('\n⏳ Enviando petición POST...\n');
    
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📊 Status:', response.status, response.statusText);
    console.log('📋 Headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    
    const result = await response.json();
    
    console.log('\n📥 Respuesta del servidor:');
    console.log(JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ ÉXITO! Email enviado correctamente');
      console.log('✉️  Revisa tu bandeja de entrada');
    } else {
      console.log('\n❌ ERROR! El servidor respondió con error');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR DE CONEXIÓN:');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    console.error('\nStack trace:', error.stack);
  }
}

testContactAPI();
