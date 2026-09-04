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

const plusOneAllowed = new URLSearchParams(window.location.search).get('plus-one') === '1';
const plusOneField = document.querySelector('#plus-one-field');
const plusOneName = document.querySelector('#plus-one-name');
const attendanceChoices = document.querySelectorAll('input[name="attendance"]');

if (plusOneAllowed) {
  plusOneField.hidden = false;
  plusOneName.disabled = false;

  const updatePlusOneRequirement = () => {
    const attending = document.querySelector('input[name="attendance"]:checked')?.value === 'Joyfully accepts';
    plusOneName.required = attending;
  };

  attendanceChoices.forEach((choice) => choice.addEventListener('change', updatePlusOneRequirement));
}

document.querySelector('#rsvp-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('.button-label');
  const success = form.querySelector('.form-success');
  const error = form.querySelector('.form-error');

  success.hidden = true;
  error.hidden = true;
  button.disabled = true;
  label.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('RSVP submission failed');

    form.reset();
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (submissionError) {
    console.error(submissionError);
    error.hidden = false;
  } finally {
    button.disabled = false;
    label.textContent = 'Send RSVP';
  }
});
