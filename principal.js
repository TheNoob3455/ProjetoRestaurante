(function () {
    "use strict";

    const feedback = document.getElementById("feedback-carrinho");
    const botoesContador = document.querySelectorAll("[data-cart-count]");
    const modal = document.getElementById("modal-personalizacao");
    const formularioPersonalizacao = document.getElementById("form-personalizacao");
    const opcoesPao = document.getElementById("opcoes-pao");
    const opcoesIngredientes = document.getElementById("opcoes-ingredientes");
    const opcoesMolhos = document.getElementById("opcoes-molhos");
    const descricaoPersonalizacao = document.getElementById("descricao-personalizacao");
    const precoPersonalizado = document.getElementById("preco-personalizado");
    let temporizadorFeedback;
    let produtoSelecionado;

    function mostrarFeedback(texto) {
        window.clearTimeout(temporizadorFeedback);
        feedback.textContent = texto;
        temporizadorFeedback = window.setTimeout(() => {
            feedback.textContent = "";
        }, 3000);
    }

    function atualizarContador(itens) {
        const quantidade = itens.reduce((total, item) => total + item.quantidade, 0);
        const descricaoQuantidade = `${quantidade} ${quantidade === 1 ? "item" : "itens"}`;
        botoesContador.forEach((elemento) => {
            elemento.textContent = String(quantidade);
            elemento.setAttribute("aria-label", `${descricaoQuantidade} no carrinho`);
        });
    }

    try {
        atualizarContador(window.PedidoChapa.lerCarrinho());
    } catch (erro) {
        console.error("Não foi possível carregar o carrinho:", erro);
        mostrarFeedback("Não foi possível ler os itens salvos no carrinho.");
    }

    document.querySelectorAll("[data-adicionar-carrinho]").forEach((botao) => {
        botao.addEventListener("click", () => {
            try {
                produtoSelecionado = window.PedidoChapa.obterProduto(botao.dataset.adicionarCarrinho);
                abrirPersonalizacao(produtoSelecionado);
            } catch (erro) {
                console.error("Não foi possível abrir a personalização do produto:", erro);
                mostrarFeedback("Não foi possível carregar as opções deste lanche. Tente novamente.");
            }
        });
    });

    function criarOpcao(container, grupo, nome, selecionado, tipo) {
        const label = document.createElement("label");
        label.className = "opcao-personalizacao";

        const input = document.createElement("input");
        input.type = tipo;
        input.name = grupo;
        input.value = nome;
        input.checked = selecionado;

        const texto = document.createElement("span");
        texto.textContent = nome;
        label.append(input, texto);
        container.append(label);
    }

    function abrirPersonalizacao(produto) {
        const opcoes = window.PedidoChapa.opcoesPersonalizacao;
        descricaoPersonalizacao.textContent = `${produto.nome} — escolha o pão, os ingredientes e os molhos.`;
        precoPersonalizado.textContent = window.PedidoChapa.formatarPreco(produto.preco);
        opcoesPao.replaceChildren();
        opcoesIngredientes.replaceChildren();
        opcoesMolhos.replaceChildren();

        opcoes.paes.forEach((pao) => {
            criarOpcao(opcoesPao, "pao", pao, pao === produto.personalizacao.pao, "radio");
        });
        opcoes.ingredientes.forEach((ingrediente) => {
            criarOpcao(
                opcoesIngredientes,
                "ingredientes",
                ingrediente,
                produto.personalizacao.ingredientes.includes(ingrediente),
                "checkbox"
            );
        });
        opcoes.molhos.forEach((molho) => {
            criarOpcao(opcoesMolhos, "molhos", molho, produto.personalizacao.molhos.includes(molho), "checkbox");
        });

        modal.showModal();
    }

    document.querySelector("[data-fechar-modal]").addEventListener("click", () => {
        modal.close();
    });

    formularioPersonalizacao.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!produtoSelecionado) return;

        const formulario = new FormData(formularioPersonalizacao);
        const personalizacao = {
            pao: formulario.get("pao"),
            ingredientes: formulario.getAll("ingredientes"),
            molhos: formulario.getAll("molhos")
        };

        try {
            const itens = window.PedidoChapa.adicionar(produtoSelecionado.id, personalizacao);
            atualizarContador(itens);
            mostrarFeedback(`${produtoSelecionado.nome} personalizado foi adicionado ao carrinho.`);
            modal.close();
            produtoSelecionado = undefined;
        } catch (erro) {
            console.error("Não foi possível adicionar o produto personalizado:", erro);
            mostrarFeedback("Não foi possível adicionar esse lanche. Confira as opções e tente novamente.");
        }
    });

    window.addEventListener("storage", (evento) => {
        if (evento.key !== "chapa-quente-carrinho") return;
        try {
            atualizarContador(window.PedidoChapa.lerCarrinho());
        } catch (erro) {
            console.error("Não foi possível atualizar o contador do carrinho:", erro);
            mostrarFeedback("Não foi possível atualizar os itens do carrinho.");
        }
    });
})();
