
export async function darFetch(nome, email, senha, token) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL, {
        method: "POST",
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

// --------------------------------------------------------------------------------- // ---------------------------------------------------------------------------------

// --------------------------------------------------------------------------------- // ---------------------------------------------------------------------------------

export async function verificarADM(email, senha) {
  const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/verificacao/admin'
  const resposta = await fetch(URL, {
        method: "POST",
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


export async function pegarInformacao(email) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();
        for (let loop = 0; loop < cliente.length; loop++) {
            if (cliente[loop].email == email) {
                return cliente[loop];
            }
        }
    }
    else {
        console.error("Erro ao buscar informações do cliente: ", resposta.status);
    }
}

export async function adicionarCarrinho(produto, pedido, quantidade, preco) {
    precoTotal = preco * quantidade;

    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/carrinho';
    const resposta = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            produto: produto, 
            pedido: pedido, 
            quantidade: quantidade, 
            precoUnitario: precoTotal 
        })
    });

}

export async function pegarProduto(nome) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/produto';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const produto = await resposta.json();
        for (let loop = 0; loop < produto.length; loop++) {
            if (produto[loop].nome == nome) {
                return produto[loop];
            }
        }
    }
    else {
        console.error("Erro ao buscar informações do produto: ", resposta.status);
    }
}

export async function pegarPeID(clID) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/pedido';
    const resposta = await fetch(URL);
    
    if (resposta.ok) {
        const pedido = await resposta.json();
        for (let loop = 0; loop < pedido.length; loop++) {
            if (pedido[loop].cliente.id_Cliente == clID) {
                return pedido[loop];
            }
        }
    }
    else {
        console.error("Erro ao buscar informações do pedido: ", resposta.status);
    }
}
