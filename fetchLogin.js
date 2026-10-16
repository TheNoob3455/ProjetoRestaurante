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
const email = "jgdasneves23@gmail.com";
const cpf = "136.448.229-05";
const senha = "123456";

pegarFetch(email, cpf, senha)
.then(resultado => {
    console.log(resultado)
});
