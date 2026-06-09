/* ==================================================================
   Minimal interactivity for Accordion / Tabs / Carousel so the
   emulated Core Components behave like the real AEM clientlib JS.
   ================================================================== */
(function () {
    'use strict';

    function initAccordion() {
        document.querySelectorAll('.cmp-accordion__button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                var panel = document.getElementById(btn.getAttribute('aria-controls'));
                if (panel) panel.classList.toggle('cmp-accordion__panel--hidden', expanded);
            });
        });
    }

    function initTabs() {
        document.querySelectorAll('.cmp-tabs').forEach(function (tabs) {
            var tabEls = tabs.querySelectorAll('.cmp-tabs__tab');
            var panels = tabs.querySelectorAll('.cmp-tabs__tabpanel');
            tabEls.forEach(function (tab, i) {
                tab.addEventListener('click', function () {
                    tabEls.forEach(function (t) { t.classList.remove('cmp-tabs__tab--active'); });
                    panels.forEach(function (p) { p.classList.remove('cmp-tabs__tabpanel--active'); });
                    tab.classList.add('cmp-tabs__tab--active');
                    if (panels[i]) panels[i].classList.add('cmp-tabs__tabpanel--active');
                });
            });
        });
    }

    function initCarousel() {
        document.querySelectorAll('.cmp-carousel').forEach(function (carousel) {
            var items = carousel.querySelectorAll('.cmp-carousel__item');
            var indicators = carousel.querySelectorAll('.cmp-carousel__indicator');
            var current = 0;
            function show(idx) {
                current = (idx + items.length) % items.length;
                items.forEach(function (it, i) { it.classList.toggle('cmp-carousel__item--active', i === current); });
                indicators.forEach(function (ind, i) { ind.classList.toggle('cmp-carousel__indicator--active', i === current); });
            }
            var prev = carousel.querySelector('[data-carousel="prev"]');
            var next = carousel.querySelector('[data-carousel="next"]');
            if (prev) prev.addEventListener('click', function () { show(current - 1); });
            if (next) next.addEventListener('click', function () { show(current + 1); });
            show(0);
        });
    }

    function init() { initAccordion(); initTabs(); initCarousel(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
