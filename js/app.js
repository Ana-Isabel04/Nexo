/* ==========================================================================
   NEXO — app.js
   Componentes reutilizables + interacciones vanilla JS.
   Sin backend, sin build step. Pensado para reemplazar datos/placeholders
   fácilmente cuando lleguen las imágenes reales.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DATOS (reemplazar por datos reales / fetch a una API en el futuro)
   -------------------------------------------------------------------------- */
const CATEGORY_META = {
  musica:      { label: "Música",           color: "#9B5DE5", icon: "graphic_eq" },
  arte:        { label: "Arte",             color: "#FF6B6B", icon: "palette" },
  gastronomia: { label: "Gastronomía",      color: "#F4A261", icon: "restaurant" },
  deportes:    { label: "Deportes",         color: "#2A9D8F", icon: "sports_soccer" },
  cultura:     { label: "Cultura",          color: "#E76F51", icon: "theater_comedy" },
  educacion:   { label: "Educación",        color: "#457B9D", icon: "school" },
  tecnologia:  { label: "Tecnología",       color: "#4361EE", icon: "memory" },
  ferias:      { label: "Ferias y mercados",color: "#F72585", icon: "storefront" },
};

const CATEGORIES = [
  { key: "musica",      count: 128 },
  { key: "arte",        count: 74 },
  { key: "gastronomia", count: 96 },
  { key: "deportes",    count: 52 },
  { key: "cultura",     count: 83 },
  { key: "educacion",   count: 41 },
  { key: "tecnologia",  count: 67 },
  { key: "ferias",      count: 39 },
];

const EVENTS = [
  {
    id: "sunset-sessions",
    title: "Sunset Sessions: Jazz Contemporáneo & Vinos Naturales",
    category: "musica",
    date: "Sáb 13 Mayo",
    time: "19:30",
    location: "Poblenou Sky Lounge",
    price: "$35.000",
    badge: "POPULAR",
    imageLabel: "EVENT CARD — SUNSET SESSIONS",
  },
  {
    id: "mercado-terracota",
    title: "Mercado Terracota: Ceramistas y Diseño Independiente",
    category: "ferias",
    date: "Dom 14 Mayo",
    time: "11:00",
    location: "Nave Central, Poblenou",
    price: "GRATIS",
    badge: "GRATIS",
    imageLabel: "EVENT CARD — MERCADO TERRACOTA",
  },
  {
    id: "noche-de-vinilos",
    title: "Noche de Vinilos: Selección Post-Punk & New Wave",
    category: "musica",
    date: "Vie 19 Mayo",
    time: "22:00",
    location: "Sala Apolo",
    price: "$28.000",
    badge: "HOY",
    imageLabel: "EVENT CARD — NOCHE DE VINILOS",
  },
  {
    id: "cata-natural",
    title: "Cata Guiada: Vinos Naturales de Terra Alta",
    category: "gastronomia",
    date: "Sáb 20 Mayo",
    time: "18:00",
    location: "Celler Urbà",
    price: "$42.000",
    badge: "ÚLTIMOS CUPOS",
    imageLabel: "EVENT CARD — CATA NATURAL",
  },
  {
    id: "muralismo-urbano",
    title: "Recorrido de Muralismo Urbano en El Raval",
    category: "arte",
    date: "Dom 21 Mayo",
    time: "10:30",
    location: "El Raval",
    price: "$15.000",
    badge: "",
    imageLabel: "EVENT CARD — MURALISMO URBANO",
  },
  {
    id: "demo-day-tech",
    title: "Demo Day: Startups Culturales & Creative Tech",
    category: "tecnologia",
    date: "Jue 25 Mayo",
    time: "17:00",
    location: "Pier01, Barcelona Tech City",
    price: "$18.000",
    badge: "POPULAR",
    imageLabel: "EVENT CARD — DEMO DAY TECH",
  },
];

const REVIEWS = [
  {
    name: "Clara Valls",
    role: "Asistió a la sesión de Abril · Arquitecta",
    rating: 5,
    date: "Hace 3 semanas",
    comment: "El acústico logra en esta azotea es sobrecogedora. El atardecer detrás de la Sagrada Família mientras sonaba el solo de sax y el aroma de naranjo de Terra Alta fue, sin exagerar, uno de los mejores momentos culturales del año en Barcelona.",
    helpful: 24,
    imageLabel: "AVATAR — CLARA VALLS",
  },
  {
    name: "Mateo Giménez",
    role: "Comprador verificado · Productor musical",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Organización impecable. Sin aglomeraciones, aforo respetado al milímetro y las entradas siempre llegan bien de baja intervención. Repetiré seguro con amigos de fuera.",
    helpful: 9,
    imageLabel: "AVATAR — MATEO GIMÉNEZ",
  },
  {
    name: "Laura Duprat",
    role: "Asistente habitual NEXO",
    rating: 4,
    date: "Hace 1 mes",
    comment: "El ambiente es sublime. Recomiendo llegar puntual a las 19:30 para tomar sitio en primera fila frente a los músicos y disfrutar de la transición de luz al atardecer.",
    helpful: 15,
    imageLabel: "AVATAR — LAURA DUPRAT",
  },
];

/* --------------------------------------------------------------------------
   2. PLACEHOLDER — reemplazar fácilmente por <img>
   -------------------------------------------------------------------------- */
function placeholder(label, { icon = "image", size = "" } = {}) {
  return `
    <!-- IMAGE: ${label} -->
    <div class="img-placeholder ${size}" role="img" aria-label="Imagen pendiente: ${label}">
      <div class="ph-inner">
        <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
        <span class="ph-label">${label}</span>
      </div>
    </div>`;
}

function avatarPlaceholder(label, px = 48) {
  return `
    <!-- IMAGE: ${label} -->
    <div class="avatar-placeholder" style="width:${px}px;height:${px}px;" role="img" aria-label="Avatar pendiente: ${label}">
      <span class="material-symbols-outlined" aria-hidden="true">person</span>
    </div>`;
}

/* --------------------------------------------------------------------------
   3. COMPONENTES
   -------------------------------------------------------------------------- */
function categoryCard(cat) {
  const meta = CATEGORY_META[cat.key];
  return `
    <a href="index.html#explorar" data-category="${cat.key}"
       class="category-card group flex flex-col gap-3 p-5 rounded-2xl bg-white border border-[rgba(23,21,31,0.08)] shadow-[0_4px_20px_-2px_rgba(23,21,31,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(23,21,31,0.10)]">
      <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background:${meta.color}22;">
        <span class="material-symbols-outlined" style="color:${meta.color};" aria-hidden="true">${meta.icon}</span>
      </div>
      <div>
        <p class="font-display font-semibold text-[15px] text-ink leading-tight">${meta.label}</p>
        <p class="text-[13px] text-ink/55">${cat.count} eventos</p>
      </div>
    </a>`;
}

function eventCard(ev) {
  const meta = CATEGORY_META[ev.category];
  const badgeMarkup = ev.badge
    ? `<span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white shadow-sm" style="background:${
        ev.badge === "GRATIS" ? "#8FD6A5" : ev.badge === "POPULAR" ? "#FFD85C" : ev.badge === "HOY" ? "#17151F" : "#FF7568"
      }; color:${ev.badge === "GRATIS" || ev.badge === "POPULAR" ? "#17151F" : "#FFFFFF"};">${ev.badge}</span>`
    : "";

  return `
    <article class="event-card overflow-hidden flex flex-col" data-category="${ev.category}">
      <div class="relative aspect-[16/10] overflow-hidden">
        <div class="event-card-img w-full h-full">
          ${placeholder(ev.imageLabel, { icon: "image" })}
        </div>
        ${badgeMarkup}
        <span class="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white" style="background:${meta.color};">
          <span class="material-symbols-outlined text-xs" aria-hidden="true">${meta.icon}</span>
        </span>
        <button type="button" class="fav-btn absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform" aria-label="Guardar ${ev.title} en favoritos" aria-pressed="false">
          <span class="material-symbols-outlined text-ink text-lg" aria-hidden="true">favorite</span>
        </button>
      </div>
      <div class="p-4 flex flex-col gap-2 flex-1">
        <div class="flex items-center gap-2 text-[12px] text-ink/55">
          <span class="material-symbols-outlined text-sm" aria-hidden="true">calendar_today</span>
          <span>${ev.date} · ${ev.time}</span>
        </div>
        <h3 class="font-display font-semibold text-[16px] leading-snug text-ink line-clamp-2">
          <a href="evento.html" class="hover:underline decoration-2 underline-offset-2">${ev.title}</a>
        </h3>
        <div class="flex items-center gap-1.5 text-[13px] text-ink/60">
          <span class="material-symbols-outlined text-sm" aria-hidden="true">location_on</span>
          <span class="truncate">${ev.location}</span>
        </div>
        <div class="mt-auto pt-2 flex items-center justify-between border-t border-[rgba(23,21,31,0.06)]">
          <span class="font-display font-bold text-[15px] text-ink">${ev.price === "GRATIS" ? "Gratis" : ev.price}</span>
          <a href="evento.html" class="inline-flex items-center gap-1 text-[13px] font-display font-semibold text-ink hover:gap-2 transition-all" aria-label="Ver detalle de ${ev.title}">
            Ver evento <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>`;
}

function reviewCard(r) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    `<span class="material-symbols-outlined text-[15px]" style="font-variation-settings:'FILL' ${i < r.rating ? 1 : 0}; color:${i < r.rating ? "#FFD85C" : "rgba(23,21,31,0.18)"};" aria-hidden="true">star</span>`
  ).join("");

  return `
    <div class="p-5 rounded-2xl bg-white border border-[rgba(23,21,31,0.08)] flex flex-col gap-3">
      <div class="flex items-start gap-3">
        ${avatarPlaceholder(r.imageLabel, 44)}
        <div class="flex-1 min-w-0">
          <p class="font-display font-semibold text-[14px] text-ink truncate">${r.name}</p>
          <p class="text-[12px] text-ink/55 truncate">${r.role}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-0.5" aria-label="${r.rating} de 5 estrellas">${stars}</div>
        <span class="text-[12px] text-ink/45">${r.date}</span>
      </div>
      <p class="text-[14px] leading-relaxed text-ink/80">“${r.comment}”</p>
      <button type="button" class="self-start text-[12px] font-medium text-ink/55 hover:text-ink inline-flex items-center gap-1">
        <span class="material-symbols-outlined text-sm" aria-hidden="true">thumb_up</span>
        ${r.helpful} personas lo encontraron útil
      </button>
    </div>`;
}

/* --------------------------------------------------------------------------
   4. RENDER — inyecta los componentes donde corresponda
   -------------------------------------------------------------------------- */
function renderInto(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function renderHomeCollections() {
  renderInto("categoriesGrid", CATEGORIES.map(categoryCard).join(""));
  renderInto("featuredEventsGrid", EVENTS.slice(0, 3).map(eventCard).join(""));
  renderInto("exploreEventsGrid", EVENTS.map(eventCard).join(""));
}

function renderReviews() {
  renderInto("reviewsList", REVIEWS.map(reviewCard).join(""));
}

/* --------------------------------------------------------------------------
   5. INTERACCIONES
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
  });
}

function initHeaderShadow() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("shadow-[0_2px_16px_rgba(23,21,31,0.06)]", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initFavorites() {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-btn");
    if (!btn) return;
    const active = btn.classList.toggle("active");
    btn.setAttribute("aria-pressed", String(active));
  });
}

function initCategoryFilterChips() {
  const chips = document.querySelectorAll("[data-filter-chip]");
  const cards = () => document.querySelectorAll("#exploreEventsGrid [data-category]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        c.setAttribute("aria-pressed", "false");
        c.classList.remove("bg-ink", "text-cream", "border-ink");
        c.classList.add("bg-white");
      });
      chip.setAttribute("aria-pressed", "true");
      chip.classList.add("bg-ink", "text-cream", "border-ink");
      chip.classList.remove("bg-white");

      const value = chip.dataset.filterChip;
      cards().forEach((card) => {
        card.style.display = value === "todas" || card.dataset.category === value ? "" : "none";
      });
    });
  });
}

function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const buttons = group.querySelectorAll("[role='tab']");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
        btn.setAttribute("aria-selected", "true");
        const panels = document.querySelectorAll(`[data-tabpanel-group="${group.dataset.tabs}"]`);
        panels.forEach((p) => p.classList.add("hidden"));
        const target = document.getElementById(btn.getAttribute("aria-controls"));
        if (target) target.classList.remove("hidden");
      });
    });
  });
}

function initAccordion() {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
      trigger.setAttribute("aria-expanded", String(!wasOpen));
    });
  });
}

function initTicketStepper() {
  const stepper = document.getElementById("ticketStepper");
  if (!stepper) return;
  const countEl = document.getElementById("ticketCount");
  const unitPrice = 35000;
  const serviceFee = 8000;
  const decreaseBtn = document.getElementById("ticketDecrease");
  const increaseBtn = document.getElementById("ticketIncrease");
  const subtotalEl = document.getElementById("ticketSubtotal");
  const serviceFeeEl = document.getElementById("ticketServiceFee");
  const totalEl = document.getElementById("ticketTotal");
  const countLabelEl = document.getElementById("ticketCountLabel");

  const format = (n) => "$" + n.toLocaleString("es-CL");

  function update() {
    let count = parseInt(countEl.textContent, 10);
    count = Math.min(8, Math.max(1, count));
    countEl.textContent = count;
    if (countLabelEl) countLabelEl.textContent = count;
    const subtotal = count * unitPrice;
    const total = subtotal + serviceFee;
    if (subtotalEl) subtotalEl.textContent = format(subtotal);
    if (serviceFeeEl) serviceFeeEl.textContent = format(serviceFee);
    if (totalEl) totalEl.textContent = format(total);
  }

  decreaseBtn?.addEventListener("click", () => {
    countEl.textContent = parseInt(countEl.textContent, 10) - 1;
    update();
  });
  increaseBtn?.addEventListener("click", () => {
    countEl.textContent = parseInt(countEl.textContent, 10) + 1;
    update();
  });
  update();
}

function initSearchFacade() {
  const form = document.getElementById("exploreSearchForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initGalleryOverlay() {
  const overlayTrigger = document.getElementById("galleryMoreBtn");
  overlayTrigger?.addEventListener("click", () => {
    document.getElementById("gallerySection")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* --------------------------------------------------------------------------
   6. INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHomeCollections();
  renderReviews();
  initMobileMenu();
  initHeaderShadow();
  initFavorites();
  initCategoryFilterChips();
  initTabs();
  initAccordion();
  initTicketStepper();
  initSearchFacade();
  initGalleryOverlay();

  document.getElementById("yearNow") &&
    (document.getElementById("yearNow").textContent = new Date().getFullYear());
});
