function menuResponsive() {
  const x = document.getElementById("myTopnav");
  if (x) {
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.getElementById("myTopnav");
  const menuIcon = document.querySelector('.iconMenu');
  
  if (menu && !menu.contains(event.target) && event.target !== menuIcon) {
    menu.className = "topnav";
  }
});

const btnEnvio = document.getElementById('enviarCorreo');

if (btnEnvio) {
  btnEnvio.addEventListener('click', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;
    
    if (nombre && correo && mensaje) {
      window.location.href = `mailto:julianvargastrb@gmail.com?subject=${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje + '\n\nDe: ' + correo)}`;
    }
  });
}