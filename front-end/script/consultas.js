// pega os elementos principais da página
var campoPesquisa = document.getElementById("campoPesquisa");
var filtroEspecie = document.getElementById("filtroEspecie");
var contadorResultados = document.getElementById("contadorResultados");

var corpoTabelaConsulta = document.getElementById("corpoTabelaConsulta");
var tabelaVazia = document.getElementById("tabelaVazia");

var modalDetalhes = document.getElementById("modalDetalhes");
var fecharModalDetalhes = document.getElementById("fecharModalDetalhes");
var btnFecharDetalhes = document.getElementById("btnFecharDetalhes");


// lista de exemplo com os cadastros completos (tutor + animal)
var listaCadastros = [
    {
        nomeCompleto: "Marcos Andrade",
        cpf: "111.222.333-44",
        rg: "11.222.333-4",
        telefone: "(19) 99876-5432",
        endereco: "Rua das Palmeiras, 120",
        bairro: "Centro",
        cidade: "Piracicaba",
        cep: "13400-000",
        nomeAnimal: "Thor",
        especieAnimal: "Cachorro",
        racaAnimal: "Labrador",
        sexoAnimal: "Masculino",
        nascimentoAnimal: "2022-03-10",
        observacoes: "Nenhuma"
    },
    {
        nomeCompleto: "Fernanda Lima",
        cpf: "555.666.777-88",
        rg: "55.666.777-8",
        telefone: "(19) 98765-1234",
        endereco: "Av. Independência, 45",
        bairro: "Jardim América",
        cidade: "Piracicaba",
        cep: "13401-000",
        nomeAnimal: "Mimi",
        especieAnimal: "Gato",
        racaAnimal: "Persa",
        sexoAnimal: "Feminino",
        nascimentoAnimal: "2023-07-22",
        observacoes: "Alérgica a alguns tipos de ração"
    },
    {
        nomeCompleto: "Roberto Souza",
        cpf: "222.333.444-55",
        rg: "22.333.444-5",
        telefone: "(19) 99123-4567",
        endereco: "Rua Sete de Setembro, 88",
        bairro: "Vila Rezende",
        cidade: "Piracicaba",
        cep: "13416-000",
        nomeAnimal: "Bilu",
        especieAnimal: "Ave",
        racaAnimal: "Calopsita",
        sexoAnimal: "Masculino",
        nascimentoAnimal: "2021-01-15",
        observacoes: "Nenhuma"
    },
    {
        nomeCompleto: "Juliana Costa",
        cpf: "333.444.555-66",
        rg: "33.444.555-6",
        telefone: "(19) 98888-2222",
        endereco: "Rua XV de Novembro, 300",
        bairro: "Nova América",
        cidade: "Piracicaba",
        cep: "13420-000",
        nomeAnimal: "Nino",
        especieAnimal: "Roedor",
        racaAnimal: "Hamster",
        sexoAnimal: "Masculino",
        nascimentoAnimal: "2024-05-02",
        observacoes: "Nenhuma"
    }
];


// função que mostra na tela apenas os cadastros que passam nos filtros
function renderizarTabela() {

    var textoPesquisado = campoPesquisa.value.toLowerCase();
    var especieSelecionada = filtroEspecie.value;

    // limpa a tabela antes de redesenhar
    corpoTabelaConsulta.innerHTML = "";

    var quantidadeEncontrada = 0;

    for (var i = 0; i < listaCadastros.length; i++) {

        var cadastro = listaCadastros[i];

        // verifica se o texto pesquisado está no nome do tutor ou do animal
        var nomeTutorMinusculo = cadastro.nomeCompleto.toLowerCase();
        var nomeAnimalMinusculo = cadastro.nomeAnimal.toLowerCase();

        var combinaComPesquisa =
            nomeTutorMinusculo.indexOf(textoPesquisado) !== -1 ||
            nomeAnimalMinusculo.indexOf(textoPesquisado) !== -1;

        // verifica se a espécie combina com o filtro escolhido
        var combinaComEspecie =
            especieSelecionada === "Todos" || cadastro.especieAnimal === especieSelecionada;

        // se passou nos dois filtros, adiciona a linha na tabela
        if (combinaComPesquisa && combinaComEspecie) {

            var idadeAtual = calcularIdadeAnimal(cadastro.nascimentoAnimal);
            var novaLinha = document.createElement("tr");

            novaLinha.innerHTML =
                "<td>" + cadastro.nomeCompleto + "</td>" +
                "<td>" + cadastro.nomeAnimal + "</td>" +
                "<td>" + cadastro.especieAnimal + "</td>" +
                "<td>" + cadastro.racaAnimal + "</td>" +
                "<td>" + idadeAtual + "</td>" +
                "<td>" + cadastro.telefone + "</td>" +
                "<td>" + cadastro.cidade + "</td>" +
                "<td><button type='button' class='btn-detalhes' onclick='abrirDetalhes(" + i + ")'>Ver Detalhes</button></td>";

            corpoTabelaConsulta.appendChild(novaLinha);
            quantidadeEncontrada = quantidadeEncontrada + 1;
        }
    }

    // atualiza o texto do contador de resultados
    if (quantidadeEncontrada === 1) {
        contadorResultados.textContent = "1 cadastro encontrado";
    } else {
        contadorResultados.textContent = quantidadeEncontrada + " cadastros encontrados";
    }

    // mostra ou esconde a mensagem de tabela vazia
    if (quantidadeEncontrada === 0) {
        tabelaVazia.style.display = "block";
    } else {
        tabelaVazia.style.display = "none";
    }
}


// função que calcula a idade em anos e meses a partir da data de nascimento
function calcularIdadeAnimal(dataTexto) {

    var hoje = new Date();
    var nascimento = new Date(dataTexto + "T00:00:00");

    var anos = hoje.getFullYear() - nascimento.getFullYear();
    var meses = hoje.getMonth() - nascimento.getMonth();
    var dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
        meses = meses - 1;
    }

    if (meses < 0) {
        anos = anos - 1;
        meses = meses + 12;
    }

    if (nascimento > hoje) {
        return "Data inválida";
    }

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


// abre o modal com todos os detalhes de um cadastro
function abrirDetalhes(indice) {

    var cadastro = listaCadastros[indice];

    // preenche os dados do tutor
    document.getElementById("detalheNomeTutor").textContent = cadastro.nomeCompleto;
    document.getElementById("detalheCpf").textContent = cadastro.cpf;
    document.getElementById("detalheRg").textContent = cadastro.rg;
    document.getElementById("detalheTelefone").textContent = cadastro.telefone;
    document.getElementById("detalheEndereco").textContent = cadastro.endereco;
    document.getElementById("detalheBairro").textContent = cadastro.bairro;
    document.getElementById("detalheCidade").textContent = cadastro.cidade;
    document.getElementById("detalheCep").textContent = cadastro.cep;

    // preenche os dados do animal
    document.getElementById("detalheNomeAnimal").textContent = cadastro.nomeAnimal;
    document.getElementById("detalheEspecie").textContent = cadastro.especieAnimal;
    document.getElementById("detalheRaca").textContent = cadastro.racaAnimal;
    document.getElementById("detalheSexo").textContent = cadastro.sexoAnimal;
    document.getElementById("detalheNascimento").textContent = formatarData(cadastro.nascimentoAnimal);
    document.getElementById("detalheIdade").textContent = calcularIdadeAnimal(cadastro.nascimentoAnimal);
    document.getElementById("detalheObservacoes").textContent = cadastro.observacoes || "Nenhuma";

    modalDetalhes.classList.add("active");
}

// transforma a data "aaaa-mm-dd" em "dd/mm/aaaa" para exibição
function formatarData(dataTexto) {
    var partes = dataTexto.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}


// fecha o modal de detalhes
function fecharDetalhes() {
    modalDetalhes.classList.remove("active");
}

fecharModalDetalhes.addEventListener("click", fecharDetalhes);
btnFecharDetalhes.addEventListener("click", fecharDetalhes);


// atualiza a tabela sempre que o usuário digitar na busca ou trocar o filtro
campoPesquisa.addEventListener("input", renderizarTabela);
filtroEspecie.addEventListener("change", renderizarTabela);


// desenha a tabela assim que a página carrega
renderizarTabela();