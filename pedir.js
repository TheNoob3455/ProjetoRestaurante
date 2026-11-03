(function () {
    "use strict";

    const modal = document.getElementById("modal");
    const nomeProduto = document.getElementById("nome-produto");
    const precoProduto = document.getElementById("preco-produto");
    const campoQuantidade = document.getElementById("quantidade");
    const mensagem = document.getElementById("mensagem-pedido");
    const contadores = document.querySelectorAll("[data-cart-count]");
    let produtoSelecionado;
    let temporizadorMensagem;

    function atualizarContador(itens) {
        const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);
        const descricaoQuantidade = `${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}`;
        contadores.forEach((contador) => {
            contador.textContent = String(quantidadeTotal);
            contador.setAttribute("aria-label", `${descricaoQuantidade} no carrinho`);
        });
    }

    function mostrarMensagem(texto) {
        window.clearTimeout(temporizadorMensagem);
        mensagem.textContent = texto;
        temporizadorMensagem = window.setTimeout(() => {
            mensagem.textContent = "";
        }, 3000);
    }

    function abrirModal(id) {
        try {
            produtoSelecionado = window.PedidoChapa.obterProduto(id);
            nomeProduto.textContent = produtoSelecionado.nome;
            precoProduto.textContent = window.PedidoChapa.formatarPreco(produtoSelecionado.preco);
            campoQuantidade.value = "1";
            mensagem.textContent = "";
            modal.style.display = "flex";
            campoQuantidade.focus();
        } catch (erro) {
            console.error("Não foi possível abrir o pedido:", erro);
            mostrarMensagem("Não foi possível abrir este produto. Tente novamente.");
        }
    }

    function fecharModal() {
        modal.style.display = "none";
        produtoSelecionado = undefined;
    }

    document.querySelectorAll("[data-adicionar]").forEach((botao) => {
        botao.addEventListener("click", () => abrirModal(botao.dataset.adicionar));
    });

    document.querySelectorAll("[data-fechar-modal]").forEach((botao) => {
        botao.addEventListener("click", fecharModal);
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) fecharModal();
    });

    document.querySelectorAll("[data-categoria]").forEach((botao) => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;
            document.querySelectorAll(".escolhas button").forEach((opcao) => {
                opcao.classList.toggle("ativo", opcao === botao);
            });
            document.querySelectorAll(".produto").forEach((produto) => {
                produto.style.display =
                    categoria === "todos" || produto.classList.contains(categoria) ? "flex" : "none";
            });
        });
    });

    document.getElementById("confirmar-pedido").addEventListener("click", () => {
        const quantidade = Number(campoQuantidade.value);
        if (!produtoSelecionado) {
            mostrarMensagem("Selecione um produto antes de confirmar.");
            return;
        }
        if (!Number.isInteger(quantidade) || quantidade < 1) {
            campoQuantidade.focus();
            mostrarMensagem("Escolha uma quantidade inteira maior que zero.");
            return;
        }

        try {
            const itens = window.PedidoChapa.adicionar(produtoSelecionado.id, undefined, quantidade);
            atualizarContador(itens);
            const nome = produtoSelecionado.nome;
            fecharModal();
            mostrarMensagem(`${quantidade} ${quantidade === 1 ? "unidade" : "unidades"} de ${nome} adicionada${quantidade === 1 ? "" : "s"} ao carrinho.`);
        } catch (erro) {
            console.error("Não foi possível adicionar o produto ao carrinho:", erro);
            mostrarMensagem("Não foi possível adicionar o pedido ao carrinho. Tente novamente.");
        }
    });

    try {
        atualizarContador(window.PedidoChapa.lerCarrinho());
    } catch (erro) {
        console.error("Não foi possível carregar o contador do carrinho:", erro);
        mostrarMensagem("Não foi possível carregar os itens salvos no carrinho.");
    }

    window.addEventListener("storage", (evento) => {
        if (evento.key !== "chapa-quente-carrinho") return;
        try {
            atualizarContador(window.PedidoChapa.lerCarrinho());
        } catch (erro) {
            console.error("Não foi possível atualizar o contador do carrinho:", erro);
            mostrarMensagem("Não foi possível atualizar os itens do carrinho.");
        }
    });
})();
