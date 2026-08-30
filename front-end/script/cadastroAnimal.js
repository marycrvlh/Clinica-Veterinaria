// pega os elementos principais da página
var btnAbrirCadastro = document.getElementById("btnAbrirCadastro");
var modalCadastro = document.getElementById("modalCadastro");
var fecharModalCadastro = document.getElementById("fecharModalCadastro");
var btnCancelarCadastro = document.getElementById("btnCancelarCadastro");

var modalSucesso = document.getElementById("modalSucesso");
var btnFecharSucesso = document.getElementById("btnFecharSucesso");

var formCadastroAnimal = document.getElementById("formCadastroAnimal");
var corpoTabelaAnimais = document.getElementById("corpoTabelaAnimais");
var tabelaVazia = document.getElementById("tabelaVazia");

var campoNascimento = document.getElementById("nascimentoAnimal");
var campoIdade = document.getElementById("idadeAnimal");

var tituloModalCadastro = document.getElementById("tituloModalCadastro");
var btnSalvarCadastro = document.getElementById("btnSalvarCadastro");

var tituloModalSucesso = document.getElementById("tituloModalSucesso");
var textoModalSucesso = document.getElementById("textoModalSucesso");


// lista que guarda todos os animais cadastrados (começa com dois exemplos)
var listaAnimais = [
    {
        nomeTutor: "Marcos Andrade",
        telefoneTutor: "(19) 99876-5432",
        nomeAnimal: "Thor",
        especieAnimal: "Cachorro",
        racaAnimal: "Labrador",
        sexoAnimal: "Masculino",
        nascimentoAnimal: "2022-03-10",
        observacoes: ""
    },
    {
        nomeTutor: "Fernanda Lima",
        telefoneTutor: "(19) 98765-1234",
        nomeAnimal: "Mimi",
        especieAnimal: "Gato",
        racaAnimal: "Persa",
        sexoAnimal: "Feminino",
        nascimentoAnimal: "2023-07-22",
        observacoes: ""
    }
];

// controla se o formulário está editando um cadastro existente
var modoEdicao = false;
var indiceEmEdicao = -1;


// abrir o modal para um NOVO cadastro
btnAbrirCadastro.addEventListener("click", function () {
    modoEdicao = false;
    indiceEmEdicao = -1;
    formCadastroAnimal.reset();
    campoIdade.value = "";
    tituloModalCadastro.textContent = "Novo Cadastro";
    btnSalvarCadastro.textContent = "Salvar Cadastro";
    modalCadastro.classList.add("active");
});

// fechar o modal de cadastro (botão X)
fecharModalCadastro.addEventListener("click", function () {
    fecharModalDeCadastro();
});

// fechar o modal de cadastro (botão cancelar)
btnCancelarCadastro.addEventListener("click", function () {
    fecharModalDeCadastro();
});

// função para fechar o modal e limpar o formulário
function fecharModalDeCadastro() {
    modalCadastro.classList.remove("active");
    formCadastroAnimal.reset();
    campoIdade.value = "";
    modoEdicao = false;
    indiceEmEdicao = -1;
}


// calcular a idade do animal automaticamente quando a data mudar
campoNascimento.addEventListener("change", function () {
    var idadeCalculada = calcularIdadeAnimal(campoNascimento.value);
    campoIdade.value = idadeCalculada;
});

// função que calcula a idade em anos e meses a partir da data de nascimento
function calcularIdadeAnimal(dataTexto) {

    var hoje = new Date();
    var nascimento = new Date(dataTexto + "T00:00:00");

    var anos = hoje.getFullYear() - nascimento.getFullYear();
    var meses = hoje.getMonth() - nascimento.getMonth();
    var dias = hoje.getDate() - nascimento.getDate();

    // ajusta caso ainda não tenha completado o mês
    if (dias < 0) {
        meses = meses - 1;
    }

    // ajusta caso ainda não tenha completado o ano
    if (meses < 0) {
        anos = anos - 1;
        meses = meses + 12;
    }

    // se a data for no futuro, avisa que é inválida
    if (nascimento > hoje) {
        return "Data inválida";
    }

    // monta o texto da idade
    if (anos <= 0 && meses <= 0) {
        return "Recém-nascido";
    } else if (anos <= 0) {
        return meses + (meses === 1 ? " mês" : " meses");
    } else if (meses === 0) {
        return anos + (anos === 1 ? " ano" : " anos");
    } else {
        return anos + (anos === 1 ? " ano e " : " anos e ") + meses + (meses === 1 ? " mês" : " meses");
    }
}


// quando o formulário for enviado (tanto para cadastrar quanto para editar)
formCadastroAnimal.addEventListener("submit", function (evento) {

    // impede o recarregamento da página
    evento.preventDefault();

    // pega o sexo selecionado nos botões de rádio
    var sexoSelecionado = "";
    var radiosSexo = document.getElementsByName("sexoAnimal");
    for (var i = 0; i < radiosSexo.length; i++) {
        if (radiosSexo[i].checked) {
            sexoSelecionado = radiosSexo[i].value;
        }
    }

    // monta um objeto com todos os dados digitados no formulário
    var dadosCadastro = {
        nomeTutor: document.getElementById("nomeTutor").value,
        telefoneTutor: document.getElementById("telefoneTutor").value,
        nomeAnimal: document.getElementById("nomeAnimal").value,
        especieAnimal: document.getElementById("especieAnimal").value,
        racaAnimal: document.getElementById("racaAnimal").value,
        sexoAnimal: sexoSelecionado,
        nascimentoAnimal: campoNascimento.value,
        observacoes: document.getElementById("observacoes").value
    };

    if (modoEdicao === true) {
        // atualiza o cadastro que já existia na lista
        listaAnimais[indiceEmEdicao] = dadosCadastro;

        tituloModalSucesso.textContent = "Cadastro atualizado com sucesso!";
        textoModalSucesso.textContent = "As informações do animal foram atualizadas.";
    } else {
        // adiciona um cadastro novo na lista
        listaAnimais.push(dadosCadastro);

        tituloModalSucesso.textContent = "Cadastro concluído com sucesso!";
        textoModalSucesso.textContent = "O animal foi adicionado ao sistema.";
    }

    // redesenha a tabela com a lista atualizada
    renderizarTabela();

    // fecha o modal de cadastro e limpa o formulário
    fecharModalDeCadastro();

    // abre o pop-up de sucesso
    modalSucesso.classList.add("active");
});


// função que desenha a tabela inteira a partir da lista de animais
function renderizarTabela() {

    // limpa a tabela antes de redesenhar
    corpoTabelaAnimais.innerHTML = "";

    for (var i = 0; i < listaAnimais.length; i++) {

        var animal = listaAnimais[i];
        var idadeAtual = calcularIdadeAnimal(animal.nascimentoAnimal);
        var novaLinha = document.createElement("tr");

        novaLinha.innerHTML =
            "<td>" + animal.nomeAnimal + "</td>" +
            "<td>" + animal.especieAnimal + "</td>" +
            "<td>" + animal.racaAnimal + "</td>" +
            "<td>" + idadeAtual + "</td>" +
            "<td>" + animal.nomeTutor + "</td>" +
            "<td>" + animal.telefoneTutor + "</td>" +
            "<td class='coluna-acoes'>" +
                "<button type='button' class='btn-editar' onclick='editarCadastro(" + i + ")'>Editar</button>" +
                "<button type='button' class='btn-excluir' onclick='excluirCadastro(" + i + ")'>Excluir</button>" +
            "</td>";

        corpoTabelaAnimais.appendChild(novaLinha);
    }

    atualizarTabelaVazia();
}


// função chamada ao clicar em "Editar": abre o modal já preenchido
function editarCadastro(indice) {

    var animal = listaAnimais[indice];

    // preenche os campos do tutor
    document.getElementById("nomeTutor").value = animal.nomeTutor;
    document.getElementById("telefoneTutor").value = animal.telefoneTutor;

    // preenche os campos do animal
    document.getElementById("nomeAnimal").value = animal.nomeAnimal;
    document.getElementById("especieAnimal").value = animal.especieAnimal;
    document.getElementById("racaAnimal").value = animal.racaAnimal;
    document.getElementById("observacoes").value = animal.observacoes;
    campoNascimento.value = animal.nascimentoAnimal;
    campoIdade.value = calcularIdadeAnimal(animal.nascimentoAnimal);

    // marca o botão de sexo correto
    var radiosSexo = document.getElementsByName("sexoAnimal");
    for (var i = 0; i < radiosSexo.length; i++) {
        if (radiosSexo[i].value === animal.sexoAnimal) {
            radiosSexo[i].checked = true;
        }
    }

    // ativa o modo de edição, guardando qual cadastro está sendo editado
    modoEdicao = true;
    indiceEmEdicao = indice;

    tituloModalCadastro.textContent = "Editar Cadastro";
    btnSalvarCadastro.textContent = "Salvar Alterações";

    modalCadastro.classList.add("active");
}


// função chamada ao clicar em "Excluir"
function excluirCadastro(indice) {
    listaAnimais.splice(indice, 1);
    renderizarTabela();
}


// mostra a mensagem "nenhum animal cadastrado" quando a tabela estiver vazia
function atualizarTabelaVazia() {
    if (listaAnimais.length === 0) {
        tabelaVazia.style.display = "block";
    } else {
        tabelaVazia.style.display = "none";
    }
}


// fechar o pop-up de sucesso
btnFecharSucesso.addEventListener("click", function () {
    modalSucesso.classList.remove("active");
});


// desenha a tabela assim que a página carrega
renderizarTabela();