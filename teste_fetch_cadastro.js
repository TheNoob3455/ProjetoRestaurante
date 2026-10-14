const formulario = document.querySelector("form");
const URL = "https://projeto-restaurante-marcus.onrender.com/cadastro.html"
        
        formulario.addEventListener("submit", async (event) => {
            event.preventDefault

            const resposta = await fetch(URL), {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome.value,
                    email: email.value,
                    cpf: cpf.value,
                    senha: senha.value
                })
            })
        });

        const dadoss = await resposta.json();
        console.log(dadoss);
