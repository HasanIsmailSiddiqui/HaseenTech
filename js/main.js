/**
 * HaseenTech — Main Interactive Logic
 * Obsidian Digital Studio Design System
 * Navigation, Active State, Contact Form Validation, Accessible Handlers, Portfolio Filters
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Shared Header & Mobile Menu Drawer
     ------------------------------------------------------------------------ */
  function initHeaderNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('menu-close') || document.getElementById('drawer-close');
    const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

    // Scroll state for header styling
    function onScroll() {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Drawer open/close
    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      backdrop?.classList.add('active');
      toggle?.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      backdrop?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      toggle?.focus();
    }

    toggle?.addEventListener('click', function () {
      const isOpen = drawer?.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', function () {
        // Close drawer cleanly on navigation
        if (drawer?.classList.contains('open')) {
          drawer.classList.remove('open');
          backdrop?.classList.remove('active');
          toggle?.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
          backdrop?.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    });

    // Desktop Dropdown accessible interactions
    const dropdownItem = document.querySelector('.nav-item-dropdown');
    const dropdownTrigger = dropdownItem?.querySelector('.dropdown-trigger');

    function openDropdown() {
      if (!dropdownItem) return;
      dropdownItem.classList.add('open');
      dropdownTrigger?.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      if (!dropdownItem) return;
      dropdownItem.classList.remove('open');
      dropdownTrigger?.setAttribute('aria-expanded', 'false');
    }

    if (dropdownTrigger && dropdownItem) {
      dropdownTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = dropdownItem.classList.contains('open');
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      dropdownItem.addEventListener('mouseleave', closeDropdown);

      // Close dropdown if clicking anywhere outside
      document.addEventListener('click', function (e) {
        if (!dropdownItem.contains(e.target)) {
          closeDropdown();
        }
      });

      // Close dropdown on focusout (when tabbing away from dropdown)
      dropdownItem.addEventListener('focusout', function (e) {
        if (!dropdownItem.contains(e.relatedTarget)) {
          closeDropdown();
        }
      });
    }

    // Escape key handler for both drawer and dropdown
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (drawer?.classList.contains('open')) {
          closeDrawer();
        } else if (dropdownItem?.classList.contains('open') || dropdownItem?.contains(document.activeElement)) {
          closeDropdown();
          dropdownTrigger?.focus();
        }
      }
    });

    // Close mobile drawer if window resized to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 868 && drawer?.classList.contains('open')) {
        drawer.classList.remove('open');
        backdrop?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        backdrop?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Active Page Highlighting Across All Pages
     ------------------------------------------------------------------------ */
  function highlightActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isServicePage = currentPath.startsWith('service') || currentPath === 'services.html';

    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .drawer-link, .drawer-sublink');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('#')[0].split('?')[0];

      if (targetPage === currentPath || (currentPath === '' && targetPage === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // If on any service page, ensure parent Services trigger is active
    if (isServicePage) {
      const parentServices = document.querySelector('.dropdown-trigger');
      if (parentServices) {
        parentServices.classList.add('active');
      }
    }
  }

  /* ------------------------------------------------------------------------
     3. Copyright Current Year
     ------------------------------------------------------------------------ */
  function initCopyrightYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ------------------------------------------------------------------------
     4. Contact Form Validation & Transparent Dispatch
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('contact-form') || document.getElementById('inquiry-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const countryInput = document.getElementById('contact-country');
    const serviceSelect = document.getElementById('contact-service');
    const budgetSelect = document.getElementById('contact-budget');
    const messageInput = document.getElementById('contact-message');
    const statusContainer = document.getElementById('form-status-message');

    // Handle service pre-selection via URL param ?service=... or ?package=...
    const urlParams = new URLSearchParams(window.location.search);
    let preselectedService = urlParams.get('service');
    const preselectedPackage = urlParams.get('package');

    // Friendly aliases
    const serviceAliases = {
      'ai': 'ai-chatbots',
      'agent': 'ai-chatbots',
      'agents': 'ai-chatbots',
      'whatsapp': 'whatsapp-chatbot',
      'chatbots': 'whatsapp-chatbot',
      'web': 'custom-web',
      'custom-web-development': 'custom-web',
      'custom-website': 'custom-web',
      'business': 'wordpress',
      'speed': 'seo-speed',
      'seo': 'seo-speed'
    };
    if (preselectedService && serviceAliases[preselectedService]) {
      preselectedService = serviceAliases[preselectedService];
    }

    if (serviceSelect) {
      if (preselectedService && serviceSelect.querySelector(`option[value="${preselectedService}"]`)) {
        serviceSelect.value = preselectedService;
      } else if (preselectedPackage) {
        if (preselectedPackage === 'landing') serviceSelect.value = 'landing';
        else if (preselectedPackage === 'business') serviceSelect.value = 'wordpress';
        else if (preselectedPackage === 'woocommerce') serviceSelect.value = 'woocommerce';
      }
    }

    function setFieldError(field, hasError) {
      if (!field) return;
      const group = field.closest('.form-group-modern') || field.closest('.form-group-obsidian');
      if (group) {
        if (hasError) {
          group.classList.add('has-error');
          field.style.borderColor = '#EF4444';
        } else {
          group.classList.remove('has-error');
          field.style.borderColor = '';
        }
      }
    }

    [nameInput, emailInput, serviceSelect, messageInput].forEach(field => {
      field?.addEventListener('input', function () {
        setFieldError(this, false);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Validate Service
      if (!serviceSelect || !serviceSelect.value) {
        setFieldError(serviceSelect, true);
        isValid = false;
      } else {
        setFieldError(serviceSelect, false);
      }

      // Validate Message
      if (!messageInput || !messageInput.value.trim() || messageInput.value.trim().length < 15) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) {
        if (statusContainer) {
          statusContainer.className = 'form-status-box error';
          statusContainer.textContent = 'Please complete all required fields (marked *) before submitting.';
          statusContainer.style.display = 'block';
        }
        return;
      }

      const clientName = nameInput.value.trim();
      const clientEmail = emailInput.value.trim();
      const clientCountry = countryInput?.value.trim() || 'Not specified';
      const selectedService = serviceSelect.options[serviceSelect.selectedIndex].text;
      const budget = budgetSelect?.value || 'Not specified';
      const brief = messageInput.value.trim();

      const subject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${clientName}`);
      const body =
        `Hello Hasan,\n\n` +
        `I would like to discuss a project with HaseenTech.\n\n` +
        `• Name: ${clientName}\n` +
        `• Email: ${clientEmail}\n` +
        `• Location / Country: ${clientCountry}\n` +
        `• Requested Service: ${selectedService}\n` +
        `• Estimated Budget: ${budget}\n\n` +
        `Project Summary & Scope:\n${brief}\n\n` +
        `Best regards,\n${clientName}`;

      const mailtoUrl = `mailto:hello@haseentech.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      const whatsappText = encodeURIComponent(`Hi Hasan, this is ${clientName}. I would like to discuss a project with HaseenTech: ${selectedService}. Details: ${brief.slice(0, 120)}...`);
      const whatsappUrl = `https://wa.me/923001234567?text=${whatsappText}`;

      if (statusContainer) {
        statusContainer.className = 'form-status-box success';
        statusContainer.innerHTML = `
          <div style="margin-bottom: 12px;">
            <strong style="color: #10B981;">✓ Project brief prepared successfully!</strong><br>
            HaseenTech maintains strict client confidentiality. To ensure direct delivery without third-party email tracking, choose how you would like to dispatch your brief to Hasan Ismail:
          </div>
          <div class="form-actions-transparent">
            <a href="${mailtoUrl}" class="btn btn-primary btn-sm" id="btn-dispatch-email">
              Send via Email Application ↗
            </a>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" id="btn-dispatch-whatsapp">
              Chat on WhatsApp (+92 300 1234567) ↗
            </a>
            <button type="button" class="btn btn-ghost btn-sm" id="btn-copy-brief">
              Copy Brief to Clipboard
            </button>
          </div>
          <div id="copy-confirmation" style="font-size: 12px; margin-top: 8px; color: var(--color-orange); display: none;">
            ✓ Brief copied to clipboard! You can paste it into any email client or messenger.
          </div>
        `;
        statusContainer.style.display = 'block';

        const copyBtn = document.getElementById('btn-copy-brief');
        const copyConfirm = document.getElementById('copy-confirmation');
        if (copyBtn && copyConfirm) {
          copyBtn.addEventListener('click', function () {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(body).then(() => {
                copyConfirm.style.display = 'block';
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                  copyBtn.textContent = 'Copy Brief to Clipboard';
                }, 3000);
              });
            }
          });
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Portfolio Category Filter
     ------------------------------------------------------------------------ */
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn, .filter-btn, button[data-filter]');
    const projectCards = document.querySelectorAll('.portfolio-card-item');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetCategory = this.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        projectCards.forEach(card => {
          const cardCats = (card.getAttribute('data-category') || '').split(/\s+/);
          if (targetCategory === 'all' || cardCats.includes(targetCategory)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Initialize
     ------------------------------------------------------------------------ */
  function init() {
    initHeaderNavigation();
    highlightActiveNavigation();
    initCopyrightYear();
    initContactForm();
    initPortfolioFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
