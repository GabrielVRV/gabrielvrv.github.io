document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // TRANSLATIONS
    // ============================================================
    const translations = {
        pt: {
            'nav-sobre':        'Sobre',
            'nav-habilidades':  'Habilidades',
            'nav-educacao':     'Educação',
            'nav-experiencia':  'Experiência',
            'nav-projetos':     'Projetos',
            'nav-contato':      'Contato',

            'hero-eyebrow':     '👋 Olá, eu sou',
            'hero-desc':        'Desenvolvedor Full Stack com atuação em sistemas corporativos ERP (TOTVS Datasul), APIs REST em Progress ABL e interfaces modernas em Angular e React. Uso diário de IA como diferencial real de produtividade.',
            'hero-cta-projects':'Ver Projetos',

            'title-sobre':      'Sobre Mim',
            'sobre-p1':         'Sou <strong>Gabriel Victor Reggiani Viaro</strong>, Desenvolvedor Full Stack com atuação em sistemas corporativos ERP (<strong>TOTVS Datasul</strong>), construção de APIs REST em <strong>Progress ABL</strong> e interfaces modernas em <strong>Angular</strong> e React. Bacharelado em Ciência da Computação (UNIFAJ, 2022) e duas Pós-Graduações concluídas em 2025.',
            'sobre-p2':         'Referência técnica no time na <strong>CASP</strong>, entrego soluções que substituem fluxos manuais por sistemas ágeis e precisos — com autonomia total da arquitetura à produção. Utilizo <strong>Claude, Google Gemini e GitHub Copilot</strong> diariamente como diferencial real de produtividade.',
            'sobre-p3':         'Portfólio ativo, projetos em produção, código no GitHub. Inglês em nível de leitura técnica. Pronto para o próximo desafio.',
            'stat-exp':         'Anos de Experiência',
            'stat-projects':    'Projetos',
            'stat-postgrad':    'Pós-Graduações',
            'stat-tech':        'Tecnologias',

            'title-habilidades':'Habilidades',
            'skill-frontend':   'Frontend',
            'skill-backend':    'Backend',
            'skill-mobile':     'Mobile',
            'skill-db':         'Banco de Dados',
            'skill-tools':      'Ferramentas & DevOps',
            'skill-ia':         'IA no Desenvolvimento',
            'skill-soft':       'Soft Skills',

            'title-educacao':   'Formação Acadêmica',
            'edu-certs-label':  'Certificações',
            'edu-certs-title':  'Cursos e Certificados',

            'title-experiencia':'Experiência Profissional',
            'exp-current':      'Atual',
            'exp-1-role':       'Desenvolvedor Full Stack',
            'exp-1-desc':       'Referência técnica no time de desenvolvimento — autonomia total na arquitetura e entrega de sistemas integrados ao ERP <strong>TOTVS Datasul</strong>. Construção de APIs REST em <strong>Progress ABL</strong> e interfaces em <strong>Angular</strong>. Projetos em produção: Busca de Item, Sistema de Inventário com Contagem Cega e Sistema de Recebimento Logístico. Automação de processos via BPMN / Smartshare.',
            'exp-2-role':       'Assistente de T.I',
            'exp-2-desc':       'Suporte a sistemas hospitalares críticos com alta exigência de disponibilidade. Gestão de usuários e acessos via Active Directory / Windows Server.',
            'exp-3-role':       'Estagiário de T.I',
            'exp-3-desc':       'Suporte técnico de primeiro nível, triagem e atendimento de chamados via Jira. Configuração e manutenção de softwares, periféricos e equipamentos em ambiente corporativo de grande porte.',

            'title-projetos':   'Projetos',
            'btn-source':       'Código Fonte',
            'btn-soon':         'Em breve',

            'title-contato':    'Contato',
            'contact-subtitle': 'Aberto a oportunidades e colaborações. Vamos conversar?',
            'contact-cta':      '<i class="fas fa-paper-plane"></i> Enviar Mensagem',

            'footer-text':      'Feito com',
            'footer-by':        'por',

            'typing-phrases': [
                'Desenvolvedor Full Stack',
                'Progress ABL & Angular',
                'TOTVS Datasul Developer',
                'Entusiasta de IA'
            ],
        },

        en: {
            'nav-sobre':        'About',
            'nav-habilidades':  'Skills',
            'nav-educacao':     'Education',
            'nav-experiencia':  'Experience',
            'nav-projetos':     'Projects',
            'nav-contato':      'Contact',

            'hero-eyebrow':     '👋 Hi, I\'m',
            'hero-desc':        'Full Stack Developer working with corporate ERP systems (TOTVS Datasul), REST APIs in Progress ABL, and modern interfaces in Angular and React. Daily use of AI tools as a real productivity advantage.',
            'hero-cta-projects':'View Projects',

            'title-sobre':      'About Me',
            'sobre-p1':         'I\'m <strong>Gabriel Victor Reggiani Viaro</strong>, a Full Stack Developer working with corporate ERP systems (<strong>TOTVS Datasul</strong>), building REST APIs in <strong>Progress ABL</strong> and modern interfaces in <strong>Angular</strong> and React. Bachelor\'s in Computer Science (UNIFAJ, 2022), two Postgraduate degrees completed in 2025.',
            'sobre-p2':         'Technical reference at <strong>CASP</strong>, delivering solutions that replace manual workflows with agile, precise systems — with full ownership from architecture to production. Daily use of <strong>Claude, Google Gemini and GitHub Copilot</strong> as a real productivity advantage.',
            'sobre-p3':         'Active portfolio, projects in production, code on GitHub. Technical reading level in English. Ready for the next challenge.',
            'stat-exp':         'Years of Experience',
            'stat-projects':    'Projects',
            'stat-postgrad':    "Master's Degrees",
            'stat-tech':        'Technologies',

            'title-habilidades':'Skills',
            'skill-frontend':   'Frontend',
            'skill-backend':    'Backend',
            'skill-mobile':     'Mobile',
            'skill-db':         'Database',
            'skill-tools':      'Tools & DevOps',
            'skill-ia':         'AI in Development',
            'skill-soft':       'Soft Skills',

            'title-educacao':   'Education',
            'edu-certs-label':  'Certifications',
            'edu-certs-title':  'Courses & Certificates',

            'title-experiencia':'Work Experience',
            'exp-current':      'Present',
            'exp-1-role':       'Full Stack Developer',
            'exp-1-desc':       'Technical reference on the development team — full ownership of architecture and delivery of systems integrated with <strong>TOTVS Datasul</strong> ERP. Building REST APIs in <strong>Progress ABL</strong> and interfaces in <strong>Angular</strong>. Live projects: Item Search, Blind Count Inventory System, and Logistics Receiving System. Business process automation via BPMN / Smartshare.',
            'exp-2-role':       'IT Assistant',
            'exp-2-desc':       'Support for critical hospital systems with high availability requirements. User and access management via Active Directory / Windows Server.',
            'exp-3-role':       'IT Intern',
            'exp-3-desc':       'First-level technical support, ticket triage and management via Jira. Configuration and maintenance of software, peripherals, and equipment in a large corporate environment.',

            'title-projetos':   'Projects',
            'btn-source':       'Source Code',
            'btn-soon':         'Coming soon',

            'title-contato':    'Contact',
            'contact-subtitle': 'Open to job opportunities and collaborations. Let\'s talk?',
            'contact-cta':      '<i class="fas fa-paper-plane"></i> Send Message',

            'footer-text':      'Made with',
            'footer-by':        'by',

            'typing-phrases': [
                'Full Stack Developer',
                'Progress ABL & Angular',
                'TOTVS Datasul Developer',
                'AI Enthusiast'
            ],
        }
    };

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
    let lang         = localStorage.getItem('lang') || 'pt';
    const langBtn    = document.getElementById('lang-toggle');
    const langFlag   = langBtn.querySelector('.lang-flag');
    const langLabel  = langBtn.querySelector('.lang-label');

    const applyLang = (l) => {
        lang = l;
        localStorage.setItem('lang', l);
        langFlag.textContent  = l === 'pt' ? '🇧🇷' : '🇺🇸';
        langLabel.textContent = l === 'pt' ? 'PT'  : 'EN';
        document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';

        const t = translations[l];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        restartTyping();
    };

    langBtn.addEventListener('click', () => applyLang(lang === 'pt' ? 'en' : 'pt'));

    // ============================================================
    // TYPING ANIMATION
    // ============================================================
    const typingEl   = document.getElementById('typing-text');
    let   phraseIdx  = 0;
    let   charIdx    = 0;
    let   deleting   = false;
    let   typingTimer;

    const type = () => {
        const phrases = translations[lang]['typing-phrases'];
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
    // INIT
    // ============================================================
    showSection('#inicio');
    applyLang(lang);
    initCarousels();
});
