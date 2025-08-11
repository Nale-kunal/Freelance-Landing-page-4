(function() {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // Set current year
  document.addEventListener('DOMContentLoaded', () => {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  });

  // Smooth scroll
  window.scrollToSection = function(sel) {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Menu toggle
  const menuToggle = $('#menuToggle');
  const navMenu = $('#mainNav');
  const navbar = $('.navbar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.textContent = navMenu.classList.contains('active') ? 'Close' : 'Menu';
    });
  }

  // Sticky header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // CTA buttons
  $('#ctaNav')?.addEventListener('click', () => scrollToSection('#contact'));
  $('#ctaHero')?.addEventListener('click', () => scrollToSection('#contact'));
  $('#exploreSolutions')?.addEventListener('click', () => scrollToSection('#solutions'));
  $('#floatCta')?.addEventListener('click', () => scrollToSection('#contact'));

  // Contact form handling
  const form = $('#contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const biz = $('#biz').value;
    const req = $('#req').value.trim();
    const msg = $('#formMsg');
    if (!name || !email || !biz || !req) {
      msg.textContent = 'Please fill all fields.';
      msg.style.color = '#ff2d55';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#ff2d55';
      return;
    }
    console.log('Lead:', { name, email, biz, req });
    msg.style.color = '#34c759';
    msg.textContent = `Thank you, ${name.split(' ')[0]}! We'll reach out within 1–3 hours with your free preview.`;
    form.reset();
  });

  // Newsletter form handling
  const newsletterForm = $('#newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    const msg = $('#newsletterMsg');
    if (!email) {
      msg.textContent = 'Please enter an email.';
      msg.style.color = '#ff2d55';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#ff2d55';
      return;
    }
    console.log('Newsletter Signup:', { email });
    msg.style.color = '#34c759';
    msg.textContent = `Thank you for subscribing! Stay tuned for updates.`;
    newsletterForm.reset();
  });

  // Prefill pricing plan
  window.prefill = function(plan) {
    scrollToSection('#contact');
    setTimeout(() => {
      if ($('#req')) {
        $('#req').value = `I'm interested in the ${plan} plan. Please share details on timeline and deliverables.`;
        $('#req').focus();
      }
    }, 500);
  };

  // WhatsApp
  window.startWhatsApp = function() {
    const phone = '+919900112233';
    const text = encodeURIComponent('Hi, I’m interested in a website or web app. Can you share more details?');
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  // Scroll animations
  const animateElements = $$('.solution-card, .stat, .portfolio-item, .process-step, .pricing-card, .testimonial, .contact-form, .contact-info, .legacy-item, .why-us-item, .success-story, .impact-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  animateElements.forEach(el => observer.observe(el));

  // Close mobile menu on link click
  $$('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.textContent = 'Menu';
    });
  });
})();