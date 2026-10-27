export async function darFetch(nome, email, cpf, senha) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: cpf,
            senha: senha
        })
    });

    if (resposta.ok) {
    return console.log("Sucesso! Registro salvo no banco:", (await resposta.json()));

    } else {
    return console.error("Erro do servidor (" + resposta.status + "):", (await resposta.text()));
    }
}

// ---------------------------------------------------------------------------------

export async function pegarFetch(email, senha) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();
        for (let loop = 0; loop < cliente.length; loop++) {
            if (
                cliente[loop].email === email &&
                cliente[loop].senha === senha
            ) {
                return "Login bem-sucedido!";
            }
        }
        return "Email ou senha incorretos.";
    } else {
        const erro = await resposta.text();
        return "Erro do servidor (" + resposta.status + "): " + erro;
    }
}

// ---------------------------------------------------------------------------------


export async function CpfEmailexiste(cpf, email) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente'
    const resposta = await fetch(URL)

    if (resposta.ok){
        const cliente = await resposta.json();
        for(let loop = 0; loop < cliente.length; loop++){
            if(cliente[loop].email == email) {
                return 'email usado';
            }
        }
        for(let loop = 0; loop < cliente.length; loop++) {
            if(cliente[loop].cpf == cpf) {
                return 'cpf usado';
            }
        }
        return false;
    }
}


/*
export async function criarPrato(id_pedido, id_produto) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/prato';
    const resposta = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id_pedido: id_pedido, 
            id_produto: id_produto
        })
    });

    if (resposta.ok) {
        return console.log('Prato criado com sucesso!');
    }
    else {
        return console.log('Erro ao criar prato.' + resposta.status);
    }
}

export async function removerPrato(id_prato) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/prato';
    const resposta = await fetch(URL, {
    method: 'DELETE',
    });

    if (resposta.ok) {
        return console.log('Prato removido com sucesso!');
    }
    else {
        return console.log('Erro ao remover prato.' + resposta.status);
    }
}

export async function adicionarProdutos(nome, quantidade, tipo_produto, valor) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/produto';
    const resposta = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            quantidade: quantidade,
            tipo_produto: tipo_produto,
            valor: valor
        })
    });

    if (resposta.ok) {
        return console.log('Produto adicionado com sucesso!');
    } else {
        return console.log('Erro ao adicionar produto.' + resposta.status);
    }
}

export async function removerProduto(id_produto) {
    const URL = `https://projeto-restaurante-backend-5mhl.onrender.com/produto`;
    const resposta = await fetch(URL, {
        method: "DELETE",
    });

    if (resposta.ok) {
        return console.log('Produto removido com sucesso!');
    }
    else {
        return console.log('Erro ao remover produto.' + resposta.status);
    }
}

export async function verCarrinho(id_pedido) {
    const URL = `https://projeto-restaurante-backend-5mhl.onrender.com/pedido/${id_pedido}`;
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const dados = await resposta.json();
        return dados;
    }
    else {
        return console.log('Erro ao buscar carrinho.' + resposta.status);
    }
}

export async function criarPedido(desconto, valor, valor_total, id_cliente, id_produto) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/pedido';
    const resposta = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            desconto: desconto,
            valor: valor,
            valor_total: valor_total,
            id_cliente: id_cliente,
            produto: id_produto 
        })
    });

    if (resposta.ok) {
        return console.log('Pedido criado com sucesso!');
    }
    else {
        return console.log('Erro ao criar pedido.' + resposta.status);
    }
}

criarPedido(10, 50.0, 45.0, 4, 2);

*/
