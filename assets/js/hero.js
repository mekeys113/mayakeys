const text =
  "Computer Science @ Caltech · Computer Vision and Multimodal Learning";
const speed = 38;

const hero = document.getElementById("hero");
const site = document.getElementById("site-content");
const typed = document.getElementById("typed-text");
const heroText = document.getElementById("hero-text");
const heroPhoto = document.getElementById("hero-photo");

if (!hero || !site || !typed || !heroText || !heroPhoto) {
  console.error("Hero elements missing");
}

/* -------------------------------
   IMMEDIATE INTRO STATE (NO DELAY)
-------------------------------- */
(function setIntroTransforms() {
  const tRect = heroText.getBoundingClientRect();
  const pRect = heroPhoto.getBoundingClientRect();

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Where intro should START (centered)
  const startTextCx = vw * 0.38;
  const startTextCy = vh * 0.55;

  const startPhotoCx = vw * 0.5;
  const startPhotoCy = vh * 0.4;

  const tCx = tRect.left + tRect.width / 2;
  const tCy = tRect.top + tRect.height / 2;

  const pCx = pRect.left + pRect.width / 2;
  const pCy = pRect.top + pRect.height / 2;

  heroText.style.transition = "none";
  heroPhoto.style.transition = "none";

  heroText.style.transform = `translate(${startTextCx - tCx}px, ${startTextCy - tCy}px)`;
  heroPhoto.style.transform = `translate(${startPhotoCx - pCx}px, ${startPhotoCy - pCy}px)`;
})();

/* -------------------------------
   TYPING + EXIT
-------------------------------- */
let i = 0;

function type() {
  if (i < text.length) {
    typed.textContent += text.charAt(i++);
    setTimeout(type, speed);
  } else {
    setTimeout(finishHero, 500);
  }
}

function finishHero() {
  site.classList.remove("hidden");

  heroText.style.transition =
    "transform 900ms cubic-bezier(.2,.8,.2,1)";
  heroPhoto.style.transition =
    "transform 900ms cubic-bezier(.2,.8,.2,1)";

  requestAnimationFrame(() => {
    heroText.style.transform = "translate(0,0)";
    heroPhoto.style.transform = "translate(0,0)";
  });

  setTimeout(() => {
    hero.remove();
    document.body.classList.remove("hero-mode");
  }, 1100);
}

type();
