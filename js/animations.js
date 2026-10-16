/* ============================================================
   animations.js
   Animaciones sutiles controladas por JavaScript.
   Usa IntersectionObserver para revelar elementos al hacer
   scroll (clase .reveal -> .visible). Degrada con elegancia
   si el navegador no lo soporta.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.reveal');
  if (!elementos.length) return;

  // Si no hay soporte, muestra todo directamente
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          obs.unobserve(entrada.target); // Anima una sola vez
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elementos.forEach((el) => observador.observe(el));
});
