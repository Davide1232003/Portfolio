/* =========================
   HEADER E FOOTER PARTILHADOS
   Injeta o mesmo header/footer em todas as páginas,
   evitando repetir o HTML em cada ficheiro.
========================= */

const HEADER_HTML = `
<header class="main-header">
  <div class="logo-container">
    <a href="index.html">
      <img src="imagens/LOGOOO-02.png" alt="Logo de Davide Cerqueira" class="my-logo" />
    </a>
  </div>
  <nav class="nav-links">
    <a href="sobre_mim.html" data-nav="sobre">/ SOBRE MIM</a>
    <div class="nav-dropdown">
      <a href="projetos_web.html" class="dropdown-trigger" data-nav="projetos">/ PROJETOS</a>
      <div class="dropdown-menu">
        <a href="projetos_web.html" data-nav="web">/ WEB</a>
        <a href="projetos_design.html" data-nav="design">/ DESIGN</a>
      </div>
    </div>
  </nav>
</header>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-brand">
      <img src="imagens/LOGOOO-02.png" alt="Logo de Davide Cerqueira" class="footer-logo" />
    </div>

    <div class="footer-copy">&copy; 2026 Davide Cerqueira</div>

    <button class="back-to-top" id="backToTop" aria-label="Voltar ao topo">&uarr;</button>
  </div>
</footer>
`;

const WEB_PROJECT_PAGES = [
  "projetos_web.html",
  "projeto_RunClub.html",
  "projeto_UnknownRuins.html",
  "projeto_Saltaricos.html",
  "projeto_StravaDash.html",
];

const DESIGN_PROJECT_PAGES = [
  "projetos_design.html",
  "projeto_RunClub_Design.html",
];

function mountPartials() {
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");

  if (headerSlot) headerSlot.outerHTML = HEADER_HTML;
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  const currentPage = location.pathname.split("/").pop() || "index.html";
  const nav = document.querySelector(".main-header .nav-links");
  if (!nav) return;

  if (currentPage === "sobre_mim.html") {
    nav.querySelector('[data-nav="sobre"]')?.classList.add("active-link");
  }

  if (
    WEB_PROJECT_PAGES.includes(currentPage) ||
    DESIGN_PROJECT_PAGES.includes(currentPage)
  ) {
    nav.querySelector('[data-nav="projetos"]')?.classList.add("active-link");
  }

  if (WEB_PROJECT_PAGES.includes(currentPage)) {
    nav.querySelector('[data-nav="web"]')?.classList.add("active-link");
  }

  if (DESIGN_PROJECT_PAGES.includes(currentPage)) {
    nav.querySelector('[data-nav="design"]')?.classList.add("active-link");
  }
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initTouchDropdown() {
  const isTouchDevice = window.matchMedia("(hover: none)").matches;
  if (!isTouchDevice) return;

  const dropdown = document.querySelector(".nav-dropdown");
  const trigger = dropdown?.querySelector(".dropdown-trigger");
  if (!dropdown || !trigger) return;

  trigger.addEventListener("click", (e) => {
    if (!dropdown.classList.contains("is-open")) {
      e.preventDefault();
      dropdown.classList.add("is-open");
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("is-open");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountPartials();
  initBackToTop();
  initTouchDropdown();
});
