// ========================================
// MODERN WEBSITE 3 NGÀY - PREMIUM JAVASCRIPT
// ========================================

(function() {
  'use strict';

  // ========== UTILITIES ==========
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // ========== HEADER SCROLL EFFECT ==========
  const header = $('#header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ========== MOBILE MENU TOGGLE ==========
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== SMOOTH SCROLL ==========
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      const target = $(href);
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== PARTICLES BACKGROUND ==========
  const particlesContainer = $('#particles');
  
  if (particlesContainer) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 5 + 2;
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 20;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createParticle(), i * 200);
    }
    
    // Continuously create particles
    setInterval(createParticle, 2000);
  }

  // ========== STATS COUNTER ANIMATION ==========
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  $$('.stat-number[data-target]').forEach(stat => {
    statsObserver.observe(stat);
  });

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (element.textContent.includes('%') ? '' : '+');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '' : '+');
      }
    }, 16);
  }

  // ========== SIMPLE AOS (ANIMATE ON SCROLL) ==========
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  $$('[data-aos]').forEach(element => {
    aosObserver.observe(element);
  });

  // ========== FAQ ACCORDION ==========
  $$('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      
      // Close all FAQ items
      $$('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // ========== COUNTDOWN TIMER ==========
  const timerElements = {
    days: $('#days'),
    hours: $('#hours'),
    minutes: $('#minutes'),
    seconds: $('#seconds')
  };

  if (timerElements.days) {
    // Set target date to end of February 2026
    const targetDate = new Date('2026-02-28T23:59:59').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // Timer expired
        Object.values(timerElements).forEach(el => {
          if (el) el.textContent = '00';
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (timerElements.days) timerElements.days.textContent = String(days).padStart(2, '0');
      if (timerElements.hours) timerElements.hours.textContent = String(hours).padStart(2, '0');
      if (timerElements.minutes) timerElements.minutes.textContent = String(minutes).padStart(2, '0');
      if (timerElements.seconds) timerElements.seconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========== SCROLL TO TOP BUTTON ==========
  const scrollTopBtn = $('#scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== PARALLAX EFFECT ON HERO BLURS ==========
  const heroBlurs = $$('.hero-blur');
  
  if (heroBlurs.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      heroBlurs.forEach((blur, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        blur.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ========== ANIMATED GRADIENT ON HOVER ==========
  $$('.value-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ========== TILT EFFECT ON CARDS ==========
  $$('.mockup-container, .value-card, .module-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // ========== TYPING EFFECT FOR HERO TEXT ==========
  const heroEyebrow = $('.hero-eyebrow');
  
  if (heroEyebrow) {
    const originalText = heroEyebrow.textContent;
    const emojiMatch = originalText.match(/🚀/);
    const emoji = emojiMatch ? emojiMatch[0] + ' ' : '';
    const text = originalText.replace(/🚀\s*/, '');
    
    heroEyebrow.innerHTML = `<span class="pulse-dot"></span>${emoji}`;
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroEyebrow.innerHTML = `<span class="pulse-dot"></span>${emoji}${text.substring(0, i + 1)}`;
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // ========== IMAGE LAZY LOADING ==========
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    $$('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========== PERFORMANCE METER ANIMATION ==========
  const meterFill = $('.meter-fill');
  
  if (meterFill) {
    const meterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          // Animation is already in CSS, just trigger it
          entry.target.style.animation = 'fill-meter 2s ease-out forwards';
        }
      });
    }, { threshold: 0.5 });

    meterObserver.observe(meterFill);
  }

  // ========== FEATURE ROW STAGGER ANIMATION ==========
  $$('.feature-row').forEach((row, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(row);
  });

  // ========== PRICING CARD HIGHLIGHT ==========
  $$('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ========== RANDOM QUOTE ROTATION (if you want to add testimonials rotation) ==========
  const testimonials = $$('.testimonial-card');
  
  if (testimonials.length > 3) {
    let currentSet = 0;
    const cardsPerSet = 3;
    
    function rotateTestimonials() {
      testimonials.forEach((card, index) => {
        const setStart = currentSet * cardsPerSet;
        const setEnd = setStart + cardsPerSet;
        
        if (index >= setStart && index < setEnd) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
      
      currentSet = (currentSet + 1) % Math.ceil(testimonials.length / cardsPerSet);
    }
    
    // Uncomment to enable auto-rotation
    // setInterval(rotateTestimonials, 8000);
  }

  // ========== FORM VALIDATION (if you add a contact form) ==========
  const contactForm = $('#contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Add your form submission logic here
      console.log('Form submitted:', data);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm.';
      successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
      `;
      
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => successMsg.remove(), 500);
      }, 3000);
      
      this.reset();
    });
  }

  // ========== ADD CSS ANIMATIONS ==========
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    
    .mockup-container,
    .value-card,
    .module-card {
      transition: transform 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);

  // ========== CURSOR TRAIL EFFECT (Optional - can be commented out if too much) ==========
  let cursorTrail = [];
  const maxTrailLength = 10;

  document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }
    
    // Remove old trail dots
    $$('.cursor-dot').forEach(dot => {
      if (Date.now() - parseInt(dot.dataset.time) > 1000) {
        dot.remove();
      }
    });
  });

  // ========== EASTER EGG - KONAMI CODE ==========
  let konamiCode = [];
  const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiPattern.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
      // Easter egg activated!
      document.body.style.animation = 'rainbow 5s infinite';
      
      const easterEgg = document.createElement('div');
      easterEgg.innerHTML = '🎉 Bạn đã khám phá được Easter Egg! 🎉';
      easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 800;
        z-index: 99999;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: bounceIn 0.6s ease-out;
      `;
      
      document.body.appendChild(easterEgg);
      
      setTimeout(() => {
        easterEgg.style.animation = 'bounceOut 0.6s ease-out';
        setTimeout(() => easterEgg.remove(), 600);
        document.body.style.animation = '';
      }, 3000);
      
      konamiCode = [];
    }
  });

  // Add bounce animations
  const bounceStyle = document.createElement('style');
  bounceStyle.textContent = `
    @keyframes bounceIn {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.1);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
    
    @keyframes bounceOut {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
    }
    
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(bounceStyle);

  // ========== CONSOLE MESSAGE ==========
  console.log('%c🚀 Website 3 Ngày - Premium Version', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
  console.log('%cNếu bạn đang xem source code, có vẻ bạn là người hiểu biết về web! 👨‍💻', 'font-size: 14px; color: #10b981;');
  console.log('%cHãy liên hệ với chúng tôi để được tư vấn miễn phí: https://zalo.me/0373453757', 'font-size: 12px; color: #8b5cf6;');

  // ========== PERFORMANCE MONITORING ==========
  window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
    
    // Log to analytics if you have it
    // analytics.track('page_load_time', { duration: loadTime });
  });

})();
