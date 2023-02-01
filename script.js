const btnEnvio = document.getElementById('enviarCorreo');

btnEnvio.addEventListener('click', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;
    window.location.href = 'mailto:julianvargastrb@gmail.com' + correo + '?subject=' + nombre + '&body=' + mensaje;
})