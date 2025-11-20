const btnEnvio = document.getElementById('enviarCorreo');

if (btnEnvio) {
    btnEnvio.addEventListener('click', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        window.location.href = `mailto:julianvargastrb@gmail.com?subject=${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje + '\n\nFrom: ' + correo)}`;
    });
}

function menuResponsive() {
  var x = document.getElementById("myTopnav");
  if (x && x.className === "topnav") {
    x.className += " responsive";
  } else if (x) {
    x.className = "topnav";
  }
}