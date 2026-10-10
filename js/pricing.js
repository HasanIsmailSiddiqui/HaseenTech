/**
 * HaseenTech — Centralized Country-Aware Pricing Configuration & Switcher
 * Packages: Landing Page / Business Website / WooCommerce Store
 * Markets: USA, UK, EU, UAE, Canada, Australia, Saudi Arabia, Pakistan
 */

(function () {
  'use strict';

  // Centrally defined country-specific package prices
  const PRICING_CONFIG = {
    markets: {
      US: {
        country: 'United States',
        currency: 'USD',
        symbol: '$',
        rates: {
          landing: 299,
          business: 599,
          woocommerce: 999
        },
        marketNote: 'Initial proposals in USD for clients in the United States and international markets.'
      },
      GB: {
        country: 'United Kingdom',
        currency: 'GBP',
        symbol: '£',
        rates: {
          landing: 249,
          business: 499,
          woocommerce: 849
        },
        marketNote: 'Initial proposals in GBP for businesses based in the United Kingdom.'
      },
      EU: {
        country: 'European Union',
        currency: 'EUR',
        symbol: '€',
        rates: {
          landing: 279,
          business: 549,
          woocommerce: 949
        },
        marketNote: 'Initial proposals in EUR for Eurozone and European clients.'
      },
      AE: {
        country: 'United Arab Emirates',
        currency: 'AED',
        symbol: 'AED ',
        rates: {
          landing: 999,
          business: 1999,
          woocommerce: 3499
        },
        marketNote: 'Initial proposals in AED for clients across Dubai, Abu Dhabi, and the UAE.'
      },
      CA: {
        country: 'Canada',
        currency: 'CAD',
        symbol: 'C$',
        rates: {
          landing: 399,
          business: 799,
          woocommerce: 1299
        },
        marketNote: 'Initial proposals in CAD for Canadian businesses.'
      },
      AU: {
        country: 'Australia',
        currency: 'AUD',
        symbol: 'A$',
        rates: {
          landing: 449,
          business: 899,
          woocommerce: 1499
        },
        marketNote: 'Initial proposals in AUD for Australian and Oceanian clients.'
      },
      SA: {
        country: 'Saudi Arabia',
        currency: 'SAR',
        symbol: 'SAR ',
        rates: {
          landing: 1099,
          business: 2199,
          woocommerce: 3899
        },
        marketNote: 'Initial proposals in SAR for clients across Saudi Arabia.'
      },
      PK: {
        country: 'Pakistan',
        currency: 'PKR',
        symbol: 'PKR ',
        rates: {
          landing: 20000,
          business: 40000,
          woocommerce: 75000
        },
        marketNote: 'Local rates in PKR for businesses operating across Pakistan.'
      }
    },
    defaultMarket: 'US'
  };

  function formatPrice(number) {
    return number.toLocaleString('en-US');
  }

  function updatePricing(marketKey) {
    const market = PRICING_CONFIG.markets[marketKey] || PRICING_CONFIG.markets[PRICING_CONFIG.defaultMarket];

    // Update symbols
    document.querySelectorAll('.pricing-currency-sym').forEach(el => {
      el.textContent = market.symbol;
    });

    // Update prices
    const landingEl = document.querySelector('[data-tier="landing"]');
    if (landingEl) landingEl.textContent = formatPrice(market.rates.landing);

    const businessEl = document.querySelector('[data-tier="business"]');
    if (businessEl) businessEl.textContent = formatPrice(market.rates.business);

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
      // LocalStorage access might be restricted
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
