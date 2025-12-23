document.addEventListener("DOMContentLoaded", () => {
  const text =
    "Computer Science @ Caltech · Computer Vision and Multimodal Learning";
  const speed = 45;

  let i = 0;
  const target = document.getElementById("typed-text");
  const hero = document.getElementById("hero");
  const content = document.getElementById("site-content");

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(finishHero, 700);
    }
  }

  function finishHero() {
    hero.classList.add("hero-final");
    content.classList.add("visible");
  }

  type();
});
