/* ==========================================================================
   Hery Rasolofoarimanana — Portfolio
   Script principal : thème, navigation mobile, révélation au scroll,
   galerie de projets filtrable, formulaire de contact (mailto).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initTheme();
  initMobileNav();
  initScrollReveal();
  initLanguageBars();
  initProjects();
  initContactForm();
  initBackToTop();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* -------------------------------------------------------------------- */
/* Icônes Lucide                                                         */
/* -------------------------------------------------------------------- */
function initIcons() {
  if (window.lucide) {
    lucide.createIcons();
  } else {
    // lucide chargé en "defer" : on réessaie une fois le script prêt
    window.addEventListener("load", () => window.lucide && lucide.createIcons());
  }
}

/* -------------------------------------------------------------------- */
/* Thème clair / sombre (persisté dans localStorage)                     */
/* -------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "hery-portfolio-theme";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }
  // Sinon : aucun attribut => on suit prefers-color-scheme via le CSS

  toggle.addEventListener("click", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* -------------------------------------------------------------------- */
/* Navigation mobile (hamburger)                                         */
/* -------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
}

/* -------------------------------------------------------------------- */
/* Révélation au scroll (IntersectionObserver)                           */
/* -------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------- */
/* Barres de niveau de langue : animation au moment où elles apparaissent */
/* -------------------------------------------------------------------- */
function initLanguageBars() {
  const bars = document.querySelectorAll(".lang-level-fill");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    bars.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------- */
/* Projets / Showreel                                                     */
/* -------------------------------------------------------------------- */

/**
 * Tableau des projets — à éditer librement.
 * - id        : identifiant unique (chaîne)
 * - title     : titre affiché sur la carte
 * - category  : une des catégories utilisées dans les filtres
 *               ("Réalisation", "Design 3D", "Institutionnel", "Événementiel")
 * - youtubeId : identifiant de la vidéo YouTube (partie après "v=" dans l'URL)
 *
 * ⚠️ Les identifiants ci-dessous sont des exemples de démonstration.
 *    Remplacez-les par les vrais identifiants de projets de Hery.
 */
const PROJECTS = [
  { id: "p1", title: "Cérémonie officielle — captation multi-caméras", category: "Institutionnel", youtubeId: "dQw4w9WgXcQ" }, // REMPLACER par le vrai lien
  { id: "p2", title: "Habillage TV & animation 3D", category: "Design 3D", youtubeId: "aqz-KE-bpKQ" }, // REMPLACER par le vrai lien
  { id: "p3", title: "Reportage institutionnel — Présidence", category: "Institutionnel", youtubeId: "M7lc1UVf-VE" }, // REMPLACER par le vrai lien
  { id: "p4", title: "Court-métrage — réalisation & montage", category: "Réalisation", youtubeId: "LXb3EKWsInQ" }, // REMPLACER par le vrai lien
  { id: "p5", title: "Couverture d'événement corporate", category: "Événementiel", youtubeId: "ScMzIvxBSi4" }, // REMPLACER par le vrai lien
  { id: "p6", title: "Design 3D — rendu produit", category: "Design 3D", youtubeId: "eSKpQOU9pDU" }, // REMPLACER par le vrai lien
];

function initProjects() {
  const grid = document.getElementById("project-grid");
  const chips = document.querySelectorAll(".chip");

  function render(filter) {
    grid.innerHTML = "";
    PROJECTS.forEach((project) => {
      const isShown = filter === "all" || project.category === filter;
      const card = document.createElement("article");
      card.className = "project-card" + (isShown ? " is-shown" : "");
      card.dataset.category = project.category;
      card.innerHTML = `
        <div class="project-video">
          <lite-youtube videoid="${project.youtubeId}" playlabel="Lire : ${escapeHtml(project.title)}"></lite-youtube>
        </div>
        <div class="project-body">
          <span class="project-category"><i data-lucide="tag"></i> ${escapeHtml(project.category)}</span>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
        </div>
      `;
      grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      render(chip.dataset.filter);
    });
  });

  render("all");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* -------------------------------------------------------------------- */
/* Formulaire de contact (mailto — aucun backend)                        */
/* -------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const CONTACT_EMAIL = "solofo_dim@yahoo.fr";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`;
    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
}

/* -------------------------------------------------------------------- */
/* Bouton retour en haut + header au scroll                              */
/* -------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
