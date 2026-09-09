/**
 * IRONFORGE FITNESS — Modern Interactive Engine
 * Handles Navbar, Counters, Schedule, Pricing Toggle,
 * Comparison Slider, Testimonials, Lightbox, Calculators,
 * FAQ Accordion, and Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileDrawer();
  initScrollRevealAndCounters();
  initSchedule();
  initPricingToggle();
  initComparisonSlider();
  initTestimonials();
  initGallery();
  initCalculators();
  initFaqAccordion();
  initContactForm();
  initRegistrationForm();
  initNewsletterForm();
});

/* ==========================================================================
   1. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   2. NAVBAR & ACTIVE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active state detection
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggleMenu = (open) => {
    hamburgerBtn.classList.toggle('open', open);
    hamburgerBtn.setAttribute('aria-expanded', open);
    mobileDrawer.classList.toggle('open', open);
    mobileDrawer.setAttribute('aria-hidden', !open);
    if (drawerOverlay) {
      drawerOverlay.classList.toggle('open', open);
      drawerOverlay.setAttribute('aria-hidden', !open);
    }
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    toggleMenu(!isOpen);
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => toggleMenu(false));
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleMenu(false));
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   4. SCROLL REVEAL & ANIMATED COUNTERS
   ========================================================================== */
function initScrollRevealAndCounters() {
  const reveals = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter, .stat-num');
  const countedSet = new Set();

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Check for counters inside
        const itemCounters = entry.target.querySelectorAll('.counter, .stat-num');
        itemCounters.forEach(counter => {
          if (!countedSet.has(counter)) {
            countedSet.add(counter);
            animateCounter(counter);
          }
        });

        // Also check if entry target itself is counter
        if (entry.target.matches('.counter, .stat-num') && !countedSet.has(entry.target)) {
          countedSet.add(entry.target);
          animateCounter(entry.target);
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Trigger counters in hero immediately or via observer
  counters.forEach(counter => {
    revealObserver.observe(counter);
  });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target') || el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }
}

/* ==========================================================================
   5. CLASS SCHEDULE TIMETABLE
   ========================================================================== */
const scheduleData = [
  // Monday
  { day: 'monday', title: 'Strength Training', time: '06:00 AM - 07:15 AM', trainer: 'Alex Carter', category: 'strength', duration: '75 min', diff: 'Intermediate', seats: '4 spots left' },
  { day: 'monday', title: 'HIIT Surge', time: '08:30 AM - 09:15 AM', trainer: 'Priya Shah', category: 'hiit', duration: '45 min', diff: 'All Levels', seats: '6 spots left' },
  { day: 'monday', title: 'Power Yoga & Mobility', time: '10:00 AM - 11:00 AM', trainer: 'Priya Shah', category: 'yoga', duration: '60 min', diff: 'Beginner Friendly', seats: '8 spots left' },
  { day: 'monday', title: 'Functional Cross Training', time: '05:30 PM - 06:30 PM', trainer: 'Rahul Patel', category: 'functional', duration: '60 min', diff: 'High Energy', seats: '3 spots left' },
  { day: 'monday', title: 'Olympic Barbell Club', time: '07:00 PM - 08:30 PM', trainer: 'Alex Carter', category: 'strength', duration: '90 min', diff: 'Advanced', seats: '2 spots left' },
  
  // Tuesday
  { day: 'tuesday', title: 'HIIT Conditioning', time: '06:00 AM - 06:45 AM', trainer: 'Priya Shah', category: 'hiit', duration: '45 min', diff: 'All Levels', seats: '5 spots left' },
  { day: 'tuesday', title: 'Boxing & Heavy Bag Work', time: '08:00 AM - 09:00 AM', trainer: 'Rahul Patel', category: 'cardio', duration: '60 min', diff: 'Intermediate', seats: '4 spots left' },
  { day: 'tuesday', title: 'Mobility & Joint Rehab', time: '10:30 AM - 11:30 AM', trainer: 'Priya Shah', category: 'yoga', duration: '60 min', diff: 'Recovery', seats: '10 spots left' },
  { day: 'tuesday', title: 'Hypertrophy Upper Body', time: '06:00 PM - 07:15 PM', trainer: 'Rahul Patel', category: 'strength', duration: '75 min', diff: 'Intermediate', seats: '5 spots left' },
  { day: 'tuesday', title: 'Zumba & Cardio Burn', time: '07:30 PM - 08:30 PM', trainer: 'Priya Shah', category: 'cardio', duration: '60 min', diff: 'Fun & Energetic', seats: '7 spots left' },

  // Wednesday
  { day: 'wednesday', title: 'Deadlift & Posterior Chain', time: '06:00 AM - 07:15 AM', trainer: 'Alex Carter', category: 'strength', duration: '75 min', diff: 'Advanced', seats: '3 spots left' },
  { day: 'wednesday', title: 'Functional Athletic Core', time: '08:30 AM - 09:30 AM', trainer: 'Rahul Patel', category: 'functional', duration: '60 min', diff: 'All Levels', seats: '8 spots left' },
  { day: 'wednesday', title: 'Restorative Vinyasa Yoga', time: '10:00 AM - 11:00 AM', trainer: 'Priya Shah', category: 'yoga', duration: '60 min', diff: 'All Levels', seats: '9 spots left' },
  { day: 'wednesday', title: 'Tabata MetCon HIIT', time: '05:30 PM - 06:30 PM', trainer: 'Priya Shah', category: 'hiit', duration: '60 min', diff: 'Intense', seats: '4 spots left' },
  { day: 'wednesday', title: 'Combat Boxing Drill', time: '07:00 PM - 08:00 PM', trainer: 'Rahul Patel', category: 'cardio', duration: '60 min', diff: 'Intermediate', seats: '6 spots left' },

  // Thursday
  { day: 'thursday', title: 'Sprint & Assault Bike HIIT', time: '06:00 AM - 06:45 AM', trainer: 'Priya Shah', category: 'hiit', duration: '45 min', diff: 'High Intensity', seats: '5 spots left' },
  { day: 'thursday', title: 'Lower Body Sculpt & Squat', time: '08:00 AM - 09:15 AM', trainer: 'Alex Carter', category: 'strength', duration: '75 min', diff: 'Intermediate', seats: '4 spots left' },
  { day: 'thursday', title: 'Spine & Hip Mobility', time: '10:30 AM - 11:30 AM', trainer: 'Priya Shah', category: 'yoga', duration: '60 min', diff: 'Recovery', seats: '11 spots left' },
  { day: 'thursday', title: 'Functional Kettlebell Flow', time: '05:30 PM - 06:30 PM', trainer: 'Rahul Patel', category: 'functional', duration: '60 min', diff: 'All Levels', seats: '6 spots left' },
  { day: 'thursday', title: 'Night Boxing Circuit', time: '07:00 PM - 08:15 PM', trainer: 'Rahul Patel', category: 'cardio', duration: '75 min', diff: 'Intermediate', seats: '5 spots left' },

  // Friday
  { day: 'friday', title: 'Full Body Power Complex', time: '06:00 AM - 07:15 AM', trainer: 'Alex Carter', category: 'strength', duration: '75 min', diff: 'Intermediate', seats: '3 spots left' },
  { day: 'friday', title: 'HIIT Cardio Blast', time: '08:30 AM - 09:15 AM', trainer: 'Priya Shah', category: 'hiit', duration: '45 min', diff: 'All Levels', seats: '8 spots left' },
  { day: 'friday', title: 'Ashtanga Flow Yoga', time: '10:00 AM - 11:00 AM', trainer: 'Priya Shah', category: 'yoga', duration: '60 min', diff: 'All Levels', seats: '10 spots left' },
  { day: 'friday', title: 'Friday Night Fight Boxing', time: '06:00 PM - 07:15 PM', trainer: 'Rahul Patel', category: 'cardio', duration: '75 min', diff: 'All Levels', seats: '4 spots left' },
  { day: 'friday', title: 'Strength & Conditioning', time: '07:30 PM - 08:30 PM', trainer: 'Alex Carter', category: 'strength', duration: '60 min', diff: 'Advanced', seats: '2 spots left' },

  // Saturday
  { day: 'saturday', title: 'Weekend Warrior Boot Camp', time: '07:00 AM - 08:30 AM', trainer: 'All Coaches', category: 'functional', duration: '90 min', diff: 'Challenging', seats: '6 spots left' },
  { day: 'saturday', title: 'Heavy Bench & Overhead Press', time: '09:00 AM - 10:30 AM', trainer: 'Alex Carter', category: 'strength', duration: '90 min', diff: 'Advanced', seats: '4 spots left' },
  { day: 'saturday', title: 'Endurance Cardio & Rower', time: '11:00 AM - 12:00 PM', trainer: 'Rahul Patel', category: 'cardio', duration: '60 min', diff: 'All Levels', seats: '7 spots left' },
  { day: 'saturday', title: 'Yin Yoga & Deep Sound Bath', time: '05:00 PM - 06:15 PM', trainer: 'Priya Shah', category: 'yoga', duration: '75 min', diff: 'De-stress', seats: '12 spots left' },

  // Sunday
  { day: 'sunday', title: 'Sunday Strength Open Gym', time: '07:30 AM - 09:30 AM', trainer: 'Alex Carter', category: 'strength', duration: '120 min', diff: 'Coached Open Floor', seats: '15 spots left' },
  { day: 'sunday', title: 'Full Body Mobility & Breathwork', time: '10:00 AM - 11:30 AM', trainer: 'Priya Shah', category: 'yoga', duration: '90 min', diff: 'All Levels', seats: '14 spots left' }
];

function initSchedule() {
  const container = document.getElementById('scheduleListContainer');
  const dayTabs = document.querySelectorAll('.day-tab');
  const filterBtns = document.querySelectorAll('.sched-filter-btn');

  if (!container) return;

  let activeDay = 'monday';
  let activeCategory = 'all';

  function renderClasses() {
    const filtered = scheduleData.filter(item => {
      const matchDay = item.day === activeDay;
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      return matchDay && matchCat;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-card text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <p style="color: var(--text-gray); font-size: 1.1rem;">No classes match this category filter on ${activeDay.toUpperCase()}.</p>
          <button class="btn btn-outline btn-sm" style="margin-top: 1rem;" onclick="document.querySelector('.sched-filter-btn[data-filter=\\'all\\']').click()">Show All Classes</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(c => `
      <div class="schedule-item-card glass-card">
        <span class="sched-time-badge">${c.time}</span>
        <h4 class="sched-class-title">${c.title}</h4>
        <div class="sched-class-details">
          <span>Coach: <strong>${c.trainer}</strong></span>
          <span>Duration: <strong>${c.duration}</strong> • Level: <strong>${c.diff}</strong></span>
        </div>
        <div class="sched-seats-bar">
          <span class="seats-badge">● ${c.seats}</span>
          <a href="register.html" class="btn btn-outline btn-sm">Reserve</a>
        </div>
      </div>
    `).join('');
  }

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDay = tab.dataset.day;
      renderClasses();
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      renderClasses();
    });
  });

  renderClasses();
}

/* ==========================================================================
   6. PRICING MONTHLY / YEARLY TOGGLE
   ========================================================================== */
function initPricingToggle() {
  const billingSwitch = document.getElementById('billingSwitch');
  const amounts = document.querySelectorAll('.plan-price .amount');
  const frequencies = document.querySelectorAll('.plan-price .frequency');
  const annualNotes = document.querySelectorAll('.annual-note');

  if (!billingSwitch) return;

  let isYearly = false;

  billingSwitch.addEventListener('click', () => {
    isYearly = !isYearly;
    billingSwitch.classList.toggle('yearly', isYearly);
    billingSwitch.setAttribute('aria-checked', isYearly);

    amounts.forEach(amt => {
      const targetVal = isYearly ? amt.dataset.yearly : amt.dataset.monthly;
      amt.textContent = parseInt(targetVal, 10).toLocaleString();
    });

    annualNotes.forEach(note => {
      note.style.display = isYearly ? 'block' : 'none';
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE BEFORE/AFTER SLIDER
   ========================================================================== */
function initComparisonSlider() {
  const slider = document.getElementById('comparisonSlider');
  const beforeWrapper = document.getElementById('beforeWrapper');
  const handle = document.getElementById('sliderHandle');

  if (!slider || !beforeWrapper || !handle) return;

  let isDown = false;

  const move = (e) => {
    if (!isDown) return;
    const rect = slider.getBoundingClientRect();
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    let x = pageX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;
    beforeWrapper.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  };

  slider.addEventListener('mousedown', () => { isDown = true; });
  window.addEventListener('mouseup', () => { isDown = false; });
  slider.addEventListener('mousemove', move);

  slider.addEventListener('touchstart', () => { isDown = true; }, { passive: true });
  window.addEventListener('touchend', () => { isDown = false; });
  slider.addEventListener('touchmove', move, { passive: true });
}

/* ==========================================================================
   8. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer;

  const showSlide = (index) => {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentIndex = index;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentIndex);
    });
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slide, 10));
      resetAutoplay();
    });
  });

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

/* ==========================================================================
   9. GALLERY & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;

      items.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const title = item.querySelector('.gallery-item-title')?.textContent || '';
      if (modal && modalImg) {
        modalImg.src = src;
        if (modalCaption) modalCaption.textContent = title;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   10. FITNESS CALCULATORS (BMI & CALORIES)
   ========================================================================== */
function initCalculators() {
  const tabBtns = document.querySelectorAll('.calc-tab-btn');
  const bmiPane = document.getElementById('bmiPane');
  const calPane = document.getElementById('caloriePane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.calc;

      if (type === 'bmi') {
        bmiPane.style.display = 'block';
        calPane.style.display = 'none';
      } else {
        bmiPane.style.display = 'none';
        calPane.style.display = 'block';
      }
    });
  });

  // BMI Form
  const bmiForm = document.getElementById('bmiForm');
  const bmiOutput = document.getElementById('bmiOutput');
  const bmiNum = document.getElementById('bmiNumber');
  const bmiCat = document.getElementById('bmiCategory');
  const bmiRec = document.getElementById('bmiRecommendation');

  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
      const weight = parseFloat(document.getElementById('bmiWeight').value);

      if (!height || !weight || height <= 0 || weight <= 0) return;

      const bmi = (weight / (height * height)).toFixed(1);
      bmiNum.textContent = bmi;

      let category = '';
      let rec = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        rec = 'Recommended: High-protein caloric surplus with targeted progressive hypertrophy training.';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Optimal / Normal';
        rec = 'Healthy baseline. Focus on progressive strength training and athletic conditioning to build functional power.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        rec = 'Recommended: Combine resistance training with calorie moderation and structured HIIT sessions.';
      } else {
        category = 'Obesity Category';
        rec = 'Recommended: Consult our certified trainers for a structured low-impact fat loss and nutrition protocol.';
      }

      bmiCat.textContent = category;
      bmiRec.textContent = rec;
      bmiOutput.style.display = 'block';
    });
  }

  // Calorie Form (Mifflin-St Jeor)
  const calForm = document.getElementById('calorieForm');
  const calOutput = document.getElementById('calorieOutput');
  const calMaintain = document.getElementById('calMaintain');
  const calLoss = document.getElementById('calLoss');
  const calGain = document.getElementById('calGain');

  if (calForm) {
    calForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('calAge').value, 10);
      const gender = document.getElementById('calGender').value;
      const height = parseFloat(document.getElementById('calHeight').value);
      const weight = parseFloat(document.getElementById('calWeight').value);
      const activity = parseFloat(document.getElementById('calActivity').value);

      if (!age || !height || !weight) return;

      // BMR
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const tdee = Math.round(bmr * activity);
      const lossTarget = Math.round(tdee - 500);
      const gainTarget = Math.round(tdee + 350);

      calMaintain.textContent = `${tdee.toLocaleString()} kcal`;
      calLoss.textContent = `${lossTarget.toLocaleString()} kcal`;
      calGain.textContent = `${gainTarget.toLocaleString()} kcal`;
      calOutput.style.display = 'block';
    });
  }
}

/* ==========================================================================
   11. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open answers
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          const otherAns = other.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', !isActive);
      answer.style.maxHeight = !isActive ? `${answer.scrollHeight}px` : null;
    });
  });
}

/* ==========================================================================
   12. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccessMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const msgInput = document.getElementById('contactMessage');

    // Validation
    const validateField = (input, condition) => {
      const parent = input.closest('.input-group');
      if (!condition) {
        parent.classList.add('invalid');
        isValid = false;
      } else {
        parent.classList.remove('invalid');
      }
    };

    validateField(nameInput, nameInput.value.trim().length >= 2);
    validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
    validateField(phoneInput, phoneInput.value.trim().length >= 8);
    validateField(msgInput, msgInput.value.trim().length >= 5);

    if (isValid) {
      const submitBtn = document.getElementById('contactSubmitBtn');
      submitBtn.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 900);
    }
  });
}

/* ==========================================================================
   13. MEMBERSHIP REGISTRATION FORM VALIDATION
   ========================================================================== */
function initRegistrationForm() {
  const form = document.getElementById('membershipForm');
  const successPane = document.getElementById('regSuccessPane');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { id: 'regFullName', test: val => val.trim().length >= 3 },
      { id: 'regEmail', test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
      { id: 'regPhone', test: val => val.trim().length >= 8 },
      { id: 'regDob', test: val => val !== '' },
      { id: 'regGender', test: val => val !== '' },
      { id: 'regAddress', test: val => val.trim().length >= 5 },
      { id: 'regPlan', test: val => val !== '' },
      { id: 'regGoal', test: val => val !== '' },
      { id: 'regTime', test: val => val !== '' },
      { id: 'regEmergencyName', test: val => val.trim().length >= 3 },
      { id: 'regEmergencyPhone', test: val => val.trim().length >= 8 }
    ];

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      const parent = el.closest('.input-group');
      if (!f.test(el.value)) {
        parent.classList.add('invalid');
        isValid = false;
      } else {
        parent.classList.remove('invalid');
      }
    });

    // Checkboxes
    const terms = document.getElementById('regTerms');
    const termsErr = document.getElementById('termsError');
    if (!terms.checked) {
      termsErr.style.display = 'block';
      isValid = false;
    } else {
      termsErr.style.display = 'none';
    }

    const privacy = document.getElementById('regPrivacy');
    const privErr = document.getElementById('privacyError');
    if (!privacy.checked) {
      privErr.style.display = 'block';
      isValid = false;
    } else {
      privErr.style.display = 'none';
    }

    if (isValid) {
      const btn = document.getElementById('regSubmitBtn');
      btn.textContent = 'PROCESSING MEMBERSHIP...';
      btn.disabled = true;

      setTimeout(() => {
        // Collect Name and Plan
        const fullName = document.getElementById('regFullName').value;
        const plan = document.getElementById('regPlan').value;
        const randomId = 'IF-' + Math.floor(10000 + Math.random() * 90000);

        document.getElementById('confirmedMemberName').textContent = fullName;
        document.getElementById('confirmedPlan').textContent = plan.toUpperCase();
        document.getElementById('confirmedId').textContent = randomId;

        form.style.display = 'none';
        if (successPane) {
          successPane.style.display = 'block';
          window.scrollTo({ top: successPane.offsetTop - 100, behavior: 'smooth' });
        }
      }, 1000);
    }
  });
}

/* ==========================================================================
   14. NEWSLETTER SUBSCRIPTION FORM
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail');
    if (email && email.value.includes('@')) {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }
  });
}
