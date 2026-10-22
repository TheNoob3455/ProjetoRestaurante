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
        //return ;
    } else {
        //return ;
    }
}

export async function adicionarCarrinho(idDoProduto) {
    const URLdoProduto = 'https://projeto-restaurante-backend-5mhl.onrender.com/produto';
    const URLdoCarrinho = 'https://projeto-restaurante-backend-5mhl.onrender.com/pedido';
    const respostaProduto = await fetch(URLdoProduto);

    if (respostaProduto.ok) {
        const produto = await respostaProduto.json();
        for (let loop = 0; loop < produto.length; loop++) {
            if (produto[loop].id_produto == idDoProduto) {
                const respostaCarrinho = await fetch(URLdoCarrinho, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_produto: idDoProduto
                    })
                });

                if (respostaCarrinho.ok) {
                    //return ;
                } else {
                    //return ;
                }
            }
        }
    }
}
*/
