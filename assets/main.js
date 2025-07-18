// main.js - Custom JS for animated designer background and gallery modal

// AOS Animation Init
AOS.init();

// Smooth scroll for anchor links
if (document.querySelectorAll('.smooth-scroll')) {
  document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Animated Designer Art Background for Intro Section
if (document.getElementById('designer-bg')) {
  // Use a canvas-based animated gradient art
  const canvas = document.createElement('canvas');
  canvas.id = 'designer-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;
  document.getElementById('designer-bg').appendChild(canvas);
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = document.getElementById('designer-bg').offsetWidth;
    canvas.height = document.getElementById('designer-bg').offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  // Animated gradient waves
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.globalAlpha = 0.5 - i * 0.15;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 10) {
        let y = canvas.height / 2 + Math.sin((x / 100) + t + i) * (40 + i * 30) + Math.cos(t + i * 2) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = [
        'rgba(25,118,210,0.7)',
        'rgba(100,181,246,0.6)',
        'rgba(255,255,255,0.5)'
      ][i];
      ctx.fill();
      ctx.restore();
    }
    t += 0.012;
    requestAnimationFrame(draw);
  }
  draw();
}

// Gallery Slideshow and Modal
const galleryImages = document.querySelectorAll('.gallery-img');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const galleryModalTitle = document.getElementById('gallery-modal-title');
const galleryModalClose = document.querySelector('.gallery-modal-close');
let currentIndex = 0;

function showModal(index) {
  if (!galleryImages[index]) return;
  galleryModalImg.src = galleryImages[index].src;
  galleryModalTitle.textContent = galleryImages[index].getAttribute('data-title');
  galleryModal.classList.remove('d-none');
  galleryModal.classList.add('d-flex');
  currentIndex = index;
}
function closeModal() {
  galleryModal.classList.remove('d-flex');
  galleryModal.classList.add('d-none');
}
if (galleryImages.length) {
  galleryImages.forEach((img, idx) => {
    img.addEventListener('click', () => showModal(idx));
  });
}
if (galleryModalClose) {
  galleryModalClose.addEventListener('click', closeModal);
}
if (galleryModal) {
  galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) closeModal();
  });
}
// Slideshow navigation
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
function showSlide(index) {
  galleryImages.forEach((img, i) => {
    img.style.display = (i === index) ? 'block' : 'none';
  });
}
if (galleryPrev && galleryNext) {
  showSlide(0);
  galleryPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showSlide(currentIndex);
  });
  galleryNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showSlide(currentIndex);
  });
}
