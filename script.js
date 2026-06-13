document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // NAVIGATION (section switching)
    // ============================================================
    const navLinks   = document.querySelectorAll('.nav-link');
    const sections   = document.querySelectorAll('.page-section');
    const hamburger  = document.querySelector('.hamburger');
    const navMenu    = document.querySelector('.nav-menu');

    const showSection = (targetId) => {
        if (!targetId.startsWith('#')) targetId = '#' + targetId;

        sections.forEach(s => s.classList.toggle('active', '#' + s.id === targetId));
        navLinks.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === targetId));

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetId === '#sobre') triggerCounters();
    };

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                showSection(href);
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ============================================================
    // THEME TOGGLE  (default: dark)
    // ============================================================
    const themeBtn  = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    const setTheme = (isDark) => {
        document.body.classList.toggle('light-mode', !isDark);
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    setTheme(localStorage.getItem('theme') !== 'light');
    themeBtn.addEventListener('click', () => setTheme(document.body.classList.contains('light-mode')));

    // ============================================================
    // LANGUAGE TOGGLE
    // ============================================================
    // ============================================================
    // TYPING ANIMATION
    // ============================================================
    const typingEl   = document.getElementById('typing-text');
    let   phraseIdx  = 0;
    let   charIdx    = 0;
    let   deleting   = false;
    let   typingTimer;

    const TYPING_PHRASES = [
        'Desenvolvedor Full Stack',
        'Progress ABL & Angular',
        'Python & APIs REST',
        'TOTVS Datasul Developer',
        'Entusiasta de IA'
    ];

    const type = () => {
        const phrases = TYPING_PHRASES;
        const phrase  = phrases[phraseIdx % phrases.length];

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

        typingTimer = setTimeout(type, delay);
    };

    const restartTyping = () => {
        clearTimeout(typingTimer);
        typingEl.textContent = '';
        charIdx   = 0;
        deleting  = false;
        phraseIdx = 0;
        setTimeout(type, 350);
    };

    // ============================================================
    // STAT COUNTERS
    // ============================================================
    let countersRun = false;

    const triggerCounters = () => {
        if (countersRun) return;
        countersRun = true;

        document.querySelectorAll('.stat-number').forEach(el => {
            const target   = parseInt(el.dataset.target, 10);
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
            // Collect direct img/video children (ignore .project-overlay)
            const items = [...media.children].filter(el =>
                (el.tagName === 'IMG' || el.tagName === 'VIDEO') &&
                !el.classList.contains('project-overlay')
            );

            if (items.length < 2) {
                // Single media: just make sure the existing img keeps its zoom effect
                return;
            }

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
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.setAttribute('aria-label', 'Previous');

            const nextBtn = document.createElement('button');
            nextBtn.className = 'project-nav project-nav-next';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.setAttribute('aria-label', 'Next');

            // --- Dots ---
            const dotsWrapper = document.createElement('div');
            dotsWrapper.className = 'project-dots';
            items.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'project-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
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

                // Pause video leaving active slide
                const leavingVideo = slides[current].querySelector('video');
                if (leavingVideo) leavingVideo.pause();

                current = (idx + slides.length) % slides.length;

                slides[current].classList.add('active');
                dots[current].classList.add('active');

                // Autoplay video entering active slide
                const enteringVideo = slides[current].querySelector('video');
                if (enteringVideo) enteringVideo.play().catch(() => {});
            };

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

        let gallery  = [];
        let lbCurrent = 0;

        const render = () => {
            const item = gallery[lbCurrent];
            const isVideo = item.type === 'video';
            lbImg.style.display   = isVideo ? 'none' : '';
            lbVideo.style.display = isVideo ? ''     : 'none';
            if (isVideo) {
                lbVideo.src = item.src;
                lbVideo.load();
                lbVideo.play().catch(() => {});
            } else {
                lbVideo.pause();
                lbVideo.src = '';
                lbImg.src = item.src;
                lbImg.alt = item.alt || '';
            }
            const multi = gallery.length > 1;
            lbPrev.classList.toggle('hidden', !multi);
            lbNext.classList.toggle('hidden', !multi);
            lbCounter.textContent = multi ? (lbCurrent + 1) + ' / ' + gallery.length : '';
        };

        const openLightbox = (images, idx) => {
            gallery   = images;
            lbCurrent = idx;
            render();
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lbVideo.pause();
            lbVideo.src = '';
            lb.classList.remove('open');
            document.body.style.overflow = '';
        };

        const lbGoTo = (dir) => {
            lbCurrent = (lbCurrent + dir + gallery.length) % gallery.length;
            render();
        };

        lbClose.addEventListener('click', closeLightbox);
        lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
        lbPrev.addEventListener('click', function(e) { e.stopPropagation(); lbGoTo(-1); });
        lbNext.addEventListener('click', function(e) { e.stopPropagation(); lbGoTo(1); });

        document.addEventListener('keydown', function(e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape')     closeLightbox();
            if (e.key === 'ArrowLeft')  lbGoTo(-1);
            if (e.key === 'ArrowRight') lbGoTo(1);
        });

        var lbTouchX = 0;
        lb.addEventListener('touchstart', function(e) { lbTouchX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function(e) {
            var dx = e.changedTouches[0].clientX - lbTouchX;
            if (Math.abs(dx) > 40) lbGoTo(dx < 0 ? 1 : -1);
        });

        document.querySelectorAll('.project-card').forEach(function(card) {
            function buildGallery() {
                var list = [];
                var slides = card.querySelectorAll('.project-slide');
                if (slides.length) {
                    slides.forEach(function(slide) {
                        var img = slide.querySelector('img');
                        var vid = slide.querySelector('video');
                        if (img) list.push({ src: img.src, alt: img.alt, type: 'image' });
                        if (vid) list.push({ src: vid.src || vid.currentSrc, alt: '', type: 'video' });
                    });
                    return list;
                }
                card.querySelectorAll('.project-media img').forEach(function(i) {
                    list.push({ src: i.src, alt: i.alt, type: 'image' });
                });
                card.querySelectorAll('.project-media video').forEach(function(v) {
                    list.push({ src: v.src || v.currentSrc, alt: '', type: 'video' });
                });
                return list;
            }

            var allImgs = card.querySelectorAll('.project-media img');
            allImgs.forEach(function(img) {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var list = buildGallery();
                    if (!list.length) return;
                    var idx = list.findIndex(function(i) { return i.type === 'image' && i.src === img.src; });
                    openLightbox(list, idx === -1 ? 0 : idx);
                });
            });

            card.querySelectorAll('.project-media video').forEach(function(vid) {
                vid.style.cursor = 'zoom-in';
                vid.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var list = buildGallery();
                    if (!list.length) return;
                    var src = vid.src || vid.currentSrc;
                    var idx = list.findIndex(function(i) { return i.type === 'video' && i.src === src; });
                    openLightbox(list, idx === -1 ? 0 : idx);
                });
            });
        });
    };

    // ============================================================
    //    // INIT
    // ============================================================
    showSection('#inicio');
    setTimeout(type, 600);
    initCarousels();
    initLightbox();
});
