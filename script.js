// Função para fechar o modal de experiência
function fecharModalExperiencia() {
    const experienciaModal = document.getElementById('experienciaModal');
    experienciaModal.style.display = 'none';
}

function fecharModal() {
    const certificadoModal = document.getElementById('certificadoModal');
    certificadoModal.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('nav ul');
    const sections = document.querySelectorAll('.content-section');
    const menuItems = document.querySelectorAll('nav ul li a');
    const modal = document.getElementById('certificadoModal');
    const imgElement = document.getElementById('certificadoImg');
    const descricaoElement = document.getElementById('certificadoDescricao');
    const experienciaModal = document.getElementById('experienciaModal');
    const modalEmpresa = document.getElementById('modalEmpresa');
    const modalCargo = document.getElementById('modalCargo');
    const modalPeriodo = document.getElementById('modalPeriodo');
    const modalDescricao = document.getElementById('modalDescricao');

    menuIcon.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    // Fecha o menu ao clicar em um item
    navList.addEventListener('click', function () {
        navList.classList.remove('show');
    });

    // Função para exibir a seção desejada
    window.loadSection = function (sectionName) {
        // Oculta todas as seções
        sections.forEach(section => section.style.display = 'none');

        // Exibe a seção desejada
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.style.display = 'flex';  // Use 'flex' ou 'block' conforme necessário
        }

        // Atualiza o estado "active" no menu
        menuItems.forEach((item) => {
            item.classList.remove('active');
        });
        const activeMenuItem = document.querySelector(`[href="#${sectionName}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
    };

    // Carrega a seção inicial
    loadSection('home');

    // Adicione eventos de clique aos cards para abrir o modal com detalhes específicos
    document.querySelectorAll('.education-card').forEach(card => {
        const certificadoPath = card.getAttribute('data-certificado');
        const descricao = card.querySelector('h3').innerText + ' - ' + card.querySelector('p').innerText;

        card.addEventListener('click', () => abrirModal(certificadoPath, descricao));
    });

    // Função para abrir o modal e carregar detalhes específicos
    function abrirModal(certificadoPath, descricao) {
        imgElement.src = certificadoPath;
        descricaoElement.innerText = descricao;
        modal.style.display = 'block';
    }

    document.querySelectorAll('.experiencia-card').forEach(card => {
        const empresa = card.getAttribute('data-empresa');
        const cargo = card.getAttribute('data-cargo');
        const periodo = card.getAttribute('data-periodo');

        card.addEventListener('click', () => mostrarDetalhesExperiencia(empresa, cargo, periodo));
    });

    // Função para mostrar detalhes da experiência no modal
    function mostrarDetalhesExperiencia(empresa, cargo, periodo) {
        const modalEmpresa = document.getElementById('modalEmpresa');
        const modalCargo = document.getElementById('modalCargo');
        const modalPeriodo = document.getElementById('modalPeriodo');
        const modalDescricao = document.getElementById('modalDescricao');
        const experienciaModal = document.getElementById('experienciaModal');

        modalEmpresa.textContent = empresa;
        modalCargo.textContent = cargo;
        modalPeriodo.textContent = periodo;

        // Adicione descrições específicas para cada cargo, ajuste conforme necessário
        if (cargo === "Aprendiz de Analista de Suporte") {
            modalDescricao.textContent = "Como Analista de Suporte, fui responsável por realizar o atendimento de chamados, ajudando a garantir o funcionamento eficiente dos sistemas. O atendimento era realizado pelo sistema de chamados Jira ServiceDesk, garantindo respostas rápidas e soluções eficazes. Minhas atribuições incluíam a resolução de problemas de hardware e software, desenvolvendo uma expertise sólida em sistemas operacionais Windows. Além disso, realizei manutenção preventiva para otimizar a eficiência operacional e minimizar interrupções nos serviços.";
        } else if (cargo === "Estágio de Analista de Suporte") {
            modalDescricao.textContent = "Como Analista de Suporte, fui responsável por realizar o atendimento de chamados, ajudando a garantir o funcionamento eficiente dos sistemas. O atendimento era realizado pelo sistema de chamados Jira ServiceDesk, garantindo respostas rápidas e soluções eficazes. Minhas atribuições incluíam a resolução de problemas de hardware e software, desenvolvendo uma expertise sólida em sistemas operacionais Windows. Além disso, realizei manutenção preventiva para otimizar a eficiência operacional e minimizar interrupções nos serviços.";
        }

        experienciaModal.style.display = 'block';
    }
});