const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function updateMusicUI(on) {
  musicStatus.textContent = on ? "ON" : "OFF";
  musicButton.setAttribute("aria-pressed", on);
}

async function startMusic() {
  try {
    await music.play();
    updateMusicUI(true);
  } catch (e) {
    updateMusicUI(false);
  }
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    updateMusicUI(false);
  }
});

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Browser biasanya memblokir autoplay audio bersuara.
// Kita mencoba autoplay; jika diblokir, musik mulai setelah interaksi pertama pengguna.
window.addEventListener("load", () => {
  startMusic();
});

["pointerdown", "keydown", "touchstart"].forEach(eventName => {
  window.addEventListener(eventName, () => {
    if (music.paused) startMusic();
  }, { once: true, passive: true });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
