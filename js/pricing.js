/**
 * HaseenTech — Centralized Country-Aware Pricing Configuration & Switcher
 * Transparent starting prices for Pakistan and International markets (US, UK, EU, UAE, CA, AU, SA, PK)
 */

(function () {
  'use strict';

  // Centrally defined country-specific starting rates
  const PRICING_CONFIG = {
    markets: {
      US: {
        country: 'United States',
        currency: 'USD',
        symbol: '$',
        rates: {
          landing: 199,
          wordpress: 399,
          redesign: 299,
          woocommerce: 699,
          customWordpress: 199,
          customWeb: 1200,
          whatsappRule: 349,
          aiChatbot: 499,
          aiAgent: 999,
          automation: 399,
          speed: 129,
          seoMonthly: 199,
          maintenanceMonthly: 79
        },
        marketNote: 'Transparent starting rates in USD for clients in the United States and global international markets.'
      },
      GB: {
        country: 'United Kingdom',
        currency: 'GBP',
        symbol: '£',
        rates: {
          landing: 169,
          wordpress: 329,
          redesign: 249,
          woocommerce: 579,
          customWordpress: 169,
          customWeb: 999,
          whatsappRule: 289,
          aiChatbot: 399,
          aiAgent: 799,
          automation: 329,
          speed: 99,
          seoMonthly: 165,
          maintenanceMonthly: 65
        },
        marketNote: 'Transparent starting rates in GBP for businesses across the United Kingdom.'
      },
      EU: {
        country: 'Germany & European Union',
        currency: 'EUR',
        symbol: '€',
        rates: {
          landing: 189,
          wordpress: 369,
          redesign: 279,
          woocommerce: 649,
          customWordpress: 189,
          customWeb: 1100,
          whatsappRule: 319,
          aiChatbot: 459,
          aiAgent: 929,
          automation: 369,
          speed: 119,
          seoMonthly: 185,
          maintenanceMonthly: 75
        },
        marketNote: 'Transparent starting rates in EUR for clients across Germany and the European Union.'
      },
      AE: {
        country: 'United Arab Emirates',
        currency: 'AED',
        symbol: 'AED ',
        rates: {
          landing: 749,
          wordpress: 1499,
          redesign: 1099,
          woocommerce: 2599,
          customWordpress: 749,
          customWeb: 4499,
          whatsappRule: 1299,
          aiChatbot: 1849,
          aiAgent: 3699,
          automation: 1499,
          speed: 479,
          seoMonthly: 749,
          maintenanceMonthly: 299
        },
        marketNote: 'Transparent starting rates in AED for clients across Dubai, Abu Dhabi, and the UAE.'
      },
      CA: {
        country: 'Canada',
        currency: 'CAD',
        symbol: 'C$',
        rates: {
          landing: 269,
          wordpress: 539,
          redesign: 399,
          woocommerce: 949,
          customWordpress: 269,
          customWeb: 1649,
          whatsappRule: 479,
          aiChatbot: 679,
          aiAgent: 1349,
          automation: 539,
          speed: 179,
          seoMonthly: 269,
          maintenanceMonthly: 109
        },
        marketNote: 'Transparent starting rates in CAD for Canadian businesses.'
      },
      AU: {
        country: 'Australia',
        currency: 'AUD',
        symbol: 'A$',
        rates: {
          landing: 299,
          wordpress: 599,
          redesign: 449,
          woocommerce: 1049,
          customWordpress: 299,
          customWeb: 1799,
          whatsappRule: 529,
          aiChatbot: 749,
          aiAgent: 1499,
          automation: 599,
          speed: 199,
          seoMonthly: 299,
          maintenanceMonthly: 119
        },
        marketNote: 'Transparent starting rates in AUD for Australian and Oceanian businesses.'
      },
      SA: {
        country: 'Saudi Arabia',
        currency: 'SAR',
        symbol: 'SAR ',
        rates: {
          landing: 799,
          wordpress: 1599,
          redesign: 1199,
          woocommerce: 2799,
          customWordpress: 799,
          customWeb: 4800,
          whatsappRule: 1399,
          aiChatbot: 1999,
          aiAgent: 3999,
          automation: 1599,
          speed: 499,
          seoMonthly: 799,
          maintenanceMonthly: 319
        },
        marketNote: 'Transparent starting rates in SAR for clients across Saudi Arabia.'
      },
      PK: {
        country: 'Pakistan',
        currency: 'PKR',
        symbol: 'PKR ',
        rates: {
          landing: 25000,
          wordpress: 50000,
          redesign: 40000,
          woocommerce: 90000,
          customWordpress: 25000,
          customWeb: 150000,
          whatsappRule: 45000,
          aiChatbot: 75000,
          aiAgent: 150000,
          automation: 50000,
          speed: 15000,
          seoMonthly: 25000,
          maintenanceMonthly: 10000
        },
        marketNote: 'Local starting rates in PKR for businesses operating across Pakistan.'
      }
    },
    defaultMarket: 'US'
  };

  function formatPrice(number) {
    return number.toLocaleString('en-US');
  }

  function updatePricing(marketKey) {
    const market = PRICING_CONFIG.markets[marketKey] || PRICING_CONFIG.markets[PRICING_CONFIG.defaultMarket];

    // Update currency symbols
    document.querySelectorAll('.pricing-currency-sym').forEach(el => {
      el.textContent = market.symbol;
    });

    // Update all rate elements via data-rate attribute
    Object.keys(market.rates).forEach(rateKey => {
      const elements = document.querySelectorAll(`[data-rate="${rateKey}"]`);
      elements.forEach(el => {
        el.textContent = formatPrice(market.rates[rateKey]);
      });
    });

    // Backwards-compatible legacy data-tier bindings
    const landingEl = document.querySelector('[data-tier="landing"]');
    if (landingEl) landingEl.textContent = formatPrice(market.rates.landing);

    const businessEl = document.querySelector('[data-tier="business"]');
    if (businessEl) businessEl.textContent = formatPrice(market.rates.wordpress);

    const wooEl = document.querySelector('[data-tier="woocommerce"]');
    if (wooEl) wooEl.textContent = formatPrice(market.rates.woocommerce);

    // Update market notes & currency codes
    const noteEl = document.getElementById('pricing-market-subtext');
    if (noteEl) noteEl.textContent = market.marketNote;

    const codePills = document.querySelectorAll('.pricing-currency-code');
    codePills.forEach(pill => {
      pill.textContent = market.currency;
    });

    // Persist user selection
    try {
      localStorage.setItem('ht_selected_market', marketKey);
    } catch (e) {
      // LocalStorage access restricted in sandboxed iframes
    }
  }

  function init() {
    const selector = document.getElementById('country-select');
    if (!selector) return;

    let savedMarket = PRICING_CONFIG.defaultMarket;
    try {
      const stored = localStorage.getItem('ht_selected_market');
      if (stored && PRICING_CONFIG.markets[stored]) {
        savedMarket = stored;
      }
    } catch (e) {
      savedMarket = PRICING_CONFIG.defaultMarket;
    }

    selector.value = savedMarket;
    updatePricing(savedMarket);

    selector.addEventListener('change', function () {
      updatePricing(this.value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.HaseenTechPricing = {
    config: PRICING_CONFIG,
    updatePricing: updatePricing
  };
})();
