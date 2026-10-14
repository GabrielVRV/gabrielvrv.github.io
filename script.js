document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================================
    // NAVIGATION (section switching + hash routing)
    // ============================================================
    const navLinks   = document.querySelectorAll('.nav-link');
    const sections   = document.querySelectorAll('.page-section');
    const hamburger  = document.querySelector('.hamburger');
    const navMenu    = document.querySelector('.nav-menu');
    const DEFAULT_SECTION = '#inicio';

    const isValidSection = (hash) =>
        [...sections].some(s => '#' + s.id === hash);

    const showSection = (targetId) => {
        if (!targetId.startsWith('#')) targetId = '#' + targetId;
        if (!isValidSection(targetId)) targetId = DEFAULT_SECTION;

        sections.forEach(s => s.classList.toggle('active', '#' + s.id === targetId));
        navLinks.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === targetId));

        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

        if (targetId === '#sobre') triggerCounters();
    };

    const setMenuOpen = (open) => {
        hamburger.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                if (location.hash !== href) history.pushState(null, '', href);
                showSection(href);
                setMenuOpen(false);
            }
        });
    });

    // Back/forward buttons and manual hash edits
    window.addEventListener('hashchange', () => showSection(location.hash || DEFAULT_SECTION));

    hamburger.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('active')));

    // ============================================================
    // THEME TOGGLE  (initial theme is applied by the inline script in <head>)
    // ============================================================
    const root      = document.documentElement;
    const themeBtn  = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    const applyTheme = (isDark) => {
        root.classList.toggle('light-mode', !isDark);
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    };

    const getSavedTheme = () => {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    };

    applyTheme(!root.classList.contains('light-mode'));

    themeBtn.addEventListener('click', () => {
        const isDark = root.classList.contains('light-mode');
        applyTheme(isDark);
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    });

    // Follow the OS theme while the user hasn't picked one explicitly
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!getSavedTheme()) applyTheme(!e.matches);
    });

    // ============================================================
    // TYPING ANIMATION
    // ============================================================
    const typingEl  = document.getElementById('typing-text');
    let   phraseIdx = 0;
    let   charIdx   = 0;
    let   deleting  = false;

    const TYPING_PHRASES = [
        'Desenvolvedor Full Stack',
        'Progress ABL & Angular',
        'Python & APIs REST',
        'TOTVS Datasul Developer',
        'Entusiasta de IA'
    ];

    const type = () => {
        const phrase = TYPING_PHRASES[phraseIdx % TYPING_PHRASES.length];

        if (deleting) {
            typingEl.textContent = phrase.substring(0, --charIdx);
        } else {
            typingEl.textContent = phrase.substring(0, ++charIdx);
        }

        let delay = deleting ? 55 : 105;

        if (!deleting && charIdx === phrase.length) {
            delay    = 2200;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            phraseIdx++;
            delay = 380;
        }

        setTimeout(type, delay);
    };

    // Reduced motion: swap whole phrases instead of typing letter by letter
    const rotatePhrases = () => {
        typingEl.textContent = TYPING_PHRASES[phraseIdx++ % TYPING_PHRASES.length];
        setTimeout(rotatePhrases, 3000);
    };

    // ============================================================
    // STAT COUNTERS
    // ============================================================
    // Values computed from the page itself, so they never get out of date
    const AUTO_COUNTS = {
        projects: () => document.querySelectorAll('#projetos .project-card').length
    };

    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const counter = AUTO_COUNTS[el.dataset.count];
        if (counter) el.dataset.target = counter();
    });

    let countersRun = false;

    const triggerCounters = () => {
        if (countersRun) return;
        countersRun = true;

        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target, 10);

            if (prefersReducedMotion) {
                el.textContent = target;
                return;
            }

            const duration = 1100;
            const start    = performance.now();

            const tick = (now) => {
                const p    = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
                el.textContent = Math.floor(ease * target);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            };

            requestAnimationFrame(tick);
        });
    };

    // ============================================================
    // PROJECT CAROUSELS
    // ============================================================
    const initCarousels = () => {
        document.querySelectorAll('.project-media').forEach(media => {
            const items = [...media.children].filter(el =>
                el.tagName === 'IMG' || el.tagName === 'VIDEO'
            );

            if (items.length < 2) return;

            // Wrap items in slides
            const slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'project-slides';

            items.forEach((item, i) => {
                const slide = document.createElement('div');
                slide.className = 'project-slide' + (i === 0 ? ' active' : '');
                if (item.tagName === 'VIDEO') {
                    item.muted = true;
                    item.loop  = true;
                    item.playsInline = true;
                }
                slide.appendChild(item);
                slidesWrapper.appendChild(slide);
            });

            // Move overlay (if present) into the wrapper so it stays on top
            const overlay = media.querySelector('.project-overlay');
            if (overlay) slidesWrapper.appendChild(overlay);

            media.innerHTML = '';
            media.appendChild(slidesWrapper);

            // --- Nav buttons ---
            const prevBtn = document.createElement('button');
            prevBtn.className = 'project-nav project-nav-prev';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
            prevBtn.setAttribute('aria-label', 'Imagem anterior');

            const nextBtn = document.createElement('button');
            nextBtn.className = 'project-nav project-nav-next';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
            nextBtn.setAttribute('aria-label', 'Próxima imagem');

            // --- Dots ---
            const dotsWrapper = document.createElement('div');
            dotsWrapper.className = 'project-dots';
            items.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'project-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Ir para imagem ' + (i + 1) + ' de ' + items.length);
                dotsWrapper.appendChild(dot);
            });

            media.appendChild(prevBtn);
            media.appendChild(nextBtn);
            media.appendChild(dotsWrapper);

            // --- State ---
            const slides = slidesWrapper.querySelectorAll('.project-slide');
            const dots   = dotsWrapper.querySelectorAll('.project-dot');
            let   current = 0;

            const goTo = (idx) => {
                slides[current].classList.remove('active');
                dots[current].classList.remove('active');
                dots[current].removeAttribute('aria-current');

                // Pause video leaving active slide
                const leavingVideo = slides[current].querySelector('video');
                if (leavingVideo) leavingVideo.pause();

                current = (idx + slides.length) % slides.length;

                slides[current].classList.add('active');
                dots[current].classList.add('active');
                dots[current].setAttribute('aria-current', 'true');

                // Autoplay video entering active slide
                const enteringVideo = slides[current].querySelector('video');
                if (enteringVideo && !prefersReducedMotion) enteringVideo.play().catch(() => {});
            };

            dots[0].setAttribute('aria-current', 'true');

            prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
            nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
            dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }));

            // Touch swipe
            let touchStartX = 0;
            media.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
            media.addEventListener('touchend', (e) => {
                const dx = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
            });
        });
    };

    // ============================================================
    // LIGHTBOX
    // ============================================================
    const initLightbox = () => {
        const lb        = document.getElementById('lightbox');
        const lbImg     = document.getElementById('lb-img');
        const lbClose   = document.getElementById('lb-close');
        const lbPrev    = document.getElementById('lb-prev');
        const lbNext    = document.getElementById('lb-next');
        const lbCounter = document.getElementById('lb-counter');
        const lbVideo   = document.getElementById('lb-video');

        let gallery   = [];
        let lbCurrent = 0;
        let lastFocused = null;

        const isOpen = () => lb.classList.contains('open');

        const render = () => {
            const item    = gallery[lbCurrent];
            const isVideo = item.type === 'video';
            lbImg.hidden   = isVideo;
            lbVideo.hidden = !isVideo;
            if (isVideo) {
                lbVideo.src = item.src;
                lbVideo.load();
                lbVideo.play().catch(() => {});
            } else {
                lbVideo.pause();
                lbVideo.removeAttribute('src');
                lbImg.src = item.src;
                lbImg.alt = item.alt || '';
            }
            const multi = gallery.length > 1;
            lbPrev.classList.toggle('hidden', !multi);
            lbNext.classList.toggle('hidden', !multi);
            lbCounter.textContent = multi ? (lbCurrent + 1) + ' / ' + gallery.length : '';
        };

        const openLightbox = (items, idx) => {
            gallery     = items;
            lbCurrent   = idx;
            lastFocused = document.activeElement;
            render();
            lb.classList.add('open');
            lb.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            lbClose.focus();
        };

        const closeLightbox = () => {
            lbVideo.pause();
            lbVideo.removeAttribute('src');
            lb.classList.remove('open');
            lb.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocused) lastFocused.focus();
        };

        const lbGoTo = (dir) => {
            lbCurrent = (lbCurrent + dir + gallery.length) % gallery.length;
            render();
        };

        // Keep Tab focus inside the lightbox while it's open
        const trapFocus = (e) => {
            const focusables = [...lb.querySelectorAll('button, video[controls]')]
                .filter(el => !el.hidden && !el.classList.contains('hidden'));
            if (!focusables.length) return;
            const first = focusables[0];
            const last  = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        lbClose.addEventListener('click', closeLightbox);
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
        lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbGoTo(-1); });
        lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbGoTo(1); });

        document.addEventListener('keydown', (e) => {
            if (!isOpen()) return;
            if (e.key === 'Escape')     closeLightbox();
            if (e.key === 'ArrowLeft')  lbGoTo(-1);
            if (e.key === 'ArrowRight') lbGoTo(1);
            if (e.key === 'Tab')        trapFocus(e);
        });

        let lbTouchX = 0;
        lb.addEventListener('touchstart', (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - lbTouchX;
            if (Math.abs(dx) > 40) lbGoTo(dx < 0 ? 1 : -1);
        });

        const mediaSrc = (el) => el.src || el.currentSrc;

        document.querySelectorAll('.project-card').forEach(card => {
            const mediaEls = card.querySelectorAll('.project-media img, .project-media video');

            const buildGallery = () => [...mediaEls].map(el => ({
                src:  mediaSrc(el),
                alt:  el.alt || '',
                type: el.tagName === 'VIDEO' ? 'video' : 'image'
            }));

            mediaEls.forEach(el => {
                el.style.cursor = 'zoom-in';
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const list = buildGallery();
                    const idx  = list.findIndex(i => i.src === mediaSrc(el));
                    openLightbox(list, idx === -1 ? 0 : idx);
                });
            });
        });
    };

    // ============================================================
    // INIT
    // ============================================================
    showSection(location.hash || DEFAULT_SECTION);
    if (prefersReducedMotion) rotatePhrases();
    else setTimeout(type, 600);
    initCarousels();
    initLightbox();
});
