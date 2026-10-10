/**
 * HaseenTech — Country-Aware Pricing Logic
 * Verified baseline rates for US, UK, EU, UAE, CA, AU, and Pakistan.
 */

(function () {
  'use strict';

  // Verified market pricing definitions
  const pricingMarkets = {
    US: {
      name: 'United States',
      currency: 'USD',
      symbol: '$',
      prices: {
        starter: 299,
        business: 599,
        woocommerce: 999
      },
      note: 'Rates in USD for clients in the United States and global Americas.'
    },
    GB: {
      name: 'United Kingdom',
      currency: 'GBP',
      symbol: '£',
      prices: {
        starter: 249,
        business: 499,
        woocommerce: 849
      },
      note: 'Rates in GBP for UK and British businesses.'
    },
    EU: {
      name: 'European Union',
      currency: 'EUR',
      symbol: '€',
      prices: {
        starter: 279,
        business: 549,
        woocommerce: 949
      },
      note: 'Rates in EUR for European Union and Eurozone clients.'
    },
    AE: {
      name: 'United Arab Emirates',
      currency: 'AED',
      symbol: 'AED ',
      prices: {
        starter: 999,
        business: 1999,
        woocommerce: 3499
      },
      note: 'Rates in AED for Dubai, Abu Dhabi, and UAE businesses.'
    },
    CA: {
      name: 'Canada',
      currency: 'CAD',
      symbol: 'CA$',
      prices: {
        starter: 399,
        business: 799,
        woocommerce: 1299
      },
      note: 'Rates in CAD for Canadian clients.'
    },
    AU: {
      name: 'Australia',
      currency: 'AUD',
      symbol: 'AU$',
      prices: {
        starter: 449,
        business: 899,
        woocommerce: 1499
      },
      note: 'Rates in AUD for Australian and Oceania businesses.'
    },
    PK: {
      name: 'Pakistan',
      currency: 'PKR',
      symbol: 'PKR ',
      prices: {
        starter: 20000,
        business: 40000,
        woocommerce: 75000
      },
      note: 'Local rates in PKR for businesses across Pakistan.'
    }
  };

  function formatNumber(num) {
    return num.toLocaleString('en-US');
  }

  function applyMarketPricing(marketCode) {
    const market = pricingMarkets[marketCode] || pricingMarkets.US;

    // Update symbols and values
    const symbolElements = document.querySelectorAll('.pricing-currency-symbol');
    symbolElements.forEach(function (el) {
      el.textContent = market.symbol;
    });

    const starterEl = document.querySelector('[data-price="starter"]');
    if (starterEl) {
      starterEl.textContent = formatNumber(market.prices.starter);
    }

    const businessEl = document.querySelector('[data-price="business"]');
    if (businessEl) {
      businessEl.textContent = formatNumber(market.prices.business);
    }

    const wooEl = document.querySelector('[data-price="woocommerce"]');
    if (wooEl) {
      wooEl.textContent = formatNumber(market.prices.woocommerce);
    }

    const noteEl = document.getElementById('pricing-market-note');
    if (noteEl) {
      noteEl.textContent = market.note;
    }

    const codePill = document.getElementById('pricing-currency-code');
    if (codePill) {
      codePill.textContent = market.currency;
    }

    // Save user choice
    try {
      localStorage.setItem('haseentech_market', marketCode);
    } catch (e) {
      // LocalStorage might be disabled in private browsing
    }
  }

  function initPricing() {
    const select = document.getElementById('country-select');
    if (!select) return;

    // Load saved or detect default
    let savedMarket = 'US';
    try {
      savedMarket = localStorage.getItem('haseentech_market') || 'US';
    } catch (e) {
      savedMarket = 'US';
    }

    if (pricingMarkets[savedMarket]) {
      select.value = savedMarket;
      applyMarketPricing(savedMarket);
    } else {
      applyMarketPricing('US');
    }

    select.addEventListener('change', function () {
      applyMarketPricing(this.value);
    });

    // Inquire CTA buttons pre-selecting package in contact form
    const packageCtaButtons = document.querySelectorAll('[data-package-trigger]');
    packageCtaButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const pkg = this.getAttribute('data-package-trigger');
        const contactSelect = document.getElementById('contact-service');
        if (contactSelect && pkg) {
          contactSelect.value = pkg;
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricing);
  } else {
    initPricing();
  }
})();
