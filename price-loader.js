/* Champs price loader — read-only, no Sanity or login required. */
(async () => {
  try {
    const response = await fetch('./prices.json', {cache: 'no-cache'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let count = 0;
    const money = n => `RM ${Number(n).toFixed(2)}`;
    document.querySelectorAll('[data-price-id]').forEach(card => {
      const entry = data[card.dataset.priceId];
      if (!entry || !Array.isArray(entry.prices) || !entry.prices.length) return;
      const options = entry.prices;
      if (!options.every(p => typeof p.label === 'string' && typeof p.amount === 'number' && Number.isFinite(p.amount) && p.amount >= 0)) return;
      const cake = card.querySelector('.whole-cake-prices');
      if (cake) {
        cake.querySelectorAll('span').forEach(span => {
          const label = span.querySelector('small')?.textContent.trim();
          const price = options.find(p => p.label === label);
          const target = span.querySelector('strong');
          if (price && target) target.textContent = money(price.amount);
        });
        count++;
        return;
      }
      const target = card.querySelector('.menu-product-price');
      if (!target) return;
      const isMulti = options.length > 1;
      target.textContent = options.map(p => {
        const label = p.label === 'Standard' ? '' : `${p.label} `;
        return `${label}${money(p.amount)}`;
      }).join(isMulti && options.some(p => /pcs$/i.test(p.label)) ? '; ' : ' · ');
      count++;
    });
    console.info(`Champs prices loaded: ${count} product cards.`);
  } catch (err) {
    console.warn('Could not load prices.json; showing original prices.', err);
  }
})();
