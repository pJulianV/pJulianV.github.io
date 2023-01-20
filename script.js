function ocultarDiv() {
    document.getElementById(sinResultado).style.visibility = "hidden";
}

function encriptar(){
    var arrNewString = (document.getElementById("texto").value).split("");
    for (i = 0; i < arrNewString.length; i++){
        arrNewString[i] = arrNewString[i].replace("e","enter");
        arrNewString[i] = arrNewString[i].replace("i","imes");
        arrNewString[i] = arrNewString[i].replace("o","ober");
        arrNewString[i] = arrNewString[i].replace("a","ai");
        arrNewString[i] = arrNewString[i].replace("u","ufat");
    }
    newString = ""
    for (i = 0; i < arrNewString.length; i++){
        newString += arrNewString[i];
    }
    document.getElementById("textarea").innerHTML = newString;
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
    document.getElementById("textarea").innerHTML = newString;
}

    // // Establecemos las variables
    // var mensaje = document.getElementById("mensaje");
    // var answer = document.getElementById("copyAnswer");
    // var copy   = document.getElementById("copyBlock");

    // copy.addEventListener('click', function(e) {
    //    // Sleccionando el texto
    //    mensaje.select(); 
    //    try {
    //        // Copiando el texto seleccionado
    //        var successful = document.execCommand('copy');
     
    //        if(successful) answer.innerHTML = 'Copiado!';
    //        else answer.innerHTML = 'Incapaz de copiar!';
    //    } catch (err) {
    //        answer.innerHTML = 'Browser no soportado!';
    //    }
    // });

// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
