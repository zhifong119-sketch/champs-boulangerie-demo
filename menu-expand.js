document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section.menu-page-section').forEach(section => {
    const grid = section.querySelector('.menu-product-grid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll(':scope > .menu-product-card')];
    if (cards.length <= 3) return;
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'menu-expand-button';
    control.textContent = 'See All';
    control.setAttribute('aria-expanded', 'false');
    grid.after(control);
    let expanded = false;
    const render = () => {
      cards.forEach((card, i) => { card.hidden = !expanded && i >= 3; });
      control.textContent = expanded ? 'Show Less' : 'See All';
      control.setAttribute('aria-expanded', String(expanded));
    };
    control.addEventListener('click', () => { expanded = !expanded; render(); if (!expanded) section.scrollIntoView({behavior:'smooth',block:'start'}); });
    render();
  });
  document.querySelectorAll('.drink-variant-button').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.drink-product-card');
      const img = card?.querySelector('.menu-product-image img');
      if (img) img.src = button.dataset.src;
    });
  });
});
