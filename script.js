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
  hamburger.setAttribute('aria-label', 'Menu sluiten');
  navOverlay.classList.add('is-open');
  navOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Menu openen');
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
  if (e.key === 'Escape') {
    closeMenu();
    document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
  }
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


// ============================================================
// 7. AGENDA KALENDER
//    Pas de evenementen hieronder aan — format: 'YYYY-MM-DD'
// ============================================================

const agendaEvents = {
  // --- APRIL 2026 ---
  '2026-04-28': [{ type: 'meditatie', label: 'Groepsmeditatie & soundhealing' }],

  // --- MEI 2026 ---
  '2026-05-06': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],
  '2026-05-13': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],
  '2026-05-20': [{ type: 'meditatie', label: 'Groepsmeditatie & soundhealing' }],
  '2026-05-23': [{ type: 'retreat',   label: 'One day retreat — Ontspannen jezelf zijn' }],
  '2026-05-27': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],

  // --- JUNI 2026 ---
  '2026-06-03': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],
  '2026-06-10': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],
  '2026-06-17': [{ type: 'meditatie', label: 'Groepsmeditatie & soundhealing' }],
  '2026-06-24': [{ type: 'sessie',    label: 'Sessies beschikbaar' }],
  '2026-06-28': [{ type: 'retreat',   label: 'One day retreat — Ontspannen jezelf zijn' }],
};

// Sectielinks per evenement-type
const eventLinks = {
  sessie:    '#sessies-detail',
  meditatie: '#meditatie-detail',
  retreat:   '#retreat-detail',
  vol:       '#contact',
};

function buildCalendar() {
  const grid = document.getElementById('agenda-grid');
  if (!grid) return;

  const today = new Date();
  const monthNames = [
    'januari','februari','maart','april','mei','juni',
    'juli','augustus','september','oktober','november','december'
  ];
  const dayLabels = ['ma','di','wo','do','vr','za','zo'];

  // Tooltip element (gedeeld)
  const tooltip = document.createElement('div');
  tooltip.className = 'cal-tooltip';
  document.body.appendChild(tooltip);

  for (let m = 0; m < 3; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() + m, 1);
    const year  = d.getFullYear();
    const month = d.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Maandag = 0, zondag = 6
    let firstDay = d.getDay() - 1;
    if (firstDay < 0) firstDay = 6;

    const calEl = document.createElement('div');
    calEl.className = 'cal-month reveal';

    const title = document.createElement('div');
    title.className = 'cal-month__title';
    title.textContent = `${monthNames[month]} ${year}`;
    calEl.appendChild(title);

    const table = document.createElement('div');
    table.className = 'cal-grid';

    // Koptekst met dagen
    dayLabels.forEach(day => {
      const header = document.createElement('div');
      header.className = 'cal-day-label';
      header.textContent = day;
      table.appendChild(header);
    });

    // Lege cellen voor de eerste dag
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day cal-day--empty';
      table.appendChild(empty);
    }

    // Dag-cellen
    for (let day = 1; day <= daysInMonth; day++) {
      const mm  = String(month + 1).padStart(2, '0');
      const dd  = String(day).padStart(2, '0');
      const key = `${year}-${mm}-${dd}`;

      const isToday = (
        day   === today.getDate()  &&
        month === today.getMonth() &&
        year  === today.getFullYear()
      );

      const cell = document.createElement('div');
      cell.className = 'cal-day' + (isToday ? ' cal-day--today' : '');

      const num = document.createElement('span');
      num.className = 'cal-day__num';
      num.textContent = day;
      cell.appendChild(num);

      const eventsForDay = agendaEvents[key];
      if (eventsForDay) {
        cell.classList.add('cal-day--has-event');

        const dots = document.createElement('div');
        dots.className = 'cal-day__dots';
        eventsForDay.forEach(ev => {
          const dot = document.createElement('span');
          dot.className = `cal-dot cal-dot--${ev.type}`;
          dots.appendChild(dot);
        });
        cell.appendChild(dots);

        // Klik: ga naar de juiste sectie
        cell.addEventListener('click', () => {
          const href = eventLinks[eventsForDay[0].type] || '#contact';
          const target = document.querySelector(href);
          if (!target) return;
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        });

        // Hover tooltip
        cell.addEventListener('mouseenter', (e) => {
          tooltip.textContent = eventsForDay.map(ev => ev.label).join(' & ');
          tooltip.classList.add('is-visible');
        });
        cell.addEventListener('mousemove', (e) => {
          tooltip.style.left = (e.clientX + 12) + 'px';
          tooltip.style.top  = (e.clientY - 36) + 'px';
        });
        cell.addEventListener('mouseleave', () => {
          tooltip.classList.remove('is-visible');
        });
      }

      table.appendChild(cell);
    }

    calEl.appendChild(table);
    grid.appendChild(calEl);

    // Animeer de maand-kaarten mee met de reveal-observer
    revealObserver.observe(calEl);
  }
}

buildCalendar();


// ============================================================
// 8. MODALS
// ============================================================

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay);
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
});
