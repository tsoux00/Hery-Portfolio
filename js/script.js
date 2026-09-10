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
/* Effet 3D au survol (tilt)                                              */
/* -------------------------------------------------------------------- */

// Calculés une seule fois : pas d'effet sur écran tactile (pas de curseur vers
// lequel s'incliner) ni si l'utilisateur préfère moins d'animations.
const TILT_ENABLED =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TILT_MAX_DEG = 7; // inclinaison volontairement subtile, quelques degrés au plus

/**
 * Les cartes (.project-card, .design-card) jouent une animation CSS d'entrée
 * ("card-in", avec fill-mode "both") lorsqu'elles apparaissent dans la grille.
 * Tant que cette animation reste "accrochée" à l'élément, sa valeur `transform`
 * de fin ("to") passe AVANT tout style inline ou règle `:hover` normale dans la
 * cascade CSS (les animations priment sur les déclarations normales de l'auteur)
 * — ce qui bloque silencieusement aussi bien le survol CSS classique que l'effet
 * de tilt piloté en JS. On libère donc l'animation dès qu'elle se termine, pour
 * que la carte redevienne pilotable normalement.
 */
function releaseEntranceAnimation(card) {
  card.addEventListener("animationend", () => { card.style.animation = "none"; }, { once: true });
}

/**
 * Ajoute un léger effet d'inclinaison 3D (perspective + rotateX/rotateY) qui
 * suit la position du curseur sur chaque carte, avec un retour à plat en
 * douceur à la sortie. À rappeler après chaque re-rendu d'une grille (les
 * cartes recréées n'ont plus d'écouteurs attachés).
 */
function applyTiltEffect(cards) {
  if (!TILT_ENABLED) return;

  cards.forEach((card) => {
    releaseEntranceAnimation(card);
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * TILT_MAX_DEG * 2;
      const rotateX = (0.5 - y) * TILT_MAX_DEG * 2;
      card.style.transition = "transform 80ms ease-out";
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 500ms cubic-bezier(.22,1,.36,1)";
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* -------------------------------------------------------------------- */
/* Projets / Showreel                                                     */
/* -------------------------------------------------------------------- */

/**
 * Tableau des projets — à éditer librement.
 * - id          : identifiant unique (chaîne)
 * - title       : titre affiché sur la carte
 * - category    : une des catégories utilisées dans les filtres
 *                 ("Réalisation", "Design 3D", "Institutionnel", "Événementiel")
 * - description : courte description du projet
 * - date        : date du projet ("AAAA-MM-JJ", "AAAA-MM" ou "AAAA" selon la précision
 *                 connue ; `null` si inconnue), utilisée uniquement comme repère pour
 *                 ordonner le tableau à la main — l'ordre affiché est l'ordre du tableau,
 *                 rien n'est trié automatiquement en JS
 * - youtubeId   : identifiant de la vidéo YouTube (partie après "v=" dans l'URL,
 *                 ex. "https://www.youtube.com/watch?v=XXXXXXXXXXX"), ou `null` en
 *                 attendant le lien : une vignette "Vidéo à venir" s'affiche à la place
 *
 * Ordre actuel : « Projet Tanana Ezaka 2026 » en premier, puis les autres du plus
 * récent au plus ancien (à l'exception de « Une minute, une vie — Kapa Pneu », placée
 * volontairement au milieu du tableau), et « Grande Fête Ciné Extrême » toujours en
 * dernier — ces trois placements sont demandés par Hery, indépendamment de leur date.
 */
const PROJECTS = [
  { id: "p19", title: "Projet Tanana Ezaka 2026", category: "Design 3D", description: "Vidéo de présentation du projet urbain « Tanana Ezaka 2026 ».", date: "2026", youtubeId: "oC9xaex2Vsk" },
  { id: "p5", title: "Générique — Haiko Zany", category: "Design 3D", description: "Habillage et générique de l'émission « Haiko Zany » (2026).", date: "2026", youtubeId: "efM-FiBysi4" },
  { id: "p7", title: "KGC 2026", category: "Événementiel", description: "Couverture vidéo de l'événement KGC 2026.", date: "2026", youtubeId: "IvCq_JyyG5o" },
  { id: "p11", title: "VIVA — Décembre 2025", category: "Réalisation", description: "Rétrospective des programmes de la station VIVA pour décembre 2025.", date: "2025-12", youtubeId: "J9IZwAg9beI" },
  { id: "p9", title: "Misaotra Barea", category: "Événementiel", description: "Hommage vidéo à l'équipe nationale de football, les Barea de Madagascar.", date: "2025-08-31", youtubeId: "3Qh5tOXSpIU" },
  { id: "p10", title: "Sommet COI 2025 — Résumé", category: "Institutionnel", description: "Résumé vidéo du Sommet 2025 de la Commission de l'Océan Indien.", date: "2025", youtubeId: "laHpFcdbrTQ" },
  { id: "p18", title: "Leadership Persons 2025", category: "Événementiel", description: "Couverture vidéo de l'événement « Leadership Persons » (février 2025).", date: "2025-02-22", youtubeId: "I49T8hDq13g" },
  { id: "p6", title: "Fête Nationale — 26 juin", category: "Institutionnel", description: "Captation officielle des cérémonies de la Fête de l'Indépendance de Madagascar.", date: "2024-06-26", youtubeId: "V2JjruNZqbY" },
  { id: "p14", title: "JIOI 2023", category: "Institutionnel", description: "Couverture officielle des Jeux des Îles de l'Océan Indien 2023.", date: "2023", youtubeId: "mvn6HvSLFBQ" },
  { id: "p20", title: "Une minute, une vie — Kapa Pneu", category: "Design 3D", description: "Portrait court format consacré à Kapa Pneu, dans la série « Une minute, une vie ».", date: null, youtubeId: "3ykZH7cnfPo" },
  { id: "p17", title: "SDLD — Viva Madagascar", category: "Réalisation", description: "Émission produite pour Viva Madagascar (2017).", date: "2017", youtubeId: "xBcfno72bxo" },
  { id: "p12", title: "Pâques à Andilana Beach", category: "Événementiel", description: "Animations de Pâques à l'Hôtel Andilana Beach Resort, Nosy Be (2016).", date: "2016", youtubeId: "n47B7-D89LA" },
  { id: "p8", title: "Villaggi Bravo — Le Roi Lion", category: "Événementiel", description: "Spectacle d'animation « The Lion King » à l'Hôtel Andilana Beach, Nosy Be.", date: "2015", youtubeId: "JOKdgL0-yuo" },
  { id: "p13", title: "Villaggi Bravo — Andilana Beach", category: "Événementiel", description: "Spectacle d'animation à l'Hôtel Andilana Beach Resort, Nosy Be (2015).", date: "2015", youtubeId: "U4LUNi0EM1Y" },
  { id: "p2", title: "Présentation 3D — CVO Plus", category: "Design 3D", description: "Vidéo de présentation en images de synthèse pour CVO Plus.", date: null, youtubeId: "ocmkOIFJzPU" },
  { id: "p3", title: "Générique — Yira", category: "Réalisation", description: "Habillage et générique d'ouverture de l'émission « Yira ».", date: null, youtubeId: "N_Esp7ESWis" },
  { id: "p4", title: "Générique — Cuisine Kopenao", category: "Réalisation", description: "Générique d'ouverture d'une émission culinaire produite par Kopenao.", date: null, youtubeId: "WfeAxvPMw9E" },
  { id: "p15", title: "Clip de présentation — COI", category: "Institutionnel", description: "Clip de présentation institutionnel de la Commission de l'Océan Indien.", date: null, youtubeId: "IVXE8LtLhaY" },
  { id: "p16", title: "Spot de sensibilisation", category: "Institutionnel", description: "Spot vidéo de sensibilisation à destination du grand public.", date: null, youtubeId: "YXj9IIvizXM" },
  { id: "p1", title: "Grande Fête Ciné Extrême — spot", category: "Événementiel", description: "Spot de communication annonçant la Grande Fête Ciné Extrême.", date: null, youtubeId: "kvQ4_J98utQ" },
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
      const videoMarkup = project.youtubeId
        ? `<lite-youtube videoid="${project.youtubeId}" playlabel="Lire : ${escapeHtml(project.title)}"></lite-youtube>`
        : `<div class="project-placeholder"><i data-lucide="clapperboard"></i><span>Vidéo à venir</span></div>`;
      card.innerHTML = `
        <div class="project-video">
          ${videoMarkup}
        </div>
        <div class="project-body">
          <span class="project-category"><i data-lucide="tag"></i> ${escapeHtml(project.category)}</span>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-desc">${escapeHtml(project.description)}</p>
        </div>
      `;
      grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    applyTiltEffect(grid.querySelectorAll(".project-card"));
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
      releaseEntranceAnimation(card);
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
