(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  const root = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  syncThemeButton(initial);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeButton(next);
  });

  function syncThemeButton(theme) {
    themeToggle.setAttribute('aria-pressed', theme === 'light');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll progress + scroll-to-top + active link ---------- */
  const navProgress = document.getElementById('navProgress');
  const scrollTopBtn = document.getElementById('scrollTop');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', onScroll, { passive: true });

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    navProgress.style.width = progress + '%';

    scrollTopBtn.classList.toggle('visible', scrollTop > 600);

    let current = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-eyebrow, .section-title, .about-text, .about-stats, .skill-card, .project-card, .timeline-item, .edu-card, .cert-block, .contact-info, .contact-form'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));

  /* ---------- Skill bars fill ---------- */
  const skillBars = document.querySelectorAll('.signal-list .bars');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = parseInt(entry.target.dataset.level, 10) || 0;
          entry.target.style.setProperty('--pct', String(level * 20));
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError'), validate: (v) => v.trim().length >= 2, message: 'Please enter your name (min 2 characters).' },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email address.' },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError'), validate: (v) => v.trim().length >= 10, message: 'Message should be at least 10 characters.' },
  };

  Object.values(fields).forEach(({ el }) => {
    el.addEventListener('blur', () => el.setAttribute('data-touched', 'true'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.values(fields).forEach(({ el, error, validate, message }) => {
      el.setAttribute('data-touched', 'true');
      if (!validate(el.value)) {
        error.textContent = message;
        valid = false;
      } else {
        error.textContent = '';
      }
    });

    if (!valid) {
      formStatus.textContent = 'Please fix the errors above.';
      formStatus.style.color = '#E5484D';
      return;
    }

    // No backend is wired up yet — replace this block with a fetch() call to
    // your form endpoint (e.g. Formspree, Netlify Forms, or a custom API route).
    formStatus.style.color = '';
    formStatus.textContent = 'Thanks! Your message has been noted — I\u2019ll get back to you soon.';
    form.reset();
    Object.values(fields).forEach(({ el }) => el.removeAttribute('data-touched'));
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
