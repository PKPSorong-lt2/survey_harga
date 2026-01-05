// ==========================================
// MAIN.JS - Core Functionality
// ==========================================

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (scrollY > 100) {
    navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }
});

// Counter animation
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// Trigger counter when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    try {
      // TODO: Send to Apps Script
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      alert('✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
      contactForm.reset();
    } catch (error) {
      alert('❌ Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Config management
function saveConfig() {
  const url = document.getElementById('appsScriptUrl').value;
  
  if (!url) {
    alert('❌ Mohon masukkan URL Apps Script terlebih dahulu');
    return;
  }
  
  if (!url.includes('script.google.com')) {
    alert('❌ URL tidak valid. Pastikan URL dari Google Apps Script');
    return;
  }
  
  localStorage.setItem('appsScriptUrl', url);
  alert('✅ Konfigurasi berhasil disimpan!');
}

function getConfig() {
  return localStorage.getItem('appsScriptUrl') || '';
}

// Load config on page load
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('appsScriptUrl');
  if (urlInput) {
    urlInput.value = getConfig();
  }
});

// Open survey form
function openSurveyForm(type) {
  const url = getConfig();
  
  if (!url) {
    alert('⚠️ Mohon konfigurasi URL Apps Script terlebih dahulu');
    document.getElementById('appsScriptUrl').focus();
    return;
  }
  
  if (type === 'kebutuhan') {
    window.open('survey-kebutuhan.html', '_blank');
  } else if (type === 'survey') {
    window.open('survey-harga.html', '_blank');
  }
}

// Open dashboard
function openDashboard() {
  const url = getConfig();
  
  if (!url) {
    alert('⚠️ Mohon konfigurasi URL Apps Script terlebih dahulu');
    document.getElementById('appsScriptUrl').focus();
    return;
  }
  
  window.open('dashboard.html', '_blank');
}

// Animation on scroll
const observeElements = () => {
  const elements = document.querySelectorAll('.feature-card, .doc-card, .survey-option');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', observeElements);

// Prevent right-click on demo (optional)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Console welcome message
console.log('%c🌊 Sistem Procurement Intelligence ', 'font-size: 20px; color: #1565C0; font-weight: bold;');
console.log('%cPoliteknik Kelautan dan Perikanan Sorong', 'font-size: 14px; color: #666;');
console.log('%cDeveloped with ❤️ by PPK Team', 'font-size: 12px; color: #999;');
