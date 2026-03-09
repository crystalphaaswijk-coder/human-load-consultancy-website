const header = document.querySelector('.site-header');
const heroImage = document.querySelector('.hero-image');
const revealItems = document.querySelectorAll('.reveal');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');

const mobileQuery = window.matchMedia('(max-width: 760px)');

const handleHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 30);
};

const handleParallax = () => {
  if (!heroImage) return;
  const intensity = mobileQuery.matches ? 0.08 : 0.14;
  const scale = mobileQuery.matches ? 1.02 : 1.04;
  heroImage.style.transform = `translateY(${window.scrollY * intensity}px) scale(${scale})`;
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px',
  }
);

revealItems.forEach((item) => {
  const delay = Number(item.dataset.delay || 0);
  item.style.setProperty('--delay', `${delay}ms`);
  revealObserver.observe(item);
});

const closeMobileMenu = () => {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileQuery.matches) closeMobileMenu();
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question?.addEventListener('click', () => {
    const alreadyOpen = item.classList.contains('active');

    faqItems.forEach((entry) => {
      entry.classList.remove('active');
      const button = entry.querySelector('.faq-question');
      const panel = entry.querySelector('.faq-answer');

      button?.setAttribute('aria-expanded', 'false');
      if (panel) panel.style.maxHeight = null;
    });

    if (!alreadyOpen) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
      if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

window.addEventListener('scroll', () => {
  handleHeader();
  handleParallax();
});

window.addEventListener('resize', handleParallax);

handleHeader();
handleParallax();
