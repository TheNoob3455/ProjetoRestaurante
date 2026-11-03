export async function verificarADM(email, senha) {
  const URL = 'https://projeto-restaurante-backend-5mhl.onrender.com/admin'
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
