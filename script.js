
function encriptar(){
    var arrNewString = (document.getElementById("texto").value).split("");
    for (i = 0; i < arrNewString.length; i++){
        arrNewString[i] = arrNewString[i].replace("i","imes");
        arrNewString[i] = arrNewString[i].replace("a","ai");
        arrNewString[i] = arrNewString[i].replace("e","enter");
        arrNewString[i] = arrNewString[i].replace("o","ober");
        arrNewString[i] = arrNewString[i].replace("u","ufat");
    }
    newString = ""
    for (i = 0; i < arrNewString.length; i++){
        newString += arrNewString[i];
    }
    document.getElementById("mensaje").innerHTML = newString;
}

// Es mejor separar cada letra en una lista y tratar cada una de ellas en una funcion
function desencriptar(){
    var newString = document.getElementById("texto").value;
    var arrNewString = newString.split("");
    for (i = 0; i < arrNewString.length; i++){
        newString = newString.replace("ai","a");
        newString = newString.replace("enter","e");
        newString = newString.replace("imes","i");
        newString = newString.replace("ober","o");
        newString = newString.replace("ufat","u");
    }
    document.getElementById("mensaje").innerHTML = newString;
}

function copiarAlPortapapeles(id_elemento) {

  // Crea un campo de texto "oculto"
  var aux = document.createElement("input");

  // Asigna el contenido del elemento especificado al valor del campo
  aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);

  // Añade el campo a la página
  document.body.appendChild(aux);

  // Selecciona el contenido del campo
  aux.select();

  // Copia el texto seleccionado
  document.execCommand("copy");

  // Elimina el campo de la página
  document.body.removeChild(aux);

}

// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
