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

export async function cadastrarProduto(nome, quantidade, tipo, valor) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/produto'
    const resposta = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            quantidade: quantidade,
            tipo_produto: tipo,
            valor: valor
        }) 
    });

    if (resposta.ok) {
        console.log("deu tudo certo tropa");
        return "ok";
    }
    else {
        console.log("deu erro rapaziada: " + resposta.status);
        return "erro";
    }
}

export async function removerProduto(nomeDoProduto) {
    const URL = `https://projeto-restaurante-backend-5mhl.onrender.com/produto`
    const respostaDoProduto = await fetch(URL)

    let idProduto;

    if (respostaDoProduto.ok) {
        const produto = await respostaDoProduto.json();

        for (let loop = 0; loop < produto.length; loop++){
            if (produto[loop].nome == nomeDoProduto) {
                idProduto = produto[loop].id_Produto;
                console.log(idProduto);
            }
        }
    }
    else {
        console.log("deu erro no resposta produto tropa: " + respostaDoProduto.status)
    }
    const URLproduto = `https://projeto-restaurante-backend-5mhl.onrender.com/produto/${idProduto}`
    const respostaDoDelete = await fetch(URLproduto, {
        method: "DELETE",
    });

    if (respostaDoDelete.ok) {
        console.log("Deu certo tropa");
        return "ok";
    }
    else {
        console.log("deu erro no resposta delete tropa: " + respostaDoDelete.status);
        return "erro"
    }
}


export async function cadastrarPedido(desconto, valor, valor_total, email) {
    const URLcliente //continuar daqui






    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/pedido'
    const resposta = await fetch(URL, 
        { method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            desconto: desconto,
            valor: valor,
            valorTotal: valor_total,
            id_Cliente: idcliente
        }) 
    })

    if (resposta.ok) {
        console.log("Deu certo ao cadastrar pedido tropa!")
    }
    else{
        console.log("Deu errado ao cadastrar pedido tropa ;c : " + resposta.status)
    }
}

cadastrarPedido(0, 10, 10);

*/
