const abrirBtn = document.getElementById('abrirModal');
const fecharBtn = document.getElementById('fecharModal');
const overlay = document.getElementById('modalOverlay');

const campoUsuario = document.getElementById('usuario');
const nomeNoModal = document.querySelector('.modal-content h2 span');

// Ação ao clicar no botão Login
abrirBtn.addEventListener('click', () => {
    const nomeDigitado = campoUsuario.value.trim();
o
    if (nomeDigitado !== "") {
        nomeNoModal.textContent = nomeDigitado; 
        overlay.classList.add('active');
    } else {
        alert("Por favor, digite o nome de usuário!");
    }
});

// Ação ao clicar no botão fechar (X)
fecharBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

// Fecha se o usuário clicar no fundo escuro fora da caixa
overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) {
        overlay.classList.remove('active');
    }
});
