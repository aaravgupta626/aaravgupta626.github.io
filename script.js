// Theme toggle with localStorage
(function() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('theme-dark');
    toggleBtn.setAttribute('aria-pressed', 'true');
  }

  toggleBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

// Collapsible experience sections
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-target');
    const panel = document.getElementById(id);
    const isHidden = panel.hasAttribute('hidden');
    if (isHidden) {
      panel.removeAttribute('hidden');
      btn.textContent = 'Hide details';
    } else {
      panel.setAttribute('hidden', '');
      btn.textContent = 'Show details';
    }
  });
});

// Footer year + back-to-top link smooth behavior
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('toTop').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
