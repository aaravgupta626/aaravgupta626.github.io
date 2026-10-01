/* ===========================================================
   SAGAR CONSTRUCTION CO. — SITE INTERACTIONS
=========================================================== */

/* Shared: elegant media block — real photo or a tasteful placeholder */
window.mediaHTML = function (photo, label) {
  if (photo) {
    return `<div class="pcard-media"><img src="${photo}" alt="${label}" loading="lazy"></div>`;
  }
  return `<div class="pcard-media"><div class="img-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
      <rect x="3" y="5" width="18" height="14" rx="0"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5.5-5.5L3 19"/>
    </svg>
    <span>Photograph coming soon</span>
  </div></div>`;
};

/* Shared: gentle 3D tilt on photo/placeholder elements within a root */
window.attachTilt = function (root) {
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  (root || document).querySelectorAll(".pcard-media, .dphoto, .hero-plate, .portrait").forEach(el => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "1";
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = "perspective(900px) rotateY(0) rotateX(0)"; });
  });
};

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loading scrim ---------- */
  const scrim = document.getElementById("load-scrim");
  const clearScrim = () => scrim && scrim.classList.add("done");
  window.addEventListener("load", () => setTimeout(clearScrim, 350));
  setTimeout(clearScrim, 1800); // fallback in case 'load' is delayed (e.g. slow web fonts)

  /* ---------- Soft gold atmosphere ---------- */
  const gridBg = document.createElement("div");
  gridBg.className = "grid-bg";
  document.body.prepend(gridBg);

  /* ---------- Scroll progress bar ---------- */
  const progress = document.createElement("div");
  progress.id = "scroll-progress";
  document.body.appendChild(progress);
  const updateProgress = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + "%";
  };
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Custom cursor: soft glow dot ---------- */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; });
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(loop); };
    loop();
    document.querySelectorAll("a, button, .pcard, input").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navlinks");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); burger.classList.remove("x");
    }));
  }

  /* ---------- Animated counters (US number format) ---------- */
  const counters = document.querySelectorAll(".counter .n, .stat .num");
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  }), { threshold: .4 });
  counters.forEach(c => cio.observe(c));

  /* ---------- Reveal on scroll ---------- */
  const rio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => rio.observe(el));

  /* ---------- Staggered grids ---------- */
  document.querySelectorAll(".reveal-stagger").forEach(grid => {
    const items = grid.children;
    const gio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { grid.classList.add("in"); gio.disconnect(); }
    }), { threshold: .1 });
    gio.observe(grid);
  });

  /* ---------- Footer year ---------- */
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Back-to-top ---------- */
  const totop = document.getElementById("totop");
  if (totop) {
    addEventListener("scroll", () => totop.classList.toggle("show", scrollY > 600), { passive: true });
    totop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }

});
