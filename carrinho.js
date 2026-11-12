(function () {
    "use strict";

    const containerItens = document.getElementById("itens-carrinho");
    const emptyState = document.getElementById("carrinho-vazio");
    const mensagem = document.getElementById("mensagem-carrinho");
    const resumoItens = document.getElementById("resumo-itens");
    const subtotalElemento = document.getElementById("subtotal");
    const totalElemento = document.getElementById("total-pedido");
    const botaoFinalizar = document.getElementById("finalizar-pedido");
    const contadores = document.querySelectorAll("[data-cart-count]");
    const modalPix = document.getElementById("modal-pix");
    const canvasPix = document.getElementById("qr-pix");
    const modalPersonalizacao = document.getElementById("modal-personalizacao-carrinho");
    const formularioPersonalizacao = document.getElementById("form-personalizacao-carrinho");
    const descricaoPersonalizacao = document.getElementById("descricao-personalizacao-carrinho");
    const precoPersonalizado = document.getElementById("preco-personalizado-carrinho");
    const opcoesPao = document.getElementById("opcoes-pao-carrinho");
    const opcoesIngredientes = document.getElementById("opcoes-ingredientes-carrinho");
    const opcoesMolhos = document.getElementById("opcoes-molhos-carrinho");
    let varianteEditando;

    function criarElemento(tag, texto, classe) {
        const elemento = document.createElement(tag);
        if (texto !== undefined) elemento.textContent = texto;
        if (classe) elemento.className = classe;
        return elemento;
    }

    function atualizarContador(itens) {
        const quantidade = itens.reduce((total, item) => total + item.quantidade, 0);
        const descricaoQuantidade = `${quantidade} ${quantidade === 1 ? "item" : "itens"}`;
        contadores.forEach((elemento) => {
            elemento.textContent = String(quantidade);
            elemento.setAttribute("aria-label", `${descricaoQuantidade} no carrinho`);
        });
    }

    function mostrarErro(erro) {
        console.error("Erro ao atualizar o carrinho:", erro);
        mensagem.textContent = "Não foi possível carregar ou atualizar o carrinho. Recarregue a página e tente novamente.";
        resumoItens.textContent = "Não foi possível carregar os itens.";
        botaoFinalizar.disabled = true;
    }

    function renderizar() {
        try {
            const itens = window.PedidoChapa.lerCarrinho();
            containerItens.replaceChildren();

            const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);
            const totalCentavos = itens.reduce(
                (soma, item) => soma + Math.round(item.preco * 100) * item.quantidade,
                0
            );
            const total = totalCentavos / 100;
            const temItens = itens.length > 0;

            atualizarContador(itens);
            resumoItens.textContent = `${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"} no seu pedido`;
            emptyState.hidden = temItens;
            botaoFinalizar.disabled = !temItens;

            itens.forEach((produto) => {
                const artigo = criarElemento("article", undefined, "item-carrinho");
                const molduraImagem = criarElemento("div", undefined, "imagem-item");
                if (produto.imagem) {
                    const imagem = document.createElement("img");
                    imagem.src = produto.imagem;
                    imagem.alt = produto.nome;
                    imagem.loading = "lazy";
                    molduraImagem.append(imagem);
                } else {
                    const icones = {
                        "dogao-chapa": "🌭",
                        "coca-cola-350ml": "🥤",
                        "guarana-antarctica-350ml": "🥤",
                        "agua-mineral-500ml": "💧",
                        "brownie-chocolate": "🍫",
                        "sorvete-chocolate": "🍦"
                    };
                    molduraImagem.textContent = icones[produto.id] || "🍔";
                    molduraImagem.setAttribute("aria-label", produto.nome);
                }

                const detalhes = criarElemento("div", undefined, "detalhes-item");
                detalhes.append(
                    criarElemento("h3", produto.nome),
                    criarElemento("p", `${window.PedidoChapa.formatarPreco(produto.preco)} cada`)
                );
                if (produto.personalizacao) {
                    const personalizacao = produto.personalizacao;
                    const ingredientes = personalizacao.ingredientes.length
                        ? personalizacao.ingredientes.join(", ")
                        : "Sem ingredientes extras";
                    const molhos = personalizacao.molhos.length
                        ? personalizacao.molhos.join(", ")
                        : "Sem molho";
                    detalhes.append(
                        criarElemento(
                            "p",
                            `${personalizacao.pao} · ${ingredientes} · ${molhos}`,
                            "personalizacao-item"
                        )
                    );

                    const personalizar = criarElemento("button", "Personalizar", "personalizar-item");
                    personalizar.type = "button";
                    personalizar.dataset.acao = "personalizar";
                    personalizar.dataset.variante = produto.varianteId;
                    personalizar.setAttribute("aria-label", `Personalizar ${produto.nome}`);
                    detalhes.append(personalizar);
                }

                const controles = criarElemento("div", undefined, "controles-item");
                const diminuir = criarElemento("button", "−");
                diminuir.type = "button";
                diminuir.dataset.acao = "diminuir";
                diminuir.dataset.variante = produto.varianteId;
                diminuir.setAttribute("aria-label", `Diminuir quantidade de ${produto.nome}`);

                const quantidade = criarElemento("span", String(produto.quantidade), "quantidade-item");
                quantidade.setAttribute("aria-label", `Quantidade: ${produto.quantidade}`);

                const aumentar = criarElemento("button", "+");
                aumentar.type = "button";
                aumentar.dataset.acao = "aumentar";
                aumentar.dataset.variante = produto.varianteId;
                aumentar.setAttribute("aria-label", `Aumentar quantidade de ${produto.nome}`);

                const remover = criarElemento("button", "Remover", "remover-item");
                remover.type = "button";
                remover.dataset.acao = "remover";
                remover.dataset.variante = produto.varianteId;
                remover.setAttribute("aria-label", `Remover ${produto.nome} do carrinho`);

                controles.append(diminuir, quantidade, aumentar, remover);
                detalhes.append(controles);

                artigo.append(
                    molduraImagem,
                    detalhes,
                    criarElemento(
                        "span",
                        window.PedidoChapa.formatarPreco(Math.round(produto.preco * 100) * produto.quantidade / 100),
                        "subtotal-item"
                    )
                );
                containerItens.append(artigo);
            });

            subtotalElemento.textContent = window.PedidoChapa.formatarPreco(total);
            totalElemento.textContent = window.PedidoChapa.formatarPreco(total);
            mensagem.textContent = "";
        } catch (erro) {
            mostrarErro(erro);
        }
    }

    containerItens.addEventListener("click", (evento) => {
        const botao = evento.target.closest("button[data-acao]");
        if (!botao) return;

        try {
            const itens = window.PedidoChapa.lerCarrinho();
            const item = itens.find((produto) => produto.varianteId === botao.dataset.variante);
            if (!item) throw new Error("O produto não foi encontrado no carrinho.");

            if (botao.dataset.acao === "personalizar") {
                abrirPersonalizacao(item);
                return;
            } else if (botao.dataset.acao === "aumentar") {
                item.quantidade += 1;
            } else if (botao.dataset.acao === "diminuir") {
                item.quantidade -= 1;
                if (item.quantidade === 0) {
                    window.PedidoChapa.salvarCarrinho(itens.filter((produto) => produto.varianteId !== item.varianteId));
                    renderizar();
                    return;
                }
            } else if (botao.dataset.acao === "remover") {
                window.PedidoChapa.salvarCarrinho(itens.filter((produto) => produto.varianteId !== item.varianteId));
                renderizar();
                return;
            } else {
                throw new Error("Ação de carrinho inválida.");
            }

            window.PedidoChapa.salvarCarrinho(itens);
            renderizar();
        } catch (erro) {
            mostrarErro(erro);
        }
    });

    function criarOpcaoPersonalizacao(container, grupo, valor, selecionado, tipo) {
        const label = criarElemento("label", undefined, "opcao-personalizacao");
        const input = document.createElement("input");
        input.type = tipo;
        input.name = grupo;
        input.value = valor;
        input.checked = selecionado;
        label.append(input, criarElemento("span", valor));
        container.append(label);
    }

    function abrirPersonalizacao(item) {
        const opcoes = window.PedidoChapa.opcoesPersonalizacao;
        descricaoPersonalizacao.textContent = `${item.nome} — escolha o pão, os ingredientes e os molhos.`;
        precoPersonalizado.textContent = window.PedidoChapa.formatarPreco(item.preco);
        opcoesPao.replaceChildren();
        opcoesIngredientes.replaceChildren();
        opcoesMolhos.replaceChildren();

        opcoes.paes.forEach((pao) => {
            criarOpcaoPersonalizacao(opcoesPao, "pao", pao, pao === item.personalizacao.pao, "radio");
        });
        opcoes.ingredientes.forEach((ingrediente) => {
            criarOpcaoPersonalizacao(
                opcoesIngredientes,
                "ingredientes",
                ingrediente,
                item.personalizacao.ingredientes.includes(ingrediente),
                "checkbox"
            );
        });
        opcoes.molhos.forEach((molho) => {
            criarOpcaoPersonalizacao(
                opcoesMolhos,
                "molhos",
                molho,
                item.personalizacao.molhos.includes(molho),
                "checkbox"
            );
        });

        varianteEditando = item.varianteId;
        modalPersonalizacao.showModal();
    }

    document.querySelector("[data-fechar-personalizacao]").addEventListener("click", () => {
        modalPersonalizacao.close();
        varianteEditando = undefined;
    });

    formularioPersonalizacao.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!varianteEditando) return;

        const dados = new FormData(formularioPersonalizacao);
        const personalizacao = {
            pao: dados.get("pao"),
            ingredientes: dados.getAll("ingredientes"),
            molhos: dados.getAll("molhos")
        };

        try {
            const itens = window.PedidoChapa.atualizarPersonalizacao(varianteEditando, personalizacao);
            atualizarContador(itens);
            renderizar();
            mensagem.textContent = "Personalização do lanche atualizada.";
            modalPersonalizacao.close();
            varianteEditando = undefined;
        } catch (erro) {
            console.error("Não foi possível atualizar a personalização:", erro);
            mensagem.textContent = "Não foi possível salvar a personalização. Confira as opções e tente novamente.";
        }
    });

    function gerarQrAleatorio() {
        const contexto = canvasPix.getContext("2d");
        if (!contexto) {
            mensagem.textContent = "Não foi possível gerar a imagem do QR Code neste navegador.";
            return;
        }

        const modulos = 29;
        const tamanhoModulo = canvasPix.width / modulos;
        const bits = new Uint8Array(modulos * modulos);
        if (window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(bits);
        } else {
            bits.forEach((_, indice) => { bits[indice] = Math.floor(Math.random() * 256); });
        }

        contexto.fillStyle = "#fff";
        contexto.fillRect(0, 0, canvasPix.width, canvasPix.height);
        contexto.fillStyle = "#160b09";
        bits.forEach((valor, indice) => {
            if (valor > 127) {
                const x = indice % modulos;
                const y = Math.floor(indice / modulos);
                contexto.fillRect(x * tamanhoModulo, y * tamanhoModulo, tamanhoModulo, tamanhoModulo);
            }
        });

        function desenharMarcador(origemX, origemY) {
            contexto.fillStyle = "#fff";
            contexto.fillRect(
                origemX * tamanhoModulo,
                origemY * tamanhoModulo,
                tamanhoModulo * 8,
                tamanhoModulo * 8
            );
            contexto.fillStyle = "#160b09";
            contexto.fillRect(
                origemX * tamanhoModulo,
                origemY * tamanhoModulo,
                tamanhoModulo * 7,
                tamanhoModulo * 7
            );
            contexto.fillStyle = "#fff";
            contexto.fillRect(
                (origemX + 1) * tamanhoModulo,
                (origemY + 1) * tamanhoModulo,
                tamanhoModulo * 5,
                tamanhoModulo * 5
            );
            contexto.fillStyle = "#160b09";
            contexto.fillRect(
                (origemX + 2) * tamanhoModulo,
                (origemY + 2) * tamanhoModulo,
                tamanhoModulo * 3,
                tamanhoModulo * 3
            );
        }

        desenharMarcador(0, 0);
        desenharMarcador(modulos - 7, 0);
        desenharMarcador(0, modulos - 7);
        for (let indice = 8; indice < modulos - 8; indice += 1) {
            contexto.fillStyle = indice % 2 === 0 ? "#160b09" : "#fff";
            contexto.fillRect(indice * tamanhoModulo, 6 * tamanhoModulo, tamanhoModulo, tamanhoModulo);
            contexto.fillRect(6 * tamanhoModulo, indice * tamanhoModulo, tamanhoModulo, tamanhoModulo);
        }

        modalPix.showModal();
        mensagem.textContent = "";
    }

    document.querySelector("[data-fechar-pix]").addEventListener("click", () => modalPix.close());
    modalPix.addEventListener("click", (evento) => {
        if (evento.target === modalPix) modalPix.close();
    });

botaoFinalizar.addEventListener("click", () => {
        try {
            const itens = window.PedidoChapa.lerCarrinho();
            if (itens.length === 0) {
                mensagem.textContent = "Adicione pelo menos um produto antes de confirmar.";
                return;
            }
            modalPix.showModal();
            mensagem.textContent = "";
        } catch (erro) {
            console.error("Não foi possível abrir o modal de pagamento:", erro);
            mensagem.textContent = "Não foi possível continuar. Tente novamente.";
        }
    });

    window.addEventListener("storage", (evento) => {
        if (evento.key === "chapa-quente-carrinho") renderizar();
    });

    // Ação do Botão Avançar: exibe agradecimento, limpa o carrinho e atualiza
    const botaoAvancar = document.getElementById("botao-avancar");
    const mensagemAgradecimento = document.getElementById("mensagem-agradecimento");
    const botaoFecharAgradecimento = document.getElementById("fechar-agradecimento");

    if (botaoAvancar) {
        botaoAvancar.addEventListener("click", () => {
            // 1. Fecha o modal do Pix
            modalPix.close();

            // 2. Mostra a mensagem de agradecimento
            if (mensagemAgradecimento) {
                mensagemAgradecimento.style.display = "flex";
            }
            let pontos = localStorage.getItem("pontos");
            // 3. Remove os pedidos do localStorage
            localStorage.removeItem("chapa-quente-carrinho");
            localStorage.setItem("pontos", pontos);

            // 4. Atualiza a renderização da página (esvaziando o carrinho visualmente)
            renderizar();
        });
    }

    // Botão para fechar a tela de agradecimento
    if (botaoFecharAgradecimento) {
        botaoFecharAgradecimento.addEventListener("click", () => {
            mensagemAgradecimento.style.display = "none";
        });
    }
    renderizar();
})();
