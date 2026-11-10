
export async function darFetch(nome, email, senha, token) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: null,
            senha: senha,
            token: token

        })
    });
    if (resposta.ok) {

        const cliente = await resposta.json();
        console.log("Sucesso! Registro salvo no banco:", cliente);

        return true;

    } else {

        console.error("Erro no 'darFetch': ", resposta.status);
        return false;
    }
}
// --------------------------------------------------

export async function pegarFetch(email, senha, token) {
    const URLcliente = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const respostaCliente = await fetch(URLcliente, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    let clientes = null;
    let clienteAtual = null;

    if(respostaCliente.ok) {
        clientes = await respostaCliente.json();
        
        if (clientes === null || clientes.length === 0) {
            console.log("Não existe nenhum cliente");
            return false;
        }

        for (let loop = 0; loop < clientes.length; loop++) {
            if (clientes[loop].email === email) {
                clienteAtual = clientes[loop];
                break;
            }
        }
    } else {
        console.error("Erro ao buscar clientes: ", respostaCliente.status);
        return false;
    }

    if (clienteAtual == null) {
        console.log("Não existe nenhum cliente com esse e-mail");
        return "email";
    } else {
        console.log("Existe um cliente com esse e-mail");
    }

    const URLhash = `https://projeto-restaurante-backend-5mhl.onrender.com/cliente/${clienteAtual.id_Cliente}`;
    const respostaHash = await fetch(URLhash, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
            senhaDigitada: senha
        })
    });

    console.log("Resposta do hash:", respostaHash);

    if (respostaHash.ok) {
        let resultado = await respostaHash.json();
        console.log("Resultado do hash:", resultado);

        if (resultado.autenticado == true) {
            return true;
        } else {
            return "senha";
        }
    } else {
        console.error("Erro ao validar senha: ", respostaHash.status);
        return false;
    }
}
// --------------------------------------------------


export async function Emailexiste(email) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL, {
        method: "GET",
        credentials: "include"
    });

    if (resposta.ok) {
        const cliente = await resposta.json();

        for (let loop = 0; loop < cliente.length; loop++) {
            if (cliente[loop].email === email) {
                console.log("este email já existe");
                return false;
            }
        }
        console.log("email tudo certo");
        return true;
    }
    else {
        console.error("Erro ao buscar clientes: ", resposta.status);
        return false;
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

// --------------------------------------------------------------------------------- // ---------------------------------------------------------------------------------

export async function verificarADM(email, senha) {
  const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/verificacao/admin-status'
  const resposta = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
  });

  if (resposta.ok) {
    const resultado = await resposta.json();

    if(resultado == true){
      return true;
    }
    else{
      return false;
    }
  }
  else {
    console.log("erro: " + resposta.status);
    return false;
  }
}

export async function pegarSenha(email) {
    const URL = `https://projeto-restaurante-backend-5mhl.onrender.com/cliente`
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();
        for (let loop = 0; loop < cliente.length; loop++) {
            if (cliente[loop].email == email) {
                return cliente[loop].senha;
            }
        }
    }
    else {
        console.log("deu erro tropa: " + resposta.status);
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
