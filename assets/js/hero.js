document.addEventListener("DOMContentLoaded", () => {
  const text =
    "Computer Science @ Caltech · Computer Vision and Multimodal Learning";
  const speed = 38;

  const hero = document.getElementById("hero");
  const site = document.getElementById("site-content");
  const typed = document.getElementById("typed-text");
  const heroText = document.getElementById("hero-text");
  const heroPhoto = document.getElementById("hero-photo");

  if (!hero || !site || !typed || !heroText || !heroPhoto) {
    console.error("Hero elements missing. Check IDs in index.html.");
    return;
  }

  // --- IMPORTANT: no layout changes. We only transform from center -> final. ---
  function setIntroTransforms() {
    // Current final rects (elements are already in final top positions)
    const tRect = heroText.getBoundingClientRect();
    const pRect = heroPhoto.getBoundingClientRect();

    // Where we want them to START (center-ish)
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Start positions (tweak these if you want slightly higher/lower)
    const startTextCx = vw * 0.38;   // name/tagline centered slightly left
    const startTextCy = vh * 0.55;

    const startPhotoCx = vw * 0.50;  // photo centered above the name
    const startPhotoCy = vh * 0.40;

    // Compute deltas from FINAL -> START (apply these transforms initially)
    const tCx = tRect.left + tRect.width / 2;
    const tCy = tRect.top + tRect.height / 2;
    const pCx = pRect.left + pRect.width / 2;
    const pCy = pRect.top + pRect.height / 2;

    const tDx = startTextCx - tCx;
    const tDy = startTextCy - tCy;

    const pDx = startPhotoCx - pCx;
    const pDy = startPhotoCy - pCy;

    // Apply transforms instantly (no transition yet)
    heroText.style.transition = "none";
    heroPhoto.style.transition = "none";
    heroText.style.transform = `translate3d(${tDx}px, ${tDy}px, 0)`;
    heroPhoto.style.transform = `translate3d(${pDx}px, ${pDy}px, 0)`;

    // Force reflow, then restore transitions
    void heroText.offsetHeight;
    heroText.style.transition =
      "transform 900ms cubic-bezier(.2,.8,.2,1), opacity 500ms ease";
    heroPhoto.style.transition =
      "transform 900ms cubic-bezier(.2,.8,.2,1), opacity 500ms ease";
  }

  // Set intro pose BEFORE typing
  setIntroTransforms();

  // If resize happens during hero, recompute intro transforms (optional but nice)
  let resized = false;
  window.addEventListener("resize", () => {
    // only adjust if hero is still present
    if (document.body.classList.contains("hero-final")) return;
    resized = true;
    setIntroTransforms();
  });

  // Typing
  let i = 0;
  function type() {
    if (i < text.length) {
      typed.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else {
      setTimeout(finishHero, 450);
    }
  }

  function finishHero() {
    // Reveal site (fade in underneath)
    site.classList.remove("hidden");

    // Animate elements to FINAL positions by removing transforms
    requestAnimationFrame(() => {
      document.body.classList.add("hero-final");
      heroText.style.transform = "translate3d(0,0,0)";
      heroPhoto.style.transform = "translate3d(0,0,0)";
    });

    // Remove overlay after motion completes
    setTimeout(() => {
      document.body.classList.remove("hero-mode");
      hero.remove();
    }, 1000);
  }

  type();
});
