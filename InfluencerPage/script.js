const btnEnvio = document.getElementById('enviarCorreo');

btnEnvio.addEventListener('click', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;
    window.location.href = 'mailto:julianvargastrb@gmail.com' + correo + '?subject=' + nombre + '&body=' + mensaje;
})

function menuResponsive() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  
}

const menu = document.getElementById("myTopnav");
// Quitar menu con addEventListener "blur"
menu.addEventListener("blur", (menu) =>{
  menu.preventDefault();
  menu.className === "topnav"
  console.log("Blur?")
})