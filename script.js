// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Typing effect. EDIT the words below.
const words = ['Graphic Designer', 'Layout Artist', 'Digital Illustrator'];
const typed = document.getElementById('typed');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typed.textContent = words[0];
} else {
  let w = 0, c = 0, deleting = false;
  (function type() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    let delay = deleting ? 55 : 110;
    if (!deleting && c === word.length) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    else { c += deleting ? -1 : 1; }
    setTimeout(type, delay);
  })();
}

// If images/profile.jpg is missing, hide the broken image and show initials
document.querySelector('.photo img').addEventListener('error', (e) => e.target.remove());

// Project filter
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const choice = btn.dataset.filter;
    cards.forEach((card) => {
      card.hidden = choice !== 'all' && card.dataset.category !== choice;
    });
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
