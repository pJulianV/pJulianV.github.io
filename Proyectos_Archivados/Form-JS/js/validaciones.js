export function valida(input) {
  // data-tipo="tipoDeInput" ~ dataset.tipo
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Por favor, ingresa tu nombre",
  },
  email: {
    valueMissing: "Por favor, ingresa tu correo electrónico",
    typeMismatch: "Por favor, ingresa un correo válido (ejemplo@dominio.com)",
  },
  password: {
    valueMissing: "Por favor, crea una contraseña",
    patternMismatch:
      "La contraseña debe tener entre 6-12 caracteres, incluir mayúsculas, minúsculas y números. No se permiten caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Por favor, ingresa tu fecha de nacimiento",
    customError: "Debes ser mayor de 18 años para registrarte",
  },
  numero: {
    valueMissing: "Por favor, ingresa tu número de teléfono",
    patternMismatch: "Por favor, ingresa un número válido de 10 dígitos"
  },
  direccion :{
    valueMissing: "Por favor, ingresa tu dirección completa",
    patternMismatch: "La dirección debe tener entre 10 y 40 caracteres"
  },
  ciudad :{
    valueMissing: "Por favor, ingresa tu ciudad",
    patternMismatch: "El nombre de la ciudad debe tener entre 5 y 40 caracteres"
  },
  estado :{
    valueMissing: "Por favor, ingresa tu estado",
    patternMismatch: "El nombre del estado debe tener entre 5 y 40 caracteres"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
