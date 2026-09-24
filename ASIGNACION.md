# Integrantes 
Juan David Rojas Villegas
Ana Isabel Patiño Carvajal

# Asignación de pantallas
Cátalogo de la semana- Ana Isabel Patiño 
Detalle de evento y reserva - Juan DAvid Rojas

## Plan catálogo de la semana. 
### Header 
- Logo 
- Barra de busqueda con flexbox
- 4 botones: ubicación actual, publicación de evento, notificaciones y perfil.

### Main
#### Seccion 1: exploración rápida. 
- Articles con los eventos más solicitados esa semana. 
- Section de bsuqueda rápida con fecha con botones de explorar eventos y llevar al mapa. 
#### Sección 2: filtrado por tipo de evento.
-  Conteiner tipo carrusel con chips que indiquen los disntos eventos. 

#### Sección 3: eventos más prestigiosos.
- Conteiner tipo carrusel dinámico donde se filtren los eventos más sonados. 

#### Sección 4: exploración por medio de mapa. 
- Sección exploratorio del mapa. 
- Botón que redirija a navegación con el mapa. 

### Footer
- div de información básica sobre la empresa. 
- div descripción de categorías usadas en la plataforma. 
- Sección suscripción de recomendaciones. 
- Derechos de autor. 

### Detalle de evento y reserva

## 1. Navegación (`<header id="siteHeader">`)

**Estructura** (idéntica en `index.html` y `evento.html`):

```
header
 ├── div.max-w-[1440px]  (contenedor centrado, alto 80px)
 │    ├── logo "NEXO" (texto, no imagen)
 │    ├── nav desktop (Explorar / Eventos / Categorías / Comunidades) — oculta en <1024px
 │    ├── buscador simulado (oculto en mobile)
 │    └── acciones: botón buscar (mobile), "Crear evento", avatar, botón hamburguesa
 └── nav#mobileMenu (colapsable, oculta en desktop)
```

- El link activo se marca con `bg-ink text-cream` (fondo negro) — en `index.html` es "Explorar", en `evento.html` es "Eventos".
- **CSS**: `#mobileMenu` usa `max-height` animado (0 → 640px) en vez de `display:none`, para que la transición sea suave.
- **JS** (`initMobileMenu`, `initHeaderShadow`): el botón hamburguesa alterna la clase `.open` y cambia el ícono `menu` ↔ `close`; al hacer scroll >8px el header gana una sombra sutil.

---

## 2. Hero (solo en `detalle-evento.html`)

Grid de 12 columnas → 6 col texto / 6 col imagen:

- Badge pill ("Agenda cultural de Barcelona") + `<h1>` con clamp manual vía Tailwind (`text-[38px] md:text-[56px]`) + descripción + 2 CTAs (`btn-primary` y `btn-secondary`) + fila de estadísticas (1.240+ eventos, etc.)
- El placeholder de imagen usa la clase `.img-placeholder` (definida en `styles.css`): fondo `#F5E8D3` con líneas diagonales sutiles + una tarjeta flotante inferior simulando el evento del momento.
- No lleva JS propio, solo los `href="#explorar"` que hacen scroll nativo (`scroll-behavior: smooth` en el `<html>`).

---

## 3. Categorías

```html
<div id="categoriesGrid"><!-- vacío en el HTML --></div>
```

El grid **no está escrito a mano** — se genera en `app.js`:

```js
CATEGORIES = [{key:"musica",count:128}, ...]      // datos
CATEGORY_META = {musica:{color:"#9B5DE5", icon:"graphic_eq"}, ...} // colores fijos de tu paleta
categoryCard(cat) → devuelve el HTML de una tarjeta
renderInto("categoriesGrid", CATEGORIES.map(categoryCard).join(""))
```

Así, si mañana agregas una categoría nueva, solo tocas el array `CATEGORIES`, no el HTML. Cada tarjeta usa el color de categoría como fondo suave del ícono (`background:${color}22` = 13% opacidad aprox).

---

## 4. Eventos (tarjetas)

Mismo patrón: `eventCard(ev)` en `app.js` arma cada tarjeta a partir del array `EVENTS` (título, categoría, fecha, precio, badge, `imageLabel`). Se usa en **dos lugares distintos**:

- `#featuredEventsGrid` → solo los primeros 3 (`EVENTS.slice(0,3)`)
- `#exploreEventsGrid` → los 6 completos

Cada tarjeta trae:

- Imagen placeholder con `data-category` en el `<article>` (esto es clave para el filtro, ver punto 5)
- Badge de estado (POPULAR / GRATIS / HOY / ÚLTIMOS CUPOS) con color condicional en JS
- Botón de favorito (❤) — clase `.fav-btn`, escuchado por delegación de eventos (`initFavorites`) para que funcione aunque la tarjeta se haya creado dinámicamente
- Hover: `.event-card:hover` sube la tarjeta `-3px` y agranda la imagen `scale(1.03)` (definido en `styles.css`, no en Tailwind inline)

---

## 5. Exploración (buscador + filtros)

Es un `<form id="exploreSearchForm">` con 4 campos (texto, ubicación, fecha, orden) + botón buscar, y debajo una fila de **chips de categoría** (`data-filter-chip="musica"`, etc.)

**JS** (`initCategoryFilterChips`): al hacer clic en un chip:

1. Quita el estilo "activo" a todos los demás
2. Pinta el chip clickeado de negro
3. Recorre `#exploreEventsGrid [data-category]` y oculta (`display:none`) las tarjetas que no coincidan

Es un filtro 100% visual/cliente — no hay backend, pero queda la lógica lista para conectarse a una API real más adelante (bastaría con reemplazar el `.forEach` por un `fetch`).

El submit del formulario (`initSearchFacade`) solo hace scroll a la sección — es el "hueco" donde luego conectarías una búsqueda real.

---

## 6. Mapa (placeholder)

No es una imagen ni Google Maps — es HTML/CSS puro (`.map-placeholder` en `styles.css`):

- `div.map-water`, `div.map-block`, `div.map-road` — rectángulos posicionados con `%` para simular manzanas, calles y agua
- `.map-pin` — un div rotado 45° (para dar forma de "gota") con un ícono adentro; el pin activo tiene un `<div class="pin-ripple">` con animación `@keyframes ripple` (expandir + desvanecer en loop)

Aparece en dos lugares con datos distintos: el mapa general de "Explorar" (`index.html`) y el mapa de ubicación del evento (`evento.html`, sección "Ubicación y llegada"). Cuando conectes un mapa real (Google Maps, Mapbox), reemplazas el `<div class="map-placeholder">...</div>` completo por el contenedor del SDK — el `border-radius`, alto y sombra del wrapper exterior ya quedan listos, no hay que tocar el layout.
