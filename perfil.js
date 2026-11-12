import { pegarInformacao } from './fetchs.js';

const cliente = await pegarInformacao(localStorage.getItem("usuarioEmail"))

const nome = cliente.nome;

document.addEventListener("DOMContentLoaded", () => {
    const botaoPerfil = document.getElementById("botao-perfil");
    const dropdownPerfil = document.getElementById("dropdown-perfil");
    const perfilNome = document.getElementById("perfil-nome");
    const perfilEmail = document.getElementById("perfil-email");
    const botaoLogout = document.getElementById("botao-logout");

    // 1. Puxar os dados do utilizador do localStorage (ajuste as chaves se necessário)
    const nomeUsuario = localStorage.getItem("usuarioNome") || "Cliente";
    const emailUsuario = localStorage.getItem("usuarioEmail") || "email@nao-informado.com";

    if (perfilNome) perfilNome.textContent = `Olá, ${nome}`;
    if (perfilEmail) perfilEmail.textContent = emailUsuario;

    // 2. Abrir/Fechar dropdown ao clicar no ícone de perfil
    if (botaoPerfil && dropdownPerfil) {
        botaoPerfil.addEventListener("click", (evento) => {
            evento.stopPropagation(); // Evita fechar imediatamente ao clicar
            dropdownPerfil.hidden = !dropdownPerfil.hidden;
        });

        // Fechar ao clicar em qualquer outro lugar fora do menu
        document.addEventListener("click", (evento) => {
            if (!dropdownPerfil.contains(evento.target) && !botaoPerfil.contains(evento.target)) {
                dropdownPerfil.hidden = true;
            }
        });
    }

    // 3. Ação de Logout
    if (botaoLogout) {
        botaoLogout.addEventListener("click", () => {
            // Remove os dados de sessão do localStorage
            localStorage.removeItem("usuarioEmail");
            localStorage.removeItem("usuarioNome");
            localStorage.removeItem("usuarioId");
            // Se preferir limpar tudo de uma vez, descomente a linha abaixo:
            localStorage.clear();

            // Redireciona para a página principal ou de login
            window.location.href = "index.html";
        });
    }
});
