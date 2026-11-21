const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const toPage2Btn = document.getElementById('toPage2Btn');
const toPage1Btn = document.getElementById('toPage1Btn');
const smileBtn = document.getElementById('smileBtn');
const smileQuote = document.getElementById('smileQuote');

// EDIT HERE: Custom sweet quotes
const quotes = [
  "\"You're my favorite notification every single day.\"",
  "\"Everything feels a little lighter whenever you're around.\"",
  "\"Still getting butterflies every time you smile.\"",
  "\"No matter how busy life gets, you're always my favorite part.\"",
  "\"Just a reminder: don't forget to eat on time and take care of yourself.\""
];

let quoteIndex = 0;

// Smooth Page Switching
function switchPage(fromPage, toPage) {
  fromPage.style.opacity = '0';
  fromPage.style.transform = 'translateY(10px)';

  setTimeout(() => {
    fromPage.classList.remove('active');
    toPage.classList.add('active');

    // Trigger reflow for smooth entry
    void toPage.offsetWidth;
    toPage.style.opacity = '1';
    toPage.style.transform = 'translateY(0)';
  }, 250);
}

toPage2Btn.addEventListener('click', () => {
  switchPage(page1, page2);
});

toPage1Btn.addEventListener('click', () => {
  switchPage(page2, page1);
});

// Cycle Quotes & Sparkles
smileBtn.addEventListener('click', (e) => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  smileQuote.style.opacity = '0';

  setTimeout(() => {
    smileQuote.textContent = quotes[quoteIndex];
    smileQuote.style.opacity = '1';
  }, 200);

  launchSparkles(e.clientX, e.clientY);
});

// Earth-Tone Confetti Sparkles
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchSparkles(x, y) {
  const colors = ['#C46853', '#6B7A6A', '#D9A773', '#E8ECE7'];
  const originX = x || window.innerWidth / 2;
  const originY = y || window.innerHeight / 2;

  for (let i = 0; i < 28; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12; // gravity
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(index, 1);
      return;
    }

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateConfetti);
}

animateConfetti();