(function configurarMenuPerfil() {
    "use strict";

    const botao = document.getElementById("botaoPerfil");
    const painel = document.getElementById("painelPerfil");
    const nomeUsuario = document.getElementById("nomeUsuario");
    const saldoPontos = document.getElementById("saldoPontos");
    const botaoSair = document.getElementById("botaoSair");

    if (!botao || !painel) return;

    const chavesNome = ["nomeUsuario", "nome", "usuario", "clienteNome", "clienteLogado", "usuarioLogado"];
    let nome = "";

    for (const chave of chavesNome) {
        const valor = localStorage.getItem(chave);
        if (!valor) continue;

        try {
            const dados = JSON.parse(valor);
            const nomeSalvo = typeof dados === "string"
                ? dados
                : dados.nome || dados.Nome || dados.nomeUsuario || dados.usuario;
            if (typeof nomeSalvo === "string" && nomeSalvo.trim()) {
                nome = nomeSalvo.trim();
                break;
            }
        } catch {
            if (valor.trim()) {
                nome = valor.trim();
                break;
            }
        }
    }

    if (nomeUsuario) nomeUsuario.textContent = nome ? `Olá, ${nome}!` : "Olá! Bem-vindo.";
    if (saldoPontos) {
        const valorSaldo = localStorage.getItem("saldoPontos");
        const saldoSalvo = valorSaldo === null ? Number.NaN : Number(valorSaldo);
        const saldo = Number.isFinite(saldoSalvo) && saldoSalvo >= 0 ? saldoSalvo : 500;
        saldoPontos.textContent = `Saldo: ${saldo} pontos`;
    }

    function fecharPainel() {
        painel.hidden = true;
        botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", (evento) => {
        evento.stopPropagation();
        painel.hidden = !painel.hidden;
        botao.setAttribute("aria-expanded", String(!painel.hidden));
    });

    painel.addEventListener("click", (evento) => evento.stopPropagation());
    document.addEventListener("click", fecharPainel);
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharPainel();
    });

    if (botaoSair) {
        botaoSair.addEventListener("click", () => {
            chavesNome.forEach((chave) => localStorage.removeItem(chave));
            window.location.href = "login.html";
        });
    }
})();
