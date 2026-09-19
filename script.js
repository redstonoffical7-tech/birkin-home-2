// Redstone Portfolio Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTerminalTyping();
  initProjectFilters();
  initProjectModal();
  initCostCalculator();
  initClipboardActions();
  initContactForm();
});

// Toast Notification Manager
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 2. Terminal Typing Effect
function initTerminalTyping() {
  const typingEl = document.getElementById('terminalTypingText');
  if (!typingEl) return;

  const phrases = [
    'launching high-speed web apps...',
    'configuring Nginx reverse proxy...',
    'hardening Linux VPS servers...',
    'building reactive UI components...',
    'routing WebSocket live connections...',
    'ready for commissions & deployments 🚀'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 65;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 300;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

// 3. Project Filter System
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-red-600', 'text-white');
        b.classList.add('bg-white/5', 'text-slate-300');
      });

      btn.classList.add('bg-red-600', 'text-white');
      btn.classList.remove('bg-white/5', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
        } else {
          card.classList.add('hidden');
          card.style.opacity = '0';
        }
      });
    });
  });
}

// 4. Project Modal Details
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const closeBtn = document.getElementById('closeModalBtn');
  const closeBtn2 = document.getElementById('closeModalBtn2');
  const detailButtons = document.querySelectorAll('.open-project-details');

  if (!modal) return;

  function closeModal() {
    modal.classList.add('hidden');
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Project Showcase';
      const desc = btn.getAttribute('data-desc') || '';
      const tags = (btn.getAttribute('data-tags') || '').split(',');

      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modalTags.innerHTML = '';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono';
        span.textContent = tag.trim();
        modalTags.appendChild(span);
      });

      modal.classList.remove('hidden');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// 5. Interactive Cost & Turnaround Estimator
function initCostCalculator() {
  const typeBtns = document.querySelectorAll('.calc-type-btn');
  const addonChecks = document.querySelectorAll('.calc-addon-check');
  const summaryPackageName = document.getElementById('summaryPackageName');
  const summaryDays = document.getElementById('summaryDays');
  const summaryPrice = document.getElementById('summaryPrice');
  const calcCtaBtn = document.getElementById('calcCtaBtn');
  const contactService = document.getElementById('contactService');

  let selectedBasePrice = 250;
  let selectedBaseDays = 3;
  let selectedBaseName = "Responsive Landing Page";

  function updateEstimate() {
    let totalPrice = selectedBasePrice;
    let totalDays = selectedBaseDays;

    addonChecks.forEach(check => {
      if (check.checked) {
        totalPrice += parseInt(check.getAttribute('data-price') || 0, 10);
        totalDays += parseInt(check.getAttribute('data-days') || 0, 10);
      }
    });

    if (summaryPackageName) summaryPackageName.textContent = selectedBaseName;
    if (summaryDays) summaryDays.textContent = `~${totalDays} - ${totalDays + 2} Days`;
    if (summaryPrice) summaryPrice.textContent = `$${totalPrice}`;
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => {
        b.classList.remove('border-red-500', 'bg-red-500/10');
        b.classList.add('border-white/10', 'bg-white/5');
      });

      btn.classList.add('border-red-500', 'bg-red-500/10');
      btn.classList.remove('border-white/10', 'bg-white/5');

      selectedBasePrice = parseInt(btn.getAttribute('data-price') || 250, 10);
      selectedBaseDays = parseInt(btn.getAttribute('data-days') || 3, 10);
      selectedBaseName = btn.getAttribute('data-name') || "Responsive Landing Page";

      updateEstimate();
    });
  });

  addonChecks.forEach(check => {
    check.addEventListener('change', updateEstimate);
  });

  // Sync to Contact Form
  if (calcCtaBtn && contactService) {
    calcCtaBtn.addEventListener('click', () => {
      if (selectedBaseName.includes("Landing") || selectedBaseName.includes("Website")) {
        contactService.value = "Responsive Website";
      } else if (selectedBaseName.includes("Application")) {
        contactService.value = "Full Web Application";
      } else if (selectedBaseName.includes("Hosting")) {
        contactService.value = "Server Hosting Setup";
      }
    });
  }

  updateEstimate();
}

// 6. Clipboard Actions (Discord & Email)
function initClipboardActions() {
  const discordHero = document.getElementById('copyDiscordHero');
  const discordHeroText = document.getElementById('discordHeroText');
  const copyDiscordBtn = document.getElementById('copyDiscordBtn');
  const copyDiscordText = document.getElementById('copyDiscordText');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');

  const discordUsername = 'redstone#0001';
  const emailAddress = 'redstone.dev@example.com';

  function copyToClipboard(text, targetEl, originalText, toastTitle, toastMsg) {
    navigator.clipboard.writeText(text).then(() => {
      if (targetEl) targetEl.textContent = 'Copied!';
      showToast(toastTitle, toastMsg);
      setTimeout(() => {
        if (targetEl) targetEl.textContent = originalText;
      }, 2000);
    }).catch(() => {
      showToast('Copy Failed', 'Please select and copy manually: ' + text);
    });
  }

  if (discordHero) {
    discordHero.addEventListener('click', () => {
      copyToClipboard(discordUsername, discordHeroText, 'Copy Discord', 'Discord Copied', 'Username copied to clipboard: ' + discordUsername);
    });
  }

  if (copyDiscordBtn) {
    copyDiscordBtn.addEventListener('click', () => {
      copyToClipboard(discordUsername, copyDiscordText, 'Copy', 'Discord Copied', 'Username copied to clipboard: ' + discordUsername);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard(emailAddress, copyEmailText, 'Copy', 'Email Copied', 'Email copied to clipboard: ' + emailAddress);
    });
  }
}

// 7. Contact Form Simulation
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const service = document.getElementById('contactService').value;

    if (!name || !email) {
      showToast('Validation Error', 'Please complete all required fields.');
      return;
    }

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Transmitting...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
      form.reset();

      showToast(
        'Inquiry Transmitted! ⚡',
        `Thanks ${name}! Redstone received your request for "${service}" and will respond shortly.`
      );
    }, 1200);
  });
}
