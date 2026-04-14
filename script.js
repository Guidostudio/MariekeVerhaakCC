/* ============================================================
   MARIEKE VERHAAK — WEBSITE JAVASCRIPT
   - Floating nav (scroll effect)
   - Hamburger menu morph
   - Scroll entry animations (IntersectionObserver)
   - Staggered grid reveals
   ============================================================ */

'use strict';

// ============================================================
// 1. NAV — Scroll effect & hamburger
// ============================================================

const navInner    = document.getElementById('nav-inner');
const hamburger   = document.getElementById('hamburger');
const navOverlay  = document.getElementById('nav-overlay');
const overlayLinks = navOverlay.querySelectorAll('a');

// Scroll: add shadow class when not at top
function onScroll() {
  if (window.scrollY > 20) {
    navInner.classList.add('nav__inner--scrolled');
  } else {
    navInner.classList.remove('nav__inner--scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Hamburger toggle
function openMenu() {
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  navOverlay.classList.add('is-open');
  navOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  navOverlay.classList.remove('is-open');
  navOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
});

// Close menu when overlay link is clicked
overlayLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


// ============================================================
// 2. SCROLL ENTRY ANIMATIONS — IntersectionObserver
// ============================================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Unobserve after reveal — saves memory
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.08
});

revealElements.forEach(el => revealObserver.observe(el));


// ============================================================
// 3. SMOOTH SCROLL — anchors
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = 80; // approximate nav pill height + margin
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});


// ============================================================
// 4. HERO IMAGE — subtle parallax on scroll
//    (only transform/opacity — GPU safe)
// ============================================================

const heroImageShell = document.querySelector('.hero__image-shell');

if (heroImageShell && window.matchMedia('(min-width: 900px)').matches) {
  const heroSection = document.getElementById('hero');

  const heroParallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onHeroScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onHeroScroll);
      }
    });
  }, { threshold: 0 });

  heroParallaxObserver.observe(heroSection);

  function onHeroScroll() {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.12;
    // Only moves the image slightly down as you scroll
    heroImageShell.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
}


// ============================================================
// 5. DIENST CARDS — stagger index for CSS cascade delay
// ============================================================

document.querySelectorAll('.stagger-parent .reveal').forEach((el, i) => {
  el.style.setProperty('--index', i);
});


// ============================================================
// 6. ACTIVE NAV LINK — highlight current section
// ============================================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--color-text)';
        }
      });
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(s => sectionObserver.observe(s));
