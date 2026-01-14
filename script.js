gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Ambition: Letters spread and circle grows
  gsap.from(".scene-1 .letter", {
    scrollTrigger: {
      trigger: ".scene-1",
      start: "top center",
      end: "bottom center",
      scrub: 1
    },
    x: (i) => (i - 4) * 50,
    opacity: 0,
    stagger: 0.1
  });

  gsap.to(".ambition-circle", {
    scrollTrigger: { trigger: ".scene-1", scrub: 1 },
    scale: 2,
    opacity: 0
  });

  // 2. Fear: Orbitals circling the word
  gsap.from(".fear-word", {
    scrollTrigger: { trigger: ".scene-2", scrub: 1 },
    scale: 0.5,
    opacity: 0
  });

  // 3. Choice: Sides pulling apart
  const choiceTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene-3",
      start: "top 80%", // Starts when the scene enters the view
      end: "top 20%",
      scrub: 1          // Links animation directly to scroll speed
    }
  });

  choiceTl.from(".left-side", { x: -60, opacity: 0, duration: 1 })
          .from(".right-side", { x: 60, opacity: 0, duration: 1 }, "<") // Starts at same time
          .from(".choice-center-word", { scale: 1.2, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(".choice-text-block", { y: 30, opacity: 0, duration: 1 }, "-=0.5");

  // 4. Power: Blocks stacking
  gsap.from(".power-block", {
    scrollTrigger: { trigger: ".scene-4", scrub: 1 },
    y: 100,
    opacity: 0,
    stagger: 0.2
  });

  // 5. Snow: Canvas Logic
  initSnow();
});

function initSnow() {
  const canvas = document.getElementById("snow-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Flake {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 3 + 2;
      this.speed = Math.random() * 1 + 0.8;
    }
    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.74)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Flake());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener("resize", resize);
}

