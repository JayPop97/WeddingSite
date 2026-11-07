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
const rsvpForm = document.querySelector('#rsvp-form');
const rsvpClosed = document.querySelector('#rsvp-closed');

const johannesburgDateParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Johannesburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).formatToParts(new Date());
const johannesburgDate = Object.fromEntries(johannesburgDateParts.map(({ type, value }) => [type, value]));
const rsvpDateKey = johannesburgDate.year + '-' + johannesburgDate.month + '-' + johannesburgDate.day;
const rsvpIsClosed = rsvpDateKey >= '2026-11-08';

if (rsvpIsClosed) {
  rsvpForm.hidden = true;
  rsvpClosed.hidden = false;
  rsvpClosed.classList.add('visible');
}

if (plusOneAllowed) {
  plusOneField.hidden = false;
  plusOneName.disabled = false;

  const updatePlusOneRequirement = () => {
    const attending = document.querySelector('input[name="attendance"]:checked')?.value === 'Joyfully accepts';
    plusOneName.required = attending;
  };

  attendanceChoices.forEach((choice) => choice.addEventListener('change', updatePlusOneRequirement));
}

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const guestName = data.get('name') || '';
  const details = [
    'Dear Lungelo and Jacob,',
    '',
    'Please find my wedding RSVP details below:',
    '',
    'Full name: ' + guestName,
    plusOneAllowed ? 'Plus-one full name: ' + (data.get('plus_one_full_name') || '') : null,
    'Attendance: ' + (data.get('attendance') || ''),
    'Dietary requirements: ' + (data.get('dietary') || 'None'),
    'Song request: ' + (data.get('song') || 'None'),
    '',
    'Kind regards,',
    guestName,
  ].filter(Boolean);
  const subject = 'Wedding RSVP — Lungelo & Jacob';
  const mailto = 'mailto:olunjeluyisibusiso@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(details.join('\n'));
  window.location.href = mailto;
});
