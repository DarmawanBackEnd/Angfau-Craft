document.addEventListener('DOMContentLoaded', function() {
  // Variable untuk tracking form submission
  var submitted = false;
  
  // Make submitted global
  window.submitted = submitted;

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      if(navMenu.classList.contains('active')) {
        navMenu.style.maxHeight = '450px';
        navMenu.style.padding = '1.2rem 0 1rem 0';
      } else {
        navMenu.style.maxHeight = '0';
        navMenu.style.padding = '0 0';
      }
    });
  }

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Smooth scroll for navigation
  const navLinks = document.querySelectorAll('.nav-menu a, .footer-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Contact form handler (WhatsApp integration)
  const contactForm = document.querySelector('.contact2-form');
  if (contactForm) {
    console.log('Contact form found:', contactForm);
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      console.log('Form submitted!');
      
      // Get form data
      const nama = document.getElementById('nama').value;
      const email = document.getElementById('email').value;
      const pesan = document.getElementById('pesan').value;
      
      // Create WhatsApp message
      const whatsappMessage = `Halo kak! 👋

Saya ingin konsultasi tentang produk Angfau Craft:

*Nama:* ${nama}
*Email:* ${email}
*Pesan:* ${pesan}

Mohon bantuannya ya kak! 😊`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/6282122924977?text=${encodedMessage}`;
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Membuka WhatsApp...';
      submitBtn.disabled = true;
      
      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');
      
      // Reset form
      this.reset();
      
      // Reset button after a short delay
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  } else {
    console.log('Contact form not found!');
  }

  // Contact form handler (old form) - backup
  const oldContactForm = document.querySelector('.contact-form');
  if (oldContactForm) {
    oldContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you soon.');
      this.reset();
    });
  }

  // Hero Slider Otomatis
  const heroSlides = document.querySelectorAll('.hero-slide');
  let heroIndex = 0;
  if (heroSlides.length > 0) {
    heroSlides[0].classList.add('active');
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 3000);
  }

  // Testimoni Slider Horizontal
  const testiSlider = document.querySelector('.testimoni-slider');
  const testiSlides = document.querySelectorAll('.testimoni-slide');
  const testiDots = document.querySelectorAll('.testimoni-dot');
  let testiIndex = 0;
  function showTesti(idx) {
    if (testiSlider) {
      testiSlider.style.transform = `translateX(-${idx * 100}%)`;
    }
    testiDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    testiIndex = idx;
  }
  if (testiSlider && testiSlides.length > 0) {
    showTesti(0);
    let testiInterval = setInterval(() => {
      showTesti((testiIndex + 1) % testiSlides.length);
    }, 4000);
    testiDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showTesti(i);
        clearInterval(testiInterval);
        testiInterval = setInterval(() => {
          showTesti((testiIndex + 1) % testiSlides.length);
        }, 4000);
      });
    });
  }

  // Galeri Slider
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  let currentIndex = 0;
  function updateSlider() {
    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
  if (track && slides.length > 0 && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 4000);
  }

  // Produk Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const kategoriEls = document.querySelectorAll('.produk-kategori');
  if (filterBtns.length > 0 && kategoriEls.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        kategoriEls.forEach(kat => {
          if (filter === 'all' || kat.getAttribute('data-category') === filter) {
            kat.style.display = '';
          } else {
            kat.style.display = 'none';
          }
        });
      });
    });
  }
});

  