/* ============================================================
   form-handler.js
   Validación del formulario de contacto en tiempo real y al
   enviar. El envío es SIMULADO (no hay servidor real), como
   pide la actividad.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#form-contacto');
  if (!formulario) return;

  const campos = {
    nombre: document.querySelector('#nombre'),
    email: document.querySelector('#email'),
    mensaje: document.querySelector('#mensaje')
  };

  const mensajeGeneral = document.querySelector('#form-mensaje');

  /* --------------------------------------------------------
     Reglas de validación por campo. Cada regla devuelve una
     cadena de error ('' = válido).
     -------------------------------------------------------- */
  const reglas = {
    nombre(valor) {
      if (valor.trim() === '') return 'El nombre es obligatorio.';
      if (valor.trim().length < 3) return 'Debe tener al menos 3 caracteres.';
      return '';
    },
    email(valor) {
      if (valor.trim() === '') return 'El correo es obligatorio.';
      // Expresión regular simple para formato de email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(valor)) return 'Ingresa un correo válido.';
      return '';
    },
    mensaje(valor) {
      if (valor.trim() === '') return 'El mensaje es obligatorio.';
      if (valor.trim().length < 10) return 'Debe tener al menos 10 caracteres.';
      return '';
    }
  };

  /* --------------------------------------------------------
     Muestra u oculta el error de un campo concreto
     -------------------------------------------------------- */
  function validarCampo(nombreCampo) {
    const input = campos[nombreCampo];
    const error = reglas[nombreCampo](input.value);
    const spanError = document.querySelector(`#error-${nombreCampo}`);

    if (error) {
      input.classList.add('invalido');
      input.setAttribute('aria-invalid', 'true');
      spanError.textContent = error;
      return false;
    }

    input.classList.remove('invalido');
    input.setAttribute('aria-invalid', 'false');
    spanError.textContent = '';
    return true;
  }

  /* --------------------------------------------------------
     Validación EN TIEMPO REAL (evento input)
     -------------------------------------------------------- */
  Object.keys(campos).forEach((nombreCampo) => {
    campos[nombreCampo].addEventListener('input', () => {
      validarCampo(nombreCampo);
    });
  });

  /* --------------------------------------------------------
     Validación al ENVIAR (envío simulado)
     -------------------------------------------------------- */
  formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Valida todos los campos y acumula el resultado
    const resultados = Object.keys(campos).map((c) => validarCampo(c));
    const todoValido = resultados.every(Boolean);

    if (!todoValido) {
      mensajeGeneral.textContent = 'Revisa los campos marcados en rojo.';
      mensajeGeneral.className = 'form__mensaje form__mensaje--error';
      return;
    }

    // Simulación de envío exitoso
    mensajeGeneral.textContent = '✅ ¡Mensaje enviado! Te responderé pronto.';
    mensajeGeneral.className = 'form__mensaje form__mensaje--exito';
    formulario.reset();

    // Limpia el mensaje después de unos segundos
    setTimeout(() => {
      mensajeGeneral.textContent = '';
      mensajeGeneral.className = 'form__mensaje';
    }, 5000);
  });
});
