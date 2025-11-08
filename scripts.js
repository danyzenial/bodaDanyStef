/////////////////////// PANTALLA DE CARGA
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  }, 3000);

  // Capturar el valor "asientos" de la URL
  const params = new URLSearchParams(window.location.search);
  const asientos = params.get("x") || 0; // si no hay valor, mostrar 0
  document.getElementById("numero-asientos").textContent = asientos;
});

/////////////////////// MÚSICA
const audio = document.getElementById("myAudio");
const btn = document.getElementById("playPauseBtn");

btn.addEventListener("click", () => {
  const isPaused = audio.paused;
  audio[isPaused ? "play" : "pause"]();
  btn.innerHTML = `<i class="fas fa-${isPaused ? "pause" : "play"}"></i>`;
});

/////////////////////// PARTICULAS
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");
const colors = ["#26863aff", "#ddecdeff", "#0a7b21ff"];
const particles = [];
const PARTICLE_COUNT = 80;

const resizeCanvas = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
})();

/////////////////////// CUENTA REGRESIVA
const pad = (n) => n.toString().padStart(2, "0");
const targetDate = new Date(new Date().getFullYear(), 11, 6, 16, 0, 0);
const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function updateCountdown() {
  const diff = Math.max(0, targetDate - new Date());
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  els.days.textContent = pad(d);
  els.hours.textContent = pad(h);
  els.minutes.textContent = pad(m);
  els.seconds.textContent = pad(sec);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/////////////////////// MAPA
function openMaps(e) {
  e.preventDefault();
  const address = encodeURIComponent("Jardines La Esperanza Calle Falsa 123");
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${address}`,
    "_blank"
  );
}

/////////////////////// ANIMACIONES ON SCROLL
const observer = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".animar").forEach((el) => observer.observe(el));

/////////////////////// CAROUSEL
const items = document.querySelectorAll(".carousel-item");
let current = 0;

const updateCarousel = () => {
  const total = items.length;
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  items.forEach((item, i) => {
    const isCurrent = i === current;
    const isPrev = i === prev;
    const isNext = i === next;

    item.style.opacity = isCurrent ? 1 : 0.6;
    item.style.zIndex = isCurrent ? 10 : 5;
    item.style.filter = `grayscale(${isCurrent ? 0 : 100}%)`;
    item.style.transform = isCurrent
      ? "translate(-50%, -50%) scale(1)"
      : `translate(-50%, ${isPrev ? "-75%" : "-25%"}) scale(0.7)`;
  });
};

document.getElementById("next").onclick = () => {
  current = (current + 1) % items.length;
  updateCarousel();
};
document.getElementById("prev").onclick = () => {
  current = (current - 1 + items.length) % items.length;
  updateCarousel();
};

updateCarousel();
