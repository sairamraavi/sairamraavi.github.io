// Custom JS for Sairam Raavi Portfolio
// Navbar active highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
// Parallax effect for hero background
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  });
}
// Typewriter effect for role
const role = document.getElementById('animated-role');
if (role) {
  setTimeout(() => {
    role.style.opacity = 1;
  }, 800);
}
