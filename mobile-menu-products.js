(() => {
  const button = document.getElementById('menuButton');
  const nav = document.getElementById('mobileNav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const expanded = nav.classList.toggle('active');
    button.setAttribute('aria-expanded', String(expanded));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { nav.classList.remove('active'); button.setAttribute('aria-expanded', 'false'); }
  });
})();
