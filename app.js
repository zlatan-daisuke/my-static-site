// ── Navbar: scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Navbar: mobile toggle ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Stats: animated counter ────────────────────────────────────
const statNumbers  = document.querySelectorAll('.stat-number');
const statsSection = document.getElementById('stats');
let countersRun    = false;

function runCounters() {
  statNumbers.forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const tick = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(tick);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    runCounters();
  }
}, { threshold: 0.25 }).observe(statsSection);

// ── Timeline: scroll-in animation ─────────────────────────────
const tlItems = document.querySelectorAll('.tl-item');

const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

tlItems.forEach(item => tlObserver.observe(item));

// ── Quotes: slider ─────────────────────────────────────────────
const cards   = document.querySelectorAll('.quote-card');
const dotsEl  = document.getElementById('qDots');
let current   = 0;

// Build dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function goTo(index) {
  cards[current].classList.remove('active');
  dotsEl.children[current].classList.remove('active');
  current = (index + cards.length) % cards.length;
  cards[current].classList.add('active');
  dotsEl.children[current].classList.add('active');
}

document.getElementById('quotePrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('quoteNext').addEventListener('click', () => goTo(current + 1));

// Auto-advance every 5 s
setInterval(() => goTo(current + 1), 5000);
