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
      <rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5.5-5.5L3 19"/>
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

  /* ---------- Noir mode toggle (persisted) ---------- */
  const html = document.documentElement;
  const applyMode = on => html.classList.toggle("noir", on);
  applyMode(localStorage.getItem("sagar-noir") === "1");
  document.querySelectorAll(".bp-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const on = !html.classList.contains("noir");
      applyMode(on);
      localStorage.setItem("sagar-noir", on ? "1" : "0");
      burstPetals(btn, on ? "#D9C39A" : "#AE8F56", 14);
    });
  });

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector(".burger");
  const navlinks = document.querySelector(".navlinks");
  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navlinks.classList.toggle("open");
    });
    navlinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      burger.classList.remove("open"); navlinks.classList.remove("open");
    }));
  }

  /* ---------- Hide nav on scroll down, show on scroll up ---------- */
  const topbar = document.querySelector(".topbar");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (topbar) {
      if (y > lastY && y > 140) topbar.classList.add("hide");
      else topbar.classList.remove("hide");
    }
    lastY = y;
    document.getElementById("totop")?.classList.toggle("show", y > 600);
  }, { passive: true });

  /* ---------- Active nav link ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a => {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => { el.style.setProperty("--i", i % 8); io.observe(el); });

  /* ---------- Counters ---------- */
  document.querySelectorAll(".counter .n, .stat .num").forEach(el => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || "";
    const io3 = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io3.disconnect();
        let start = null; const dur = 1400;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io3.observe(el);
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
  });

  /* ---------- Tilt on any static photo/placeholder already in the page ---------- */
  attachTilt(document);

  /* ---------- Back to top ---------- */
  const totop = document.createElement("button");
  totop.id = "totop"; totop.innerHTML = "&uarr;"; totop.setAttribute("aria-label", "Back to top");
  document.body.appendChild(totop);
  totop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Gold petal burst ---------- */
  window.burstPetals = function (originEl, color = "#AE8F56", count = 18) {
    const r = originEl.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      p.style.width = (6 + Math.random() * 6) + "px";
      p.style.height = (6 + Math.random() * 6) + "px";
      p.style.background = color;
      p.style.left = (r.left + r.width / 2) + "px";
      p.style.top = (r.top + r.height / 2) + "px";
      document.body.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 90;
      const dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist - 40;
      p.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 120}px) rotate(${Math.random() * 480}deg)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => p.remove();
    }
  };

});
