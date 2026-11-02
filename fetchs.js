
export async function darFetch(nome, email, cpf, senha, token) {
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
            senha: senha,
            token: token
        })
    });

    if (resposta.ok) {
        const cliente = await resposta.json();
        console.log("Sucesso! Registro salvo no banco:", cliente);
        return "ok";
    } else {
        console.error("Erro no 'darFetch': ", resposta.status);
        return "erro";
    }
}

// --------------------------------------------------

export async function pegarFetch(email, senha, token) {
    const URLcliente = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const respostaCliente = await fetch(URLcliente);

    let clientes = null;
    let clienteAtual = null;


    if(respostaCliente.ok) {
        clientes = await respostaCliente.json();
        
        if (clientes === null) {
            console.log("Não existe nenhum cliente");
            return false;
        }

        for (let loop = 0; loop < clientes.length; loop++) {
            if (clientes[loop].email === email) {
                clienteAtual = clientes[loop];
                break;
            }
        }
    }

    else {
        console.error("Erro ao buscar clientes: ", respostaCliente.status);
        return "erro";
    }


    if (clienteAtual == null) {
        console.log("Não existe nenhum cliente com esse e-mail");
        return false;
    }
    else {
        console.log("Existe um cliente com esse e-mail");
    }

    const URLhash = `https://projeto-restaurante-backend-5mhl.onrender.com/cliente/${clienteAtual.id_Cliente}`;
    const respostaHash = await fetch(URLhash, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            senhaDigitada: senha
        })
    });

    console.log("Resposta do hash:", respostaHash);

    if (respostaHash.ok) {
        let resultado = await respostaHash.json();
        if (resultado == true) {
            console.log(resultado);
            return true;
        } else {
            console.log(resultado);
            return false;
        }
    } else {
        console.error("Erro ao buscar clientes: ", respostaHash.status);
        return "erro";
    }
}
// --------------------------------------------------

export async function CpfEmailexiste(cpf, email) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();

        for (let loop = 0; loop < cliente.length; loop++) {
            if (cliente[loop].email === email) {
                return 'email';
            }
        }

        for (let loop = 0; loop < cliente.length; loop++) {
            if (cliente[loop].cpf === cpf) {
                return 'cpf';
            }
        }

        return false;
    }
    else {
        console.error("Erro ao buscar clientes: ", resposta.status);
        return "erro";
    }
}

export async function Hash(token, senha) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente/cliente'
    const resposta = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                token: token, 
                senhaDigitada: senha
            })
        });
        
    if(resposta.ok){
        console.log("tudo certo")
        return true;
    }
    else{
        console.log("erro: "+ resposta.status)
        return false;
    }
}

// --------------------------------------------------------------------------------- // ---------------------------------------------------------------------------------

export async function confirmarES(email, senha, opcao){
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();
        for (let loop = 0; loop < cliente.length; loop++) {
            if (opcao === 'email' && cliente[loop].email === email) {
                return true;
            }
            else if (opcao === 'senha' && cliente[loop].senha === senha) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        console.error("Erro ao buscar clientes: ", resposta.status);
        return "erro";
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
