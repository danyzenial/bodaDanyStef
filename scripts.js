const teamMembers = [
  { name: "Luffy", role: "Founder" },
  { name: "Monkey D. Luffy", role: "Creative Director" },
  { name: "Luffy chan", role: "Lead Developer" },
  { name: "Lucy", role: "UX Designer" },
  { name: "Luffy kun", role: "Marketing Manager" },
  { name: "Monkey chan", role: "Product Manager" },
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const upArrows = document.querySelectorAll(".nav-arrow.up");
const downArrows = document.querySelectorAll(".nav-arrow.down");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    card.classList.remove(
      "center",
      "up-1",
      "up-2",
      "down-1",
      "down-2",
      "hidden"
    );

    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("down-1");
    } else if (offset === 2) {
      card.classList.add("down-2");
    } else if (offset === cards.length - 1) {
      card.classList.add("up-1");
    } else if (offset === cards.length - 2) {
      card.classList.add("up-2");
    } else {
      card.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  //memberName.style.opacity = "0";
  //memberRole.style.opacity = "0";

  setTimeout(() => {
    //memberName.textContent = teamMembers[currentIndex].name;
    //memberRole.textContent = teamMembers[currentIndex].role;
    //memberName.style.opacity = "1";
    //memberRole.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

upArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
  });
});

downArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    updateCarousel(currentIndex + 1);
  });
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
  });
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    updateCarousel(i);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    updateCarousel(currentIndex - 1);
  } else if (e.key === "ArrowDown") {
    updateCarousel(currentIndex + 1);
  }
});

let touchStartX = 0;
let touchEndX = 0;
let scrollTimeout;
let isScrolling = false;

// Scroll event listener
//if u wnat u can timer to disappear that bottom right scroll button - by gopi

// Add scroll indicator
function createScrollIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "scroll-indicator";
  indicator.innerHTML = "scroll";
  document.body.appendChild(indicator);
}

// Initialize scroll indicator
//createScrollIndicator();

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

updateCarousel(0);

//////////////////////////////////////////
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#ffffffff", "#b1b1b1ff", "#ffffffff"]; // colores de partículas minimalistas

// Función para redimensionar canvas y reinicializar partículas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Reinicializar partículas para cubrir todo el nuevo tamaño
  shapes = [];
  for (let i = 0; i < 80; i++) {
    shapes.push(new Shape());
  }
}

class Particle {
  constructor() {
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

    // rebote en los bordes
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();
