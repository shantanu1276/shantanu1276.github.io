// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Theme toggle (remembers choice) ----
const root = document.documentElement;
document.getElementById('theme').addEventListener('click', () => {
  const dark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#1d2431';
  const next = dark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---- Typing effect (edit the roles here) ----
const roles = ['CSE undergraduate', 'problem solver', 'web developer'];
const typed = document.getElementById('typed');
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
}
type();

// ---- Reveal sections once + highlight active nav link ----
const links = document.querySelectorAll('.nav nav a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.25 });
document.querySelectorAll('section').forEach(s => io.observe(s));

// ---- Contact form: validation + send to Formspree ----
const form = document.getElementById('form');
const msg = document.getElementById('msg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('input,textarea').forEach(f => {
    const valid = f.value.trim() && f.checkValidity();
    f.classList.toggle('bad', !valid);
    if (!valid) ok = false;
  });
  if (!ok) { msg.textContent = 'Please fill in every field with a valid email.'; return; }
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (res.ok) { msg.textContent = 'Message sent. Thank you!'; form.reset(); }
    else msg.textContent = 'Could not send. Check your Formspree form ID.';
  } catch (err) { msg.textContent = 'Network error. Try again or email me directly.'; }
});
