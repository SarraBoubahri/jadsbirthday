/* Site anniversaire de Jad — v2 */
const $ = (id) => document.getElementById(id);
const stage = $('stage');
const setState = (s) => (stage.dataset.state = s);

const APPS = [
  ['fas fa-camera', 'Photo'], ['fas fa-image', 'Photos'], ['fas fa-map-marker-alt', 'Plans'], ['fas fa-calendar', 'Agenda'],
  ['fas fa-music', 'Musique'], ['fas fa-gamepad', 'Jeux'], ['fas fa-cog', 'Réglages'], ['fas fa-clock', 'Horloge']
];
const DOCK = ['fas fa-phone', 'fab fa-safari', 'fas fa-comment'];

function build() {
  $('apps').innerHTML = APPS.map(([ic, n], i) =>
    `<div class="app" style="animation-delay:${i * 0.06}s"><i class="${ic}"></i><span>${n}</span></div>`).join('');
  $('dock').innerHTML = DOCK.map((ic) => `<button type="button" tabindex="-1" aria-hidden="true"><i class="${ic}"></i></button>`).join('') +
    `<button type="button" class="gift" id="gift" aria-label="Cadeau"><i class="fas fa-gift"></i></button>`;

  const p = $('particles');
  for (let i = 0; i < 18; i++) {
    const d = document.createElement('div'), s = Math.random() * 4 + 2;
    d.className = 'particle';
    d.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${s}px;height:${s}px;` +
      `animation-duration:${Math.random() * 10 + 12}s;animation-delay:-${Math.random() * 15}s`;
    p.appendChild(d);
  }
}

function intro() {
  $('apps').classList.add('in');
  setTimeout(() => $('gift').classList.add('show'), 1200);
}

function reset() {
  setState('home');
  $('case').style.removeProperty('--rx');
}

build();
intro();

$('gift').addEventListener('click', () => setState('claim'));
$('claim').addEventListener('click', () => {
  setState('flip');
  setTimeout(() => setState('case'), 1100);
});
$('replay').addEventListener('click', reset);

/* Choix de couleur de la coque */
document.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.sw').forEach((x) => x.classList.remove('on'));
  b.classList.add('on');
  document.documentElement.style.setProperty('--c2', b.dataset.a);
  document.documentElement.style.setProperty('--c1', b.dataset.b);
}));

/* Inclinaison 3D de la coque (souris et doigt) */
const tilt = $('case');
function onMove(e) {
  if (stage.dataset.state !== 'case') return;
  const r = tilt.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
  const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  const k = (v) => Math.max(-1, Math.min(1, v));
  tilt.style.setProperty('--ry', `${k(x) * 22}deg`);
  tilt.style.setProperty('--rx', `${k(-y) * 16}deg`);
}
stage.addEventListener('pointermove', onMove);
stage.addEventListener('pointerleave', () => {
  tilt.style.setProperty('--ry', '0deg');
  tilt.style.setProperty('--rx', '0deg');
});
