document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Função para trocar a página visível
    const showSection = (id) => {
        const targetId = id.startsWith('#') ? id : `#${id}`;
        
        sections.forEach(section => {
            if (`#${section.id}` === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    };

    // Adiciona evento de clique a todos os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);

            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Lógica do Tema Escuro/Claro
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Salva a preferência do usuário
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Atualiza o ícone
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    };

    // Verifica se já existe uma preferência de tema salva
    if (localStorage.getItem('theme') === 'dark') {
        toggleTheme();
    }
    
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Mostra a seção inicial ao carregar
    showSection('#inicio');
});