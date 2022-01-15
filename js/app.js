///variables

const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//variables para los campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//regex para un email
const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  //campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //reiniciar el formulario
  btnReset.addEventListener("click", resetFormulario);

  //enviar emial
  formulario.addEventListener("submit", enviarEmail);
}

//funciones
function iniciarApp() {
  //deshabilitando el boton
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  //si hay texto
  //elimianr errores

  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    // console.log('hay texto');
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    // e.target.style.borderBottomColor = 'red';
    e.target.classList.add("border", "border-green-500");
    e.target.classList.remove("border", "border-red-500");

    mostrarError("todos los campos son obligatorios");
  }

  //validar email
  if (e.target.type === "email") {
    //el indexOF verifica que al menos en el string haya almenos un arroba
    // const resultado = e.target.value.indexOf('@');
    // if (resultado < 0) {
    //     mostrarError('El email no es valido');
    // }

    //enviando el texto del campo email al test del regex
    if (er.test(e.target.value)) {
      //eliminar el  errores
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      // console.log('hay texto');
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.add("border", "border-green-500");
      e.target.classList.remove("border", "border-red-500");
      mostrarError("email no valido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    //si todos los inputs tienen texto o estan validados
    // console.log('validacion completa');

    //habiliando el boton enviar y
    //cambiando sus clasees
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    //insertando el error antes del primer div
    // formulario.insertBefore(mensajeError, document.querySelector('.mb-10') );

    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e) {
  e.preventDefault();

  //mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //despues de 3 segundos ocultar el spinner y mostrar mensaje

  setTimeout(() => {
    // console.log('esta funcion se ejecuta despues de 3 segundos');
    //cada segundo = 1000
    spinner.style.display = "none";

    //mensaje que dira que se envio el mensaje
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envio correctamenete";
    parrafo.classList.add(
      "text-center",
      "text-white",
      "my-10",
      "p-2",
      "bg-green-500",
      "font-bold",
      "uppercase"
    );

    //insertar parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      //eliminar el menaje "enviado"
      parrafo.remove();
      resetFormulario();
    }, 4000);
  }, 3000);
}

function resetFormulario() {
  formulario.reset();

  //inicar de nuevo la app
  iniciarApp();
}
