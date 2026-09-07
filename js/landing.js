(function () {
    'use strict';

    var WHATSAPP_NUMBER = '5551989923636';

    /* Determinado com o rótulo (label) da conversão "WhatsApp - Lead".
       Crie-a em Google Ads > Metas > Conversões > Nova conversão e cole aqui
       a parte após a barra (ex.: TE0000abcd). */
    var WHATSAPP_CONVERSION_LABEL = 'G4o9CPaY4fAcEICukrhE';
    var STORAGE_KEY = 'projetei_utm';

    var getStoredUtm = function () {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    };

    var captureUtm = function () {
        try {
            var q = window.location.search || '';
            if (!q || !window.localStorage) return;
            var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
            var found = {};
            var any = false;
            params.forEach(function (p) {
                var m = new RegExp('[?&]' + p + '=([^&]+)').exec(q);
                if (m && m[1]) { found[p] = decodeURIComponent(m[1].replace(/\+/g, ' ')); any = true; }
            });
            if (any) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        } catch (e) {}
    };

    var sourceLine = function () {
        var u = getStoredUtm();
        if (!u) return '';
        var parts = [];
        if (u.utm_medium) parts.push(u.utm_medium);
        if (u.utm_source) parts.push(u.utm_source);
        if (u.utm_campaign) parts.push(u.utm_campaign);
        if (!parts.length && (u.gclid || u.fbclid)) parts.push('anúncio online');
        if (!parts.length) return '';
        return '\n[Origem: ' + parts.join(' / ') + ']';
    };

    captureUtm();

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    var onScroll = function () {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var closeMenu = function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', function () {
        var open = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 820) closeMenu();
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el, index) {
        el.style.transitionDelay = (index % 4) * 0.08 + 's';
        revealObserver.observe(el);
    });

    var countersAnimated = false;
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });

    function animateCounters() {
        document.querySelectorAll('[data-target]').forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 1600;
            var start = null;

            function step(ts) {
                if (!start) start = ts;
                var progress = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    var statsBar = document.querySelector('.stats-bar');
    if (statsBar) counterObserver.observe(statsBar);

    document.querySelectorAll('.faq-item').forEach(function (item) {
        var q = item.querySelector('.faq-q');
        var a = item.querySelector('.faq-a');
        q.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.faq-a').style.maxHeight = null;
                other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('open');
                a.style.maxHeight = a.scrollHeight + 'px';
                q.setAttribute('aria-expanded', 'true');
            }
        });
    });

    var testerStage = document.getElementById('testerStage');
    var testerSlides = testerStage ? testerStage.querySelectorAll('.tester-slide') : [];
    var testerThumbsWrap = document.getElementById('testerThumbs');
    var testerThumbs = testerThumbsWrap ? testerThumbsWrap.querySelectorAll('.tester-thumb') : [];
    var testerCurrent = document.getElementById('testerCurrent');
    var testerTotal = document.getElementById('testerTotal');
    var testerIdx = 0;

    if (testerTotal) testerTotal.textContent = String(testerSlides.length);

    var goSlide = function (n) {
        if (!testerSlides.length) return;
        testerIdx = (n + testerSlides.length) % testerSlides.length;
        testerSlides.forEach(function (slide, k) {
            slide.classList.toggle('active', k === testerIdx);
        });
        Array.prototype.forEach.call(testerThumbs, function (thumb, k) {
            thumb.classList.toggle('active', k === testerIdx);
            if (k === testerIdx && thumb.scrollIntoView) {
                thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });
        if (testerCurrent) testerCurrent.textContent = String(testerIdx + 1);
    };

    var prevBtn = document.getElementById('testerPrev');
    var nextBtn = document.getElementById('testerNext');

    if (prevBtn) prevBtn.addEventListener('click', function () { goSlide(testerIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goSlide(testerIdx + 1); });

    Array.prototype.forEach.call(testerThumbs, function (thumb) {
        thumb.addEventListener('click', function () {
            goSlide(parseInt(thumb.getAttribute('data-index'), 10));
        });
    });

    var swipeX = null;

    if (testerStage) {
        testerStage.addEventListener('pointerdown', function (e) {
            swipeX = e.clientX;
        });
        testerStage.addEventListener('pointerup', function (e) {
            if (swipeX === null) return;
            var dx = e.clientX - swipeX;
            swipeX = null;
            if (Math.abs(dx) > 45) {
                goSlide(testerIdx + (dx < 0 ? 1 : -1));
            }
        });
        testerStage.addEventListener('pointerleave', function () {
            swipeX = null;
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!testerStage || e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var rect = testerStage.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            goSlide(testerIdx + (e.key === 'ArrowRight' ? 1 : -1));
        }
    });

    var selections = {};

    document.querySelectorAll('.tester-group').forEach(function (group) {
        var cat = group.getAttribute('data-cat');
        group.querySelectorAll('.swatch').forEach(function (swatch) {
            swatch.addEventListener('click', function () {
                var color = swatch.style.getPropertyValue('--sw');
                var wasActive = swatch.classList.contains('active');

                group.querySelectorAll('.swatch').forEach(function (s) {
                    s.classList.remove('active');
                    s.setAttribute('aria-pressed', 'false');
                });

                var tint = testerStage.querySelector('.tester-tint[data-cat="' + cat + '"]');

                if (wasActive || !color) {
                    delete selections[cat];
                    if (tint) tint.classList.remove('on');
                    return;
                }

                swatch.classList.add('active');
                swatch.setAttribute('aria-pressed', 'true');
                selections[cat] = color;

                if (tint) {
                    tint.style.background = color;
                    tint.classList.add('on');
                }
            });
            swatch.setAttribute('aria-pressed', 'false');
        });
    });

    var resetBtn = document.getElementById('testerReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            selections = {};
            document.querySelectorAll('.swatch.active').forEach(function (s) {
                s.classList.remove('active');
                s.setAttribute('aria-pressed', 'false');
            });
            document.querySelectorAll('.tester-tint.on').forEach(function (t) {
                t.classList.remove('on');
            });
        });
    }

    var phoneInput = document.getElementById('whatsapp');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            var digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
            var formatted = digits;
            if (digits.length > 6) {
                formatted = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
            } else if (digits.length > 2) {
                formatted = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
            } else if (digits.length > 0) {
                formatted = '(' + digits;
            }
            phoneInput.value = formatted;
        });
    }

    var form = document.getElementById('leadForm');
    var success = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nome = document.getElementById('nome');
            var whatsapp = document.getElementById('whatsapp');
            var email = document.getElementById('email');
            var tipo = document.getElementById('tipo');

            var valid = true;
            [nome, whatsapp, email, tipo].forEach(function (field) {
                if (!field || !field.value.trim()) {
                    field.style.borderColor = '#c0392b';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!valid) return;

            var digits = whatsapp.value.replace(/\D/g, '');
            var message =
                'Olá! Me chamo ' + nome.value.trim() +
                ' e quero começar pelo anteprojeto para ver minha casa em 3D.\n' +
                'Interesse: ' + tipo.value + '\n' +
                'E-mail: ' + email.value.trim() + '\n' +
                'WhatsApp: ' + digits +
                '\n\nPodemos conversar?';

            form.style.display = 'none';
            success.hidden = false;

            fbq('track', 'Lead', { content_name: 'Formulário', value: 1.0, currency: 'BRL' });
            gtag('event', 'conversion', { 'send_to': 'AW-18371352320/GT-TNHW6WSW', 'value': 1.0, 'currency': 'BRL' });
            window.open(
                'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message + sourceLine()),
                '_blank',
                'noopener'
            );
        });
    }

    /* Cliques diretos em qualquer link wa.me: registro de intenção de contato
       via WhatsApp (Meta Contact + conversão própria no Google Ads), com
       abertura do link garantida mesmo se o envio do evento travar a página. */
    document.addEventListener('click', function (e) {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var link = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
        if (!link) return;

        var href = link.getAttribute('href') || '';
        var src = sourceLine();
        if (src) {
            var hasText = href.indexOf('?text=') !== -1;
            href += (hasText ? '' : '?text=') + encodeURIComponent(hasText ? src : src.replace(/^\n/, ''));
        }

        e.preventDefault();

        if (typeof fbq === 'function') {
            fbq('track', 'Contact', { content_name: 'WhatsApp', value: 1.0, currency: 'BRL' });
        }

        var opened = false;
        var openWa = function () {
            if (opened) return;
            opened = true;
            window.open(href, '_blank', 'noopener');
        };

        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-18371352320/' + WHATSAPP_CONVERSION_LABEL,
                'value': 1.0,
                'currency': 'BRL',
                'event_callback': openWa
            });
        } else {
            openWa();
        }
        setTimeout(openWa, 800);
    });
})();
