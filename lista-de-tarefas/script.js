window.onload = function () {
    carregarTarefas();
    mostrarBotoesFrases();

    // Atalho: adicionar tarefa ao pressionar Enter
    document.getElementById("tarefa").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            adicionarTarefa();
        }
    });
};

function adicionarTarefa() {
    const input = document.getElementById("tarefa");
    const textoTarefa = input.value.trim();
    if (textoTarefa === "") return;

    criarElementoTarefa(textoTarefa, false);
    input.value = "";
    salvarTarefas();
}

function criarElementoTarefa(texto, concluida) {
    const lista = document.getElementById("lista-tarefas");
    const novaTarefa = document.createElement("li");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;
    spanTexto.classList.add("texto-tarefa");
    if (concluida) {
        spanTexto.classList.add("concluida");
    }

    spanTexto.onclick = function () {
        spanTexto.classList.toggle("concluida");
        salvarTarefas();
    };

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("editar");
    botaoEditar.onclick = function () {
        const novoTexto = prompt("Editar tarefa:", spanTexto.textContent);
        if (novoTexto !== null) {
            spanTexto.textContent = novoTexto.trim();
            salvarTarefas();
        }
    };

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("excluir");
    botaoExcluir.onclick = function () {
        lista.removeChild(novaTarefa);
        salvarTarefas();
    };

    novaTarefa.appendChild(spanTexto);
    novaTarefa.appendChild(botaoEditar);
    novaTarefa.appendChild(botaoExcluir);
    lista.appendChild(novaTarefa);
}

function salvarTarefas() {
    const tarefas = [];
    const lista = document.getElementById("lista-tarefas").children;

    for (let item of lista) {
        const texto = item.querySelector("span").textContent;
        const concluida = item.querySelector("span").classList.contains("concluida");
        tarefas.push({ texto, concluida });
    }

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
    for (let tarefa of tarefasSalvas) {
        criarElementoTarefa(tarefa.texto, tarefa.concluida);
    }
}

//------------------------------------daqui pra baixo é frases motivacionais---------------------

function salvaFrase() {
    const campoTexto = document.getElementById("frase");
    const frase = campoTexto.value.trim();

    if (frase === "") return;

    const dataHoje = new Date().toLocaleDateString("pt-BR");

    // Busca frases salvas pra hoje (ou cria um array novo se não tiver)
    let frasesDoDia = JSON.parse(localStorage.getItem(dataHoje)) || [];

    frasesDoDia.push(frase); // adiciona a nova frase no array

    localStorage.setItem(dataHoje, JSON.stringify(frasesDoDia)); // salva de volta como JSON
    campoTexto.value = "";

    mostrarBotoesFrases();
}

function mostrarBotoesFrases() {
    const container = document.getElementById("botoes-frases");
    container.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i); // data
        const frases = JSON.parse(localStorage.getItem(chave)); // array de frases

        frases.forEach((frase, index) => {
            const botao = document.createElement("button");
            botao.textContent = `${chave} (${index + 1})`; // Ex: 13/04/2025 (1)
            botao.onclick = () => alert(frase);

            container.appendChild(botao);
        });
    }
}

// Quando o site abrir, carrega os botões de frases