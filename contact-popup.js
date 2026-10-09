(() => {
  const modal = document.getElementById('champsContactModal');
  if (!modal) return;
  const panel = modal.querySelector('.champs-contact-panel');
  const closeButton = modal.querySelector('.champs-contact-close');
  let previousFocus = null;
  const open = () => {
    previousFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('champs-contact-open');
    closeButton.focus();
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.remove('active');
    const menuButton = document.getElementById('menuButton');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  };
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('champs-contact-open');
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  };
  document.querySelectorAll('.champs-contact-trigger').forEach(button => button.addEventListener('click', open));
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  panel.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const elements = [...modal.querySelectorAll('button, a[href]')];
      if (event.shiftKey && document.activeElement === elements[0]) {event.preventDefault(); elements[elements.length - 1].focus();}
      else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) {event.preventDefault(); elements[0].focus();}
    }
  });
})();
