document.addEventListener("DOMContentLoaded", () => {
  const text =
    "Computer Science @ Caltech · Computer Vision and Multimodal Learning";

  const target = document.getElementById("typed-text");
  let i = 0;

  function type() {
  if (i < text.length) {
    target.textContent += text[i++];
    setTimeout(type, 45);
  } else {
    setTimeout(() => {
      exitHero(); // 👈 THIS WAS MISSING
    }, 600);
  }
}

function exitHero() {
  const hero = document.getElementById("hero");
  const img = hero.querySelector(".hero-image");
  const name = hero.querySelector(".hero-name");
  const tagline = hero.querySelector(".hero-tagline");

  const imgRect = img.getBoundingClientRect();
  const nameRect = name.getBoundingClientRect();
  const tagRect = tagline.getBoundingClientRect();

  const imgClone = img.cloneNode(true);
  const nameClone = name.cloneNode(true);
  const tagClone = tagline.cloneNode(true);

  [imgClone, nameClone, tagClone].forEach(el => {
    el.style.position = "fixed";
    el.style.margin = "0";
    el.style.left = "0";
    el.style.top = "0";
    el.style.transition = "transform 1s cubic-bezier(.22,.61,.36,1)";
    el.style.zIndex = "2000";
    document.body.appendChild(el);
  });

  // LOCK SIZES (CRITICAL)
  imgClone.style.width = `${imgRect.width}px`;
  imgClone.style.height = `${imgRect.height}px`;

  imgClone.style.transform =
    `translate(${imgRect.left}px, ${imgRect.top}px)`;

  nameClone.style.transform =
    `translate(${nameRect.left}px, ${nameRect.top}px)`;

  tagClone.style.transform =
    `translate(${tagRect.left}px, ${tagRect.top}px)`;

  hero.style.visibility = "hidden";

  const endImgX = window.innerWidth - imgRect.width - 48;
  const endImgY = 32;

  const endNameX = 64;
  const endNameY = 140;

  const endTagX = 64;
  const endTagY = 220;

  requestAnimationFrame(() => {
    imgClone.style.transform =
      `translate(${endImgX}px, ${endImgY}px) scale(1.15)`;

    nameClone.style.transform =
      `translate(${endNameX}px, ${endNameY}px)`;

    tagClone.style.transform =
      `translate(${endTagX}px, ${endTagY}px)`;
  });

  setTimeout(() => {
    document.getElementById("site-content").classList.add("visible");

    imgClone.remove();
    nameClone.remove();
    tagClone.remove();

    hero.style.opacity = "0";
    hero.style.pointerEvents = "none";
  }, 1100);
}


  type();
});
