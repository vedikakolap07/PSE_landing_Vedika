/* ===================================
   main.js — Premier Schools Exhibition
=================================== */

(function () {
  'use strict';

  /* ─── REDUCED MOTION CHECK ─── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================
     1. FEATURES SLIDER
  ========================================= */
  const featureSlider = document.getElementById('featureSlider');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');

  if (featureSlider && prevBtn && nextBtn) {
    let featureCurrent = 0;
    let featureAutoplay = null;

    function getVisibleCount() {
      return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 4;
    }

    function getFeatureCardWidth() {
      const card = featureSlider.querySelector('.feature-card');
      if (!card) return 0;
      return card.offsetWidth + 18; // width + gap
    }

    function getFeatureMax() {
      const total   = featureSlider.querySelectorAll('.feature-card').length;
      const visible = getVisibleCount();
      return Math.max(0, total - visible);
    }

    function updateFeatureSlider() {
      const offset = featureCurrent * getFeatureCardWidth();
      featureSlider.style.transform = `translateX(-${offset}px)`;

      const max = getFeatureMax();

      /* left button */
      if (featureCurrent > 0) {
        prevBtn.style.background   = '#ffffff';
        prevBtn.style.borderColor  = '#ffffff';
        prevBtn.style.color        = '#2d0a6e';
      } else {
        prevBtn.style.background   = 'transparent';
        prevBtn.style.borderColor  = 'rgba(255,255,255,0.6)';
        prevBtn.style.color        = '#ffffff';
      }

      /* right button */
      if (featureCurrent >= max) {
        nextBtn.style.background   = 'transparent';
        nextBtn.style.borderColor  = 'rgba(255,255,255,0.6)';
        nextBtn.style.color        = '#ffffff';
      } else {
        nextBtn.style.background   = '#ffffff';
        nextBtn.style.borderColor  = '#ffffff';
        nextBtn.style.color        = '#2d0a6e';
      }

      /* ARIA */
      prevBtn.setAttribute('aria-disabled', featureCurrent === 0);
      nextBtn.setAttribute('aria-disabled', featureCurrent >= max);
    }

    function featureNext() {
      if (featureCurrent < getFeatureMax()) { featureCurrent++; updateFeatureSlider(); }
    }

    function featurePrev() {
      if (featureCurrent > 0) { featureCurrent--; updateFeatureSlider(); }
    }

    nextBtn.addEventListener('click', featureNext);
    prevBtn.addEventListener('click', featurePrev);

    /* Keyboard support */
    [prevBtn, nextBtn].forEach(btn => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
    });

    /* Auto-play */
    function startFeatureAutoplay() {
      if (prefersReducedMotion) return;
      featureAutoplay = setInterval(() => {
        if (featureCurrent >= getFeatureMax()) { featureCurrent = 0; }
        else { featureCurrent++; }
        updateFeatureSlider();
      }, 4000);
    }

    function stopFeatureAutoplay() {
      clearInterval(featureAutoplay);
    }

    const sliderContainer = featureSlider.closest('.slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopFeatureAutoplay);
      sliderContainer.addEventListener('mouseleave', startFeatureAutoplay);
      sliderContainer.addEventListener('focusin',    stopFeatureAutoplay);
      sliderContainer.addEventListener('focusout',   startFeatureAutoplay);
    }

    /* Touch / swipe */
    let featureTouchStartX = 0;
    featureSlider.addEventListener('touchstart', e => { featureTouchStartX = e.touches[0].clientX; }, { passive: true });
    featureSlider.addEventListener('touchend', e => {
      const diff = featureTouchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? featureNext() : featurePrev(); }
    }, { passive: true });

    /* Re-calc on resize */
    window.addEventListener('resize', () => {
      featureCurrent = 0;
      updateFeatureSlider();
    });

    updateFeatureSlider();
    startFeatureAutoplay();
  }

  /* =========================================
     2. SCHOOL CARDS — MOBILE SLIDER
  ========================================= */
  const schoolGrid  = document.getElementById('schoolGrid');
  const dotsWrapper = document.getElementById('schoolDots');

  if (schoolGrid && dotsWrapper) {
    const cards = schoolGrid.querySelectorAll('.school-card');
    let schoolCurrent = 0;
    let schoolTouchStartX = 0;

    function isMobileSchool() { return window.innerWidth <= 768; }

    function buildDots() {
      dotsWrapper.innerHTML = '';
      cards.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'school-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        btn.addEventListener('click', () => goToSchool(i));
        dotsWrapper.appendChild(btn);
      });
    }

    function goToSchool(index) {
      schoolCurrent = index;
      if (isMobileSchool()) {
        const cardWidth = schoolGrid.offsetWidth;
        schoolGrid.style.transform = `translateX(-${index * cardWidth}px)`;
      }
      /* update dots */
      dotsWrapper.querySelectorAll('.school-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    /* Touch */
    schoolGrid.addEventListener('touchstart', e => { schoolTouchStartX = e.touches[0].clientX; }, { passive: true });
    schoolGrid.addEventListener('touchend', e => {
      if (!isMobileSchool()) return;
      const diff = schoolTouchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0 && schoolCurrent < cards.length - 1) goToSchool(schoolCurrent + 1);
        else if (diff < 0 && schoolCurrent > 0) goToSchool(schoolCurrent - 1);
      }
    }, { passive: true });

    function handleSchoolResize() {
      if (isMobileSchool()) {
        buildDots();
        goToSchool(0);
      } else {
        dotsWrapper.innerHTML = '';
        schoolGrid.style.transform = '';
      }
    }

    window.addEventListener('resize', handleSchoolResize);
    handleSchoolResize();
  }

  /* =========================================
     3. GALLERY ANIMATION — pause on reduced motion
  ========================================= */
  if (prefersReducedMotion) {
    document.querySelectorAll('.gallery-column').forEach(col => {
      col.style.animation = 'none';
    });
  }

  /* =========================================
     4. MARQUEE — pause on focus for keyboard users
  ========================================= */
  document.querySelectorAll('.contributor-cards').forEach(track => {
    track.addEventListener('focusin',  () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('focusout', () => { track.style.animationPlayState = 'running'; });
  });

})();