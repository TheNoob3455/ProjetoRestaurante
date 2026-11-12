(function () {
    "use strict";

    const chaveCarrinho = "chapa-quente-carrinho";
    const opcoesPersonalizacao = Object.freeze({
        ingredientes: [
            "Tomate",
            "Alface",
            "Milho",
            "Batata palha",
            "Queijo",
            "Queijo cheddar",
            "Cebola",
            "Cebola caramelizada",
            "Picles",
            "Bacon",
            "Ovo",
            "Presunto",
            "Ervilha",
            "Hambúrguer"
        ],
        paes: [
            "Pão de hambúrguer tradicional",
            "Pão brioche",
            "Pão australiano",
            "Pão com gergelim",
            "Pão de hot dog",
            "Pão francês",
            "Pão de forma"
        ],
        molhos: [
            "Maionese tradicional",
            "Maionese temperada",
            "Maionese verde",
            "Ketchup",
            "Mostarda",
            "Barbecue",
            "Molho rosé",
            "Molho cheddar",
            "Molho de alho",
            "Molho de pimenta",
            "Molho especial da casa",
            "Molho de ervas"
        ]
    });
    const produtos = {
        "chapa-classico": {
            id: "chapa-classico",
            nome: "Chapa Clássico",
            preco: 29.9,
            imagem: "img/chapa-classico.png",
            ingredientes: ["Tomate", "Alface", "Queijo", "Queijo cheddar", "Hambúrguer"],
            molhos: ["Molho especial da casa"]
        },
        "chapa-duplo": {
            id: "chapa-duplo",
            nome: "Chapa Duplo",
            preco: 39.9,
            imagem: "img/duplo.png",
            ingredientes: ["Bacon", "Alface", "Queijo cheddar", "Cebola caramelizada", "Hambúrguer"],
            molhos: ["Molho especial da casa"]
        },
        "chapa-bacon": {
            id: "chapa-bacon",
            nome: "Chapa Bacon",
            preco: 34.9,
            imagem: "img/bacon.png",
            ingredientes: ["Bacon", "Alface", "Queijo cheddar", "Hambúrguer"],
            molhos: ["Molho especial da casa"]
        },
        "chapa-egg": {
            id: "chapa-egg",
            nome: "Chapa Egg",
            preco: 25.9,
            imagem: "img/chapa egg.png",
            ingredientes: ["Ovo", "Queijo", "Alface", "Hambúrguer"],
            molhos: ["Maionese temperada"]
        },
        "frango-crocante": {
            id: "frango-crocante",
            nome: "Frango Crocante",
            preco: 26.9,
            imagem: "img/chapa crocante.png",
            ingredientes: ["Queijo", "Alface"],
            molhos: ["Barbecue"]
        },
        "chapa-tudo": {
            id: "chapa-tudo",
            nome: "Chapa Tudo",
            preco: 34.9,
            imagem: "img/chapa tudo.png",
            ingredientes: ["Presunto", "Queijo", "Bacon", "Ovo", "Milho", "Alface", "Tomate", "Hambúrguer"],
            molhos: ["Molho especial da casa"]
        },
        "chapa-vegetariano": {
            id: "chapa-vegetariano",
            nome: "Chapa Vegetariano",
            preco: 25.9,
            imagem: "img/chapa vegetariano.png",
            ingredientes: ["Queijo", "Alface", "Tomate"],
            molhos: ["Molho de ervas"]
        },
        "combo-quente": {
            id: "combo-quente",
            nome: "Combo Quente",
            preco: 44.9,
            imagem: "img/combo.png",
            ingredientes: ["Tomate", "Alface", "Queijo", "Queijo cheddar", "Hambúrguer"],
            molhos: ["Molho especial da casa"]
        },
        "dogao-chapa": {
            id: "dogao-chapa",
            nome: "Dogão da Chapa",
            preco: 19.9,
            imagem: "img/Dogão_Gourmet_com_Batata_Palha-removebg-preview.png",
            ingredientes: ["Milho", "Batata palha", "Queijo"],
            molhos: ["Ketchup", "Mostarda"],
            pao: "Pão de hot dog"
        },
        "coca-cola-350ml": {
            id: "coca-cola-350ml",
            nome: "Coca-Cola 350ml",
            preco: 7,
            imagem: "img/coca-cola.png"
        },
        "guarana-antarctica-350ml": {
            id: "guarana-antarctica-350ml",
            nome: "Guaraná Antarctica 350ml",
            preco: 6,
            imagem: "img/guarana-antartica.png"
        },
        "agua-mineral-500ml": {
            id: "agua-mineral-500ml",
            nome: "Água Mineral 500ml",
            preco: 4,
            imagem: "img/agua.png"
        },
        "brownie-chocolate": {
            id: "brownie-chocolate",
            nome: "Brownie de Chocolate",
            preco: 12.9,
            imagem: "img/brownie.png"
        },
        "sorvete-chocolate": {
            id: "sorvete-chocolate",
            nome: "Sorvete",
            preco: 9.9,
            imagem: "img/sorvete.png"
        }
    };

    function normalizarPersonalizacao(produto, personalizacao) {
        const temOpcoesPersonalizacao =
            produto.ingredientes !== undefined || produto.molhos !== undefined || produto.pao !== undefined;
        if (!temOpcoesPersonalizacao) {
            if (personalizacao !== undefined && personalizacao !== null) {
                throw new Error("Este produto não possui opções de personalização.");
            }
            return null;
        }

        const escolha = personalizacao || {};
        const ingredientes = escolha.ingredientes === undefined
            ? produto.ingredientes
            : escolha.ingredientes;
        const molhos = escolha.molhos === undefined
            ? produto.molhos
            : escolha.molhos;
        const pao = escolha.pao === undefined
            ? (produto.pao || opcoesPersonalizacao.paes[0])
            : escolha.pao;

        if (
            !Array.isArray(ingredientes) ||
            ingredientes.some((nome) => !opcoesPersonalizacao.ingredientes.includes(nome)) ||
            new Set(ingredientes).size !== ingredientes.length
        ) {
            throw new Error("A seleção de ingredientes não é válida.");
        }
        if (
            !Array.isArray(molhos) ||
            molhos.some((nome) => !opcoesPersonalizacao.molhos.includes(nome)) ||
            new Set(molhos).size !== molhos.length
        ) {
            throw new Error("A seleção de molhos não é válida.");
        }
        if (!opcoesPersonalizacao.paes.includes(pao)) {
            throw new Error("O tipo de pão selecionado não é válido.");
        }

        return {
            ingredientes: [...ingredientes].sort(),
            pao,
            molhos: [...molhos].sort()
        };
    }

    function calcularPreco(produto, personalizacao) {
        if (!personalizacao || !produto.ingredientes) {
            return produto.preco;
        }
        const ingredientesBase = produto.ingredientes || [];
        const extras = personalizacao.ingredientes.filter(
            (ing) => !ingredientesBase.includes(ing)
        );
        return Math.round((produto.preco + extras.length * 2.5) * 100) / 100;
    }

    function criarVarianteId(id, personalizacao) {
        return `${id}:${JSON.stringify(personalizacao)}`;
    }

    function lerCarrinho() {
        const conteudo = localStorage.getItem(chaveCarrinho);
        if (conteudo === null) return [];

        const itens = JSON.parse(conteudo);
        if (!Array.isArray(itens)) {
            throw new Error("Os dados salvos do carrinho não estão em um formato válido.");
        }

        return itens.map((item) => {
            const produto = item && produtos[item.id];
            const quantidade = item && (item.quantidade ?? item.quantity);
            if (!produto || !Number.isInteger(quantidade) || quantidade < 1) {
                throw new Error("Um produto salvo no carrinho está inválido.");
            }

            const personalizacao = normalizarPersonalizacao(produto, item.personalizacao);
            const preco = calcularPreco(produto, personalizacao);
            return {
                ...produto,
                preco,
                quantidade,
                personalizacao,
                varianteId: criarVarianteId(produto.id, personalizacao)
            };
        });
    }

    function salvarCarrinho(itens) {
        if (!Array.isArray(itens)) {
            throw new Error("Não foi possível salvar o carrinho: lista de itens inválida.");
        }

        const itensValidados = itens.map((item) => {
            const produto = item && produtos[item.id];
            if (!produto || !Number.isInteger(item.quantidade) || item.quantidade < 1) {
                throw new Error("Não foi possível salvar um item inválido no carrinho.");
            }
            const personalizacao = normalizarPersonalizacao(produto, item.personalizacao);
            const preco = calcularPreco(produto, personalizacao);
            return {
                ...produto,
                preco,
                quantidade: item.quantidade,
                personalizacao
            };
        });

        localStorage.setItem(chaveCarrinho, JSON.stringify(itensValidados));
    }

    function adicionar(id, escolha, quantidade = 1) {
        const produto = produtos[id];
        if (!produto) {
            throw new Error("Este produto não está disponível para compra.");
        }
        if (!Number.isInteger(quantidade) || quantidade < 1) {
            throw new Error("A quantidade do pedido deve ser um número inteiro maior que zero.");
        }

        const personalizacao = normalizarPersonalizacao(produto, escolha);
        const preco = calcularPreco(produto, personalizacao);
        const varianteId = criarVarianteId(id, personalizacao);
        const itens = lerCarrinho();
        const existente = itens.find((item) => item.varianteId === varianteId);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            itens.push({ ...produto, preco, quantidade, personalizacao });
        }
        salvarCarrinho(itens);
        return lerCarrinho();
    }

    function atualizarPersonalizacao(varianteId, escolha) {
        const itens = lerCarrinho();
        const indice = itens.findIndex((item) => item.varianteId === varianteId);
        if (indice === -1) {
            throw new Error("O produto que você deseja personalizar não foi encontrado no carrinho.");
        }

        const item = itens[indice];
        const produto = produtos[item.id];
        const personalizacao = normalizarPersonalizacao(produto, escolha);
        const preco = calcularPreco(produto, personalizacao);
        const novaVarianteId = criarVarianteId(item.id, personalizacao);
        const itemExistente = itens.find(
            (outroItem, outroIndice) => outroIndice !== indice && outroItem.varianteId === novaVarianteId
        );

        if (itemExistente) {
            itemExistente.quantidade += item.quantidade;
            itens.splice(indice, 1);
        } else {
            itens[indice] = { ...item, preco, personalizacao };
        }

        salvarCarrinho(itens);
        return lerCarrinho();
    }

    function formatarPreco(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valor);
    }

    window.PedidoChapa = Object.freeze({
        lerCarrinho,
        salvarCarrinho,
        adicionar,
        atualizarPersonalizacao,
        formatarPreco,
        opcoesPersonalizacao,
        obterProduto: (id) => {
            const produto = produtos[id];
            if (!produto) throw new Error("Este produto não está disponível para compra.");
            const personalizacao = normalizarPersonalizacao(produto);
            const preco = calcularPreco(produto, personalizacao);
            return { ...produto, preco, personalizacao };
        }
    });

})();
