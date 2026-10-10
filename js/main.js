/**
 * HaseenTech — Main Interactive JavaScript
 * Navigation, Portfolio Filtering, Contact Validation & Mailto Handlers
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Navigation & Mobile Drawer
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const backdrop = document.getElementById('drawer-backdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    // Header scroll background toggle
    function checkHeaderScroll() {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
    checkHeaderScroll();

    function openDrawer() {
      drawer?.classList.add('open');
      backdrop?.classList.add('active');
      menuToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      drawerClose?.focus();
    }

    function closeDrawer() {
      drawer?.classList.remove('open');
      backdrop?.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuToggle?.focus();
    }

    menuToggle?.addEventListener('click', function () {
      const isOpen = drawer?.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerClose?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer?.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Portfolio Filtering
     ------------------------------------------------------------------------ */
  function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.portfolio-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const category = this.getAttribute('data-filter');

        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });

        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        projectCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Active Navigation State on Scroll
     ------------------------------------------------------------------------ */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              if (href === '#' + id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  /* ------------------------------------------------------------------------
     4. Contact Form Validation & Transparent Client-Side Dispatch
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const serviceSelect = document.getElementById('contact-service');
    const messageInput = document.getElementById('contact-message');
    const countryInput = document.getElementById('contact-country');
    const budgetSelect = document.getElementById('contact-budget');

    const statusContainer = document.getElementById('form-status-message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setFieldError(field, errorId, hasError) {
      const group = field.closest('.form-group');
      if (group) {
        if (hasError) {
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
      }
    }

    // Realtime error clearing
    [nameInput, emailInput, serviceSelect, messageInput].forEach(function (input) {
      input?.addEventListener('input', function () {
        setFieldError(this, null, false);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'err-name', true);
        isValid = false;
      } else {
        setFieldError(nameInput, 'err-name', false);
      }

      // Validate Email
      if (!validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, 'err-email', true);
        isValid = false;
      } else {
        setFieldError(emailInput, 'err-email', false);
      }

      // Validate Service
      if (!serviceSelect.value) {
        setFieldError(serviceSelect, 'err-service', true);
        isValid = false;
      } else {
        setFieldError(serviceSelect, 'err-service', false);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
        setFieldError(messageInput, 'err-message', true);
        isValid = false;
      } else {
        setFieldError(messageInput, 'err-message', false);
      }

      if (!isValid) {
        if (statusContainer) {
          statusContainer.className = 'form-status notice';
          statusContainer.textContent = 'Please correct the highlighted fields before submitting.';
          statusContainer.style.display = 'block';
        }
        return;
      }

      const clientName = nameInput.value.trim();
      const clientEmail = emailInput.value.trim();
      const clientCountry = countryInput ? countryInput.value.trim() : 'Unspecified';
      const selectedService = serviceSelect.options[serviceSelect.selectedIndex].text;
      const budget = budgetSelect ? budgetSelect.value : 'Not specified';
      const brief = messageInput.value.trim();

      const emailSubject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${clientName}`);
      const emailBodyText =
        `Hello Hasan,\n\n` +
        `I would like to discuss a project with HaseenTech.\n\n` +
        `• Name: ${clientName}\n` +
        `• Email: ${clientEmail}\n` +
        `• Country / Location: ${clientCountry}\n` +
        `• Project / Package: ${selectedService}\n` +
        `• Estimated Budget: ${budget}\n\n` +
        `Project Summary:\n${brief}\n\n` +
        `Looking forward to your response.\n`;

      const mailtoUrl = `mailto:hello@haseentech.com?subject=${emailSubject}&body=${encodeURIComponent(emailBodyText)}`;
      const whatsappText = encodeURIComponent(`Hi Hasan, this is ${clientName}. I'd like to discuss a project: ${selectedService}. Details: ${brief.slice(0, 100)}...`);
      const whatsappUrl = `https://wa.me/923001234567?text=${whatsappText}`;

      // Render transparent confirmation UI
      if (statusContainer) {
        statusContainer.className = 'form-status success';
        statusContainer.innerHTML = `
          <div style="margin-bottom: 12px;">
            <strong>✓ Inquiry details validated!</strong><br>
            To protect your privacy, HaseenTech does not store your unencrypted data on unauthorized web databases. Your project brief is prepared directly for Hasan Ismail:
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <a href="${mailtoUrl}" class="btn btn-primary btn-sm" id="btn-dispatch-email" style="font-size: 13px;">
              <svg viewBox="0 0 24 24" stroke-width="2" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              Send via Email App
            </a>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size: 13px;">
              <svg viewBox="0 0 24 24" stroke-width="2" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Send via WhatsApp
            </a>
            <button type="button" class="btn btn-outline btn-sm" id="btn-copy-inquiry" style="font-size: 13px;">
              Copy Brief to Clipboard
            </button>
          </div>
          <div id="copy-confirmation" style="font-size: 11px; margin-top: 6px; color: var(--color-cyan); display: none;">
            Brief copied to clipboard! You can paste it into any email client or chat.
          </div>
        `;
        statusContainer.style.display = 'block';

        // Wire copy button
        const copyBtn = document.getElementById('btn-copy-inquiry');
        const copyConfirm = document.getElementById('copy-confirmation');
        if (copyBtn && copyConfirm) {
          copyBtn.addEventListener('click', function () {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(emailBodyText).then(function () {
                copyConfirm.style.display = 'block';
                copyBtn.textContent = 'Copied!';
                setTimeout(function () {
                  copyBtn.textContent = 'Copy Brief to Clipboard';
                }, 3000);
              });
            }
          });
        }

        // Automatically trigger mailto link
        window.location.href = mailtoUrl;
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Back to Top Smooth Scroll
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     Initialization on DOM Ready
     ------------------------------------------------------------------------ */
  function init() {
    initNavigation();
    initPortfolioFilters();
    initActiveNavLinks();
    initContactForm();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
