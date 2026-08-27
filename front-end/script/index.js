// header - função de colocar o nome do usuário no canto e o botão de deslogar da conta

document.addEventListener('DOMContentLoaded', () => {
    // busca o nome que foi salvo no login
    const nomeSalvo = localStorage.getItem('usuarioLogado');
    const elementoNome = document.querySelector('.perfil p');
    const botaoSair = document.querySelector('.botao-sair');

    // se o usuário estiver logado, exibe o nome dele no header
    if (nomeSalvo) {
        elementoNome.textContent = nomeSalvo;
    } else {
        // se alguém tentar entrar na página sem fazer login, joga de volta para a tela de login
        window.location.href = "login.html"; 
    }

    // função do Botão de Sair
    botaoSair.addEventListener('click', () => {
        const confirmar = confirm("Deseja realmente sair da conta?");
        if (confirmar) {
            localStorage.removeItem('usuarioLogado'); // apaga o usuário salvo
            window.location.href = "login.html";       // redireciona para o login
        }
    });
});
