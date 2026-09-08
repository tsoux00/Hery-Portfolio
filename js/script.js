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
  initCountries();
  initProjects();
  initDesigns();
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
/* Pays visités                                                           */
/* -------------------------------------------------------------------- */

/**
 * Tableau des pays visités — à éditer librement.
 * - name : nom du pays affiché au survol (en français)
 * - code : code pays ISO 3166-1 alpha-2 (utilisé par flag-icons pour le drapeau)
 */
const COUNTRIES = [
  { name: "Madagascar", code: "mg" },
  { name: "France", code: "fr" },
  { name: "États-Unis", code: "us" },
  { name: "Chine", code: "cn" },
  { name: "Japon", code: "jp" },
  { name: "Russie", code: "ru" },
  { name: "Émirats arabes unis", code: "ae" },
  { name: "Guinée", code: "gn" },
  { name: "Afrique du Sud", code: "za" },
  { name: "Maurice", code: "mu" },
  { name: "Égypte", code: "eg" },
  { name: "Éthiopie", code: "et" },
  { name: "Corée du Sud", code: "kr" },
  { name: "Maroc", code: "ma" },
  { name: "Sénégal", code: "sn" },
  { name: "Zimbabwe", code: "zw" },
  { name: "Bénin", code: "bj" },
  { name: "Rwanda", code: "rw" },
  { name: "Burundi", code: "bi" },
  { name: "Kenya", code: "ke" },
  { name: "Comores", code: "km" },
  { name: "Tanzanie", code: "tz" },
  { name: "Italie", code: "it" },
  { name: "Suisse", code: "ch" },
  { name: "Norvège", code: "no" },
  { name: "Turquie", code: "tr" },
  { name: "Ghana", code: "gh" },
  { name: "Mozambique", code: "mz" },
  { name: "Angola", code: "ao" },
];

function initCountries() {
  const grid = document.getElementById("countries-grid");
  if (!grid) return;

  grid.innerHTML = "";
  COUNTRIES.forEach((country) => {
    const item = document.createElement("div");
    item.className = "country-item";
    item.tabIndex = 0;
    item.setAttribute("aria-label", country.name);

    const flag = document.createElement("span");
    flag.className = `country-flag fi fi-${country.code}`;
    flag.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.className = "country-name";
    name.textContent = country.name;

    item.appendChild(flag);
    item.appendChild(name);
    grid.appendChild(item);
  });

  const items = Array.from(grid.querySelectorAll(".country-item"));

  // Calcule, pour chaque case, la largeur exacte nécessaire au survol
  // (drapeau + espacement + nom complet) afin que l'expansion soit fluide
  // quelle que soit la longueur du nom du pays.
  requestAnimationFrame(() => {
    items.forEach((item) => {
      const flagEl = item.querySelector(".country-flag");
      const nameEl = item.querySelector(".country-name");
      const horizontalPadding = 18; // 9px de padding de chaque côté de la case
      const nameGap = 10; // marge appliquée entre le drapeau et le nom au survol
      const safetyBuffer = 6; // marge de sécurité pour les variations de police
      const expandedWidth =
        flagEl.offsetWidth + nameGap + nameEl.scrollWidth + horizontalPadding + safetyBuffer;
      item.style.setProperty("--expand-w", `${expandedWidth}px`);
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // le survol CSS simple (sans ondulation) suffit

  const STAGGER_MS = 28; // délai ajouté par case, en cascade, à mesure qu'on s'éloigne de la case survolée

  // La case survolée grandit/rétrécit via la transition CSS normale (width, voir
  // styles.css) — cette poussée réelle des voisines est déjà gérée nativement
  // par la mise en page flexbox, aucune manipulation JS n'est nécessaire pour ça.
  //
  // On ajoute ici une ondulation purement décorative (une petite pichenette qui
  // se propage case par case jusqu'à la dernière) déclenchée aussi bien à
  // l'entrée qu'à la sortie du survol, via une `animation` CSS indépendante
  // (voir .country-item.is-rippling) qui ne touche jamais `width` ni la mise en
  // page — impossible qu'elle entre en conflit avec la vraie poussée.
  function rippleSiblings(hoveredIndex) {
    for (let i = hoveredIndex + 1; i < items.length; i += 1) {
      const el = items[i];
      const delay = (i - hoveredIndex - 1) * STAGGER_MS;
      el.style.setProperty("--ripple-delay", `${delay}ms`);
      el.classList.remove("is-rippling");
      // eslint-disable-next-line no-unused-expressions
      void el.offsetWidth; // force le redémarrage de l'animation si elle est déjà en cours
      el.classList.add("is-rippling");
    }
  }

  items.forEach((el) => {
    el.addEventListener("animationend", () => el.classList.remove("is-rippling"));
  });

  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => rippleSiblings(index));
    item.addEventListener("mouseleave", () => rippleSiblings(index));
    item.addEventListener("focus", () => rippleSiblings(index));
    item.addEventListener("blur", () => rippleSiblings(index));
  });
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
  const chips = document.querySelectorAll("#filter-chips .chip");

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
/* Design graphique                                                       */
/* -------------------------------------------------------------------- */

/**
 * Tableau des créations graphiques — à éditer librement.
 * - id          : identifiant unique (chaîne)
 * - title       : titre affiché sur la carte
 * - category    : une des catégories utilisées dans les filtres
 *                 ("Identité visuelle", "Affiche", "Rendu 3D", "Habillage TV")
 * - description : courte description du visuel
 * - image       : chemin vers le fichier image, ex. "assets/designs/mon-visuel.jpg"
 *
 * ⚠️ Toutes les entrées ci-dessous sont des EMPLACEMENTS PROVISOIRES (placeholders).
 *    Tant que le fichier image n'existe pas dans assets/designs/, une vignette de
 *    remplacement s'affiche automatiquement. Il suffit de déposer le vrai fichier
 *    au chemin indiqué (ou de modifier `image`) pour qu'il apparaisse.
 */
const DESIGNS = [
  { id: "d1", title: "Identité visuelle — Kopenao", category: "Identité visuelle", description: "Logo et charte graphique de l'agence Kopenao.", image: "assets/designs/design-1.jpg" }, // REMPLACER par le vrai visuel
  { id: "d2", title: "Affiche événementielle", category: "Affiche", description: "Affiche de communication pour un événement institutionnel.", image: "assets/designs/design-2.jpg" }, // REMPLACER par le vrai visuel
  { id: "d3", title: "Rendu 3D — produit", category: "Rendu 3D", description: "Modélisation et rendu 3D réalisés sous 3ds Max / Cinema 4D.", image: "assets/designs/design-3.jpg" }, // REMPLACER par le vrai visuel
  { id: "d4", title: "Habillage TV — génériques", category: "Habillage TV", description: "Habillage graphique et génériques d'émission.", image: "assets/designs/design-4.jpg" }, // REMPLACER par le vrai visuel
  { id: "d5", title: "Affiche institutionnelle", category: "Affiche", description: "Support de communication pour une institution publique.", image: "assets/designs/design-5.jpg" }, // REMPLACER par le vrai visuel
  { id: "d6", title: "Rendu 3D — architecture", category: "Rendu 3D", description: "Visualisation 3D d'un espace architectural.", image: "assets/designs/design-6.jpg" }, // REMPLACER par le vrai visuel
];

function initDesigns() {
  const grid = document.getElementById("design-grid");
  if (!grid) return;
  const chips = document.querySelectorAll("#design-filter-chips .chip");

  function render(filter) {
    grid.innerHTML = "";
    DESIGNS.forEach((item) => {
      const isShown = filter === "all" || item.category === filter;
      const card = document.createElement("article");
      card.className = "design-card" + (isShown ? " is-shown" : "");
      card.dataset.category = item.category;

      const thumb = document.createElement("div");
      thumb.className = "design-thumb";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        thumb.innerHTML = "";
        const placeholder = document.createElement("div");
        placeholder.className = "design-placeholder";
        placeholder.innerHTML = '<i data-lucide="image"></i><span>Visuel à venir</span>';
        thumb.appendChild(placeholder);
        if (window.lucide) lucide.createIcons();
      });
      thumb.appendChild(img);

      const body = document.createElement("div");
      body.className = "project-body";
      body.innerHTML = `
        <span class="project-category"><i data-lucide="tag"></i> ${escapeHtml(item.category)}</span>
        <h3 class="project-title">${escapeHtml(item.title)}</h3>
        <p class="design-desc">${escapeHtml(item.description)}</p>
      `;

      card.appendChild(thumb);
      card.appendChild(body);
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
