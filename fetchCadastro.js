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
