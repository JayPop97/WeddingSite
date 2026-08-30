const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));

document.querySelector('#rsvp-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Wedding RSVP — ${data.get('name')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Response: ${data.get('attendance')}`,
    `Number of guests: ${data.get('guests')}`,
    `Dietary requirements: ${data.get('dietary') || 'None'}`,
    `Song request: ${data.get('song') || 'None'}`,
  ].join('\n');
  document.querySelector('.form-success').hidden = false;
  window.location.href = `mailto:rsvp@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
