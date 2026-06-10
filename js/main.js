document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = '#48bb78';
      btn.style.color = '#fff';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  }

  // Filter listings
  const filterBed = document.getElementById('filterBed');
  const filterPrice = document.getElementById('filterPrice');
  const filterStatus = document.getElementById('filterStatus');
  const listingCards = document.querySelectorAll('.listing-card');

  function applyFilters() {
    const bed = filterBed?.value;
    const price = filterPrice?.value;
    const status = filterStatus?.value;

    listingCards.forEach(card => {
      let show = true;
      if (bed && bed !== 'any') {
        const beds = card.dataset.beds;
        if (beds !== bed) show = false;
      }
      if (status && status !== 'any') {
        const s = card.dataset.status;
        if (s !== status) show = false;
      }
      if (price && price !== 'any') {
        const p = parseInt(card.dataset.price);
        const [min, max] = price.split('-').map(Number);
        if (max) {
          if (p < min || p > max) show = false;
        } else {
          if (p < min) show = false;
        }
      }
      card.style.display = show ? 'block' : 'none';
    });
  }

  if (filterBed) filterBed.addEventListener('change', applyFilters);
  if (filterPrice) filterPrice.addEventListener('change', applyFilters);
  if (filterStatus) filterStatus.addEventListener('change', applyFilters);

  // Animate stats on scroll
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length) {
    let animated = false;
    function animateStats() {
      if (animated) return;
      stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[+,]/g, ''));
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = current + (stat.textContent.includes('+') ? '+' : '');
        }, 20);
      });
      animated = true;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    const aboutSection = document.querySelector('.about');
    if (aboutSection) observer.observe(aboutSection);
  }
});
