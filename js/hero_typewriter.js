/* =========================
   CARGO DINÂMICO DA HOME (EFEITO DE ESCRITA)
========================= */

const HERO_ROLES = ["WEB DEVELOPER", "FRONTEND DEVELOPER"];

function initHeroTypewriter() {
  const target = document.getElementById("heroRoleText");
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = HERO_ROLES[0];
    return;
  }

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_DELETE = 300;

  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    const role = HERO_ROLES[roleIndex];
    charIndex++;
    target.textContent = role.slice(0, charIndex);

    if (charIndex < role.length) {
      setTimeout(type, TYPE_SPEED);
    } else {
      setTimeout(erase, PAUSE_AFTER_TYPE);
    }
  }

  function erase() {
    const role = HERO_ROLES[roleIndex];
    charIndex--;
    target.textContent = role.slice(0, charIndex);

    if (charIndex > 0) {
      setTimeout(erase, DELETE_SPEED);
    } else {
      roleIndex = (roleIndex + 1) % HERO_ROLES.length;
      setTimeout(type, PAUSE_AFTER_DELETE);
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", initHeroTypewriter);
