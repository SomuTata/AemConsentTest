/* ==================================================================
   Demo trackers + cookie status panel — TESTING AID ONLY.
   This simulates the kind of third-party / analytics cookies that a
   consent SDK is supposed to manage, and renders a live panel so you
   can watch what your cookie-consent SDK allows or blocks.
   Remove this file when you move to real AEM.
   ================================================================== */
(function () {
    'use strict';

    // ---- Simulated "marketing/analytics" cookie setters --------------
    // In a real site these would be Google Analytics, Meta Pixel, etc.
    // A correctly-integrated consent SDK should prevent / categorize them
    // until the user grants consent.
    function setDemoCookie(name, value) {
        // 400-day expiry, root path
        var d = new Date();
        d.setTime(d.getTime() + 400 * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + encodeURIComponent(value) +
            ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
        render();
    }

    function clearAllCookies() {
        document.cookie.split(';').forEach(function (c) {
            var name = c.split('=')[0].trim();
            if (name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            }
        });
        render();
    }

    // ---- Live cookie status panel ------------------------------------
    function render() {
        var panel = document.getElementById('cookie-status-panel');
        if (!panel) return;
        var cookies = document.cookie ? document.cookie.split(';') : [];
        var list = cookies.length
            ? cookies.map(function (c) {
                  return '<div class="cookie-row">🍪 ' + c.trim() + '</div>';
              }).join('')
            : '<div class="empty">No cookies set</div>';

        panel.innerHTML =
            '<h4>Cookie status (' + cookies.length + ')</h4>' +
            list +
            '<div>' +
            '<button data-action="set-analytics">Set analytics cookie</button>' +
            '<button data-action="set-marketing">Set marketing cookie</button>' +
            '<button data-action="clear">Clear all</button>' +
            '<button data-action="refresh">Refresh</button>' +
            '</div>';
    }

    function init() {
        var panel = document.createElement('div');
        panel.id = 'cookie-status-panel';
        document.body.appendChild(panel);

        panel.addEventListener('click', function (e) {
            var action = e.target.getAttribute('data-action');
            if (action === 'set-analytics') setDemoCookie('_ga_demo', 'GA1.2.' + Date.now());
            else if (action === 'set-marketing') setDemoCookie('_fbp_demo', 'fb.1.' + Date.now());
            else if (action === 'clear') clearAllCookies();
            else if (action === 'refresh') render();
        });

        render();
        // Re-render periodically so cookies set by your SDK appear live.
        setInterval(render, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
