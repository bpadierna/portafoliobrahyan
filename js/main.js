/* ============================================================
   main.js
   Responsabilidades:
   - Carga dinámica de proyectos desde un array de objetos
   - Menú de navegación responsive (hamburguesa)
   - Cambio de tema claro/oscuro (persistente en localStorage)
   - Año dinámico del footer
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1) DATOS: array de objetos de proyectos (mínimo 3)
   ------------------------------------------------------------ */
// Nota: son casos SIMULADOS inspirados en automatizaciones reales.
// Por confidencialidad no se exponen datos ni código de clientes.
// Reemplaza REPO_FRAMEWORK por la URL real de tu repositorio en GitHub.
const REPO_FRAMEWORK = 'https://github.com/tu-usuario/automation-framework';

const proyectos = [
  {
    titulo: 'Ocupación de la gerencia DHO',
    imagen: 'assets/images/ocupacion_img.jpg',
    descripcion:
      'Bot que lee los eventos del calendario de los usuarios y registra cada evento en un archivo JSON que alimenta un tablero de Power BI para analizar la ocupación.',
    tecnologias: ['Python', 'Calendar API', 'JSON', 'Power BI'],
    enlace: 'https://github.com/bpadierna/Ocupaci-n-de-la-gerencia-DHO'
  },
  {
    titulo: 'Registro de acciones',
    imagen: 'assets/images/acciones_img.jpg',
    descripcion:
      'Automatización que revisa el correo diariamente, descarga los PDF adjuntos y extrae la información relevante para consolidarla en un reporte estructurado.',
    tecnologias: ['Python', 'PDF', 'Pandas'],
    enlace: 'https://github.com/bpadierna/Registro-de-acciones'
  },
  {
    titulo: 'Obtener valor de producto',
    imagen: 'assets/images/Web-scraping_img.jpg',
    descripcion:
      'Web scraping en distintos sitios de venta para comparar el precio del mismo producto y detectar la mejor oferta de forma automática.',
    tecnologias: ['Python', 'Web Scraping', 'Requests'],
    enlace: 'https://github.com/bpadierna/Obtener-valor-de-producto'
  }
];

/* ------------------------------------------------------------
   2) Utilidad: escapa texto para evitar inyección de HTML
   ------------------------------------------------------------ */
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/* ------------------------------------------------------------
   3) Renderizar proyectos en el grid
   ------------------------------------------------------------ */
function renderizarProyectos() {
  const contenedor = document.querySelector('#proyectos-grid');
  if (!contenedor) return;

  proyectos.forEach((proyecto) => {
    const card = document.createElement('article');
    card.className = 'proyecto-card reveal';

    const tecnologiasHTML = proyecto.tecnologias
      .map((tech) => `<span>${escaparHTML(tech)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="proyecto-card__icono">
        <img src="${escaparHTML(proyecto.imagen)}" alt="Imagen del proyecto ${escaparHTML(proyecto.titulo)}"
             class="proyecto-card__img" loading="lazy">
      </div>
      <div class="proyecto-card__cuerpo">
        <h3>${escaparHTML(proyecto.titulo)}</h3>
        <p>${escaparHTML(proyecto.descripcion)}</p>
        <div class="tecnologias">${tecnologiasHTML}</div>
        <span class="proyecto-card__nota">Proyecto confidencial · caso simulado</span>
        <a href="${escaparHTML(proyecto.enlace)}" class="btn btn--secundario"
           target="_blank" rel="noopener noreferrer">Ver framework en GitHub</a>
      </div>`;
    contenedor.appendChild(card);
  });
}

/* ------------------------------------------------------------
   4) Menú de navegación responsive (hamburguesa)
   ------------------------------------------------------------ */
function iniciarMenu() {
  const alternar = document.querySelector('#nav-alternar');
  const menu = document.querySelector('#nav-menu');
  if (!alternar || !menu) return;

  alternar.addEventListener('click', () => {
    const abierto = menu.classList.toggle('activo');
    alternar.classList.toggle('activo', abierto);
    alternar.setAttribute('aria-expanded', String(abierto));
    alternar.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cierra el menú al hacer clic en un enlace (útil en móvil)
  menu.querySelectorAll('.nav__enlace').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      menu.classList.remove('activo');
      alternar.classList.remove('activo');
      alternar.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ------------------------------------------------------------
   5) Cambio de tema claro/oscuro (persistente)
   ------------------------------------------------------------ */
function iniciarTema() {
  const btn = document.querySelector('#btn-tema');
  if (!btn) return;

  // Aplica el tema guardado previamente
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado === 'oscuro') {
    document.documentElement.setAttribute('data-tema', 'oscuro');
  }

  btn.addEventListener('click', () => {
    const esOscuro = document.documentElement.getAttribute('data-tema') === 'oscuro';
    if (esOscuro) {
      document.documentElement.removeAttribute('data-tema');
      localStorage.setItem('tema', 'claro');
    } else {
      document.documentElement.setAttribute('data-tema', 'oscuro');
      localStorage.setItem('tema', 'oscuro');
    }
  });
}

/* ------------------------------------------------------------
   6) Año dinámico en el footer
   ------------------------------------------------------------ */
function actualizarAnio() {
  const anio = document.querySelector('#anio');
  if (anio) anio.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   Punto de entrada: espera a que el DOM esté listo
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  renderizarProyectos();
  iniciarMenu();
  iniciarTema();
  actualizarAnio();
});
