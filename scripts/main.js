import { initParticleAmbient } from "../../assets/scripts/ambient.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches;

const navLinks = document.querySelectorAll("nav a[href^='#']");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

const canvas = document.getElementById("particle-canvas");
const teardownAmbient = initParticleAmbient(canvas, {
  count: 32,
  pointerAttract: true,
  pointerRange: 140,
  pointerInfluence: 0.8,
});

window.addEventListener("beforeunload", () => {
  if (typeof teardownAmbient === "function") {
    teardownAmbient();
  }
});

const phrases = [
  "Crafter of the unseen",
  "Weaver of digital threads",
  "Shaper of virtual realms",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById("typing-text");

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
  }

  const delay = isDeleting ? 60 : 110;
  setTimeout(type, delay);
}

type();
