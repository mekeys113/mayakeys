document.addEventListener("DOMContentLoaded", () => {
  const line1 = "Computer Science @ Caltech";
  const line2 = "Computer Vision and Multimodal Learning";

  const target1 = document.getElementById("typed-line-1");
  const target2 = document.getElementById("typed-line-2");

  let i = 0;
  let j = 0;

  function typeLine1() {
    if (i < line1.length) {
      target1.textContent += line1[i++];
      setTimeout(typeLine1, 45);
    } else {
      setTimeout(typeLine2, 300); // pause between lines
    }
  }

  function typeLine2() {
    if (j < line2.length) {
      target2.textContent += line2[j++];
      setTimeout(typeLine2, 45);
    } else {
      // finish hero after typing
      setTimeout(() => {
        document.body.classList.add("hero-done");
        document.body.style.overflow = "auto";
      }, 500);
    }
  }

  typeLine1();
});
