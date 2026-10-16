export async function darFetch(URL, nome, email, cpf, senha) {
    const resposta = await fetch(URL, {
        method: "GET",
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
}
