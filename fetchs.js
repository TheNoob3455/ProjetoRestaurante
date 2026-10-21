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

export async function pegarFetch(email, cpf, senha) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente';
    const resposta = await fetch(URL);

    if (resposta.ok) {
        const cliente = await resposta.json();
        for (let loop = 0; loop < cliente.length; loop++) {
            if (
                cliente[loop].email === email &&
                cliente[loop].cpf === cpf &&
                cliente[loop].senha === senha
            ) {
                return "Login bem-sucedido!";
            }
        }
        return "Email, CPF ou senha incorretos.";
    } else {
        const erro = await resposta.text();
        return "Erro do servidor (" + resposta.status + "): " + erro;
    }
}

// ---------------------------------------------------------------------------------

export async function verificarEmailexiste(email) {
    const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/cliente'
    const resposta = await fetch(URL)

    if (resposta.ok){
        const cliente = await resposta.json();
        for(let loop = 0; loop < cliente.length; loop++){
            if(cliente[loop].email == email) {
                return true;
            }
        }
        return false;
    }

}
