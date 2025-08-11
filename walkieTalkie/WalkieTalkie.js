function entrarNoChat() {
    const nickname = document.getElementById("nickname").value.trim();

    if (nickname === "") {
        alert("Por favor, digite um apelido.");
        return;
    }

    // Guarda o apelido no navegador
    localStorage.setItem("apelido", nickname);

    // Mensagem de sucesso
    alert("Login feito com sucesso! Apelido: " + nickname);

    // Redireciona para o chat
    window.location.href = "chat.html";
}

function enviarMensagem() {
    // Pega a mensagem digitada
    const mensagem = document.getElementById("message-input").value.trim();

    // Se estiver vazia, não envia
    if (mensagem === "") {
        alert("Digite uma mensagem!");
        return;
    }

    // Cria um novo elemento para a mensagem
    const mensagemDiv = document.createElement("div");
    mensagemDiv.textContent = mensagem;

    // Adiciona a mensagem no chat
    document.getElementById("chat-box").appendChild(mensagemDiv);

    // Salva no localStorage
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push(mensagem);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    // Limpa o campo de entrada
    document.getElementById("message-input").value = "";
}

window.onload = function () {
    // Carrega mensagens salvas no localStorage
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    // Mostra todas as mensagens no chat
    mensagens.forEach(function (mensagem) {
        const mensagemDiv = document.createElement("div");
        mensagemDiv.textContent = mensagem;
        document.getElementById("chat-box").appendChild(mensagemDiv);
    });
};
