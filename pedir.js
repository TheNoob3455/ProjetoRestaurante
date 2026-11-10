
(() => {
    "use strict";

    const $ = (seletor) => document.querySelector(seletor);
    const $$ = (seletor) => document.querySelectorAll(seletor);

    const modal = $("#modal");
    const quantidade = $("#quantidade");
    const mensagem = $("#mensagem-pedido");
    let selecionado;
    let temporizador;

    function aviso(texto) {
        clearTimeout(temporizador);
        mensagem.textContent = texto;
        temporizador = setTimeout(() => mensagem.textContent = "", 3000);
    }

    function contador(itens) {
        const total = itens.reduce((soma, item) => soma + item.quantidade, 0);
        $$("[data-cart-count]").forEach(el => {
            el.textContent = total;
            el.setAttribute("aria-label", `${total} itens no carrinho`);
        });
    }

    function fecharModal() {
        modal.style.display = "none";
        selecionado = null;
    }

    $$("[data-adicionar]").forEach(botao => {
        botao.addEventListener("click", () => {
            try {
                selecionado = PedidoChapa.obterProduto(botao.dataset.adicionar);
                $("#nome-produto").textContent = selecionado.nome;
                $("#preco-produto").textContent =
                    PedidoChapa.formatarPreco(selecionado.preco);
                quantidade.value = 1;
                modal.style.display = "flex";
                quantidade.focus();
            } catch (erro) {
                console.error(erro);
                aviso("Não foi possível abrir o produto.");
            }
        });
    });

    $$("[data-fechar-modal]").forEach(botao =>
        botao.addEventListener("click", fecharModal)
    );

    modal.addEventListener("click", e => {
        if (e.target === modal) fecharModal();
    });

    $("#confirmar-pedido").addEventListener("click", () => {
        const total = Number(quantidade.value);

        if (!selecionado || !Number.isInteger(total) || total < 1) {
            aviso("Informe uma quantidade válida.");
            return;
        }

        try {
            const itens = PedidoChapa.adicionar(selecionado.id, undefined, total);
            const nome = selecionado.nome;
            contador(itens);
            fecharModal();
            aviso(`${total} unidade(s) de ${nome} adicionada(s) ao carrinho.`);
        } catch (erro) {
            console.error(erro);
            aviso("Não foi possível adicionar ao carrinho.");
        }
    });

    const produtos = $(".produtos");
    const reservasArea = $("#reservas-area");

    $$("[data-categoria]").forEach(botao => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;
            const reserva = categoria === "reservas";

            reservasArea.hidden = !reserva;
            produtos.hidden = reserva;
            produtos.style.display = reserva ? "none" : "";

            $$(".escolhas button").forEach(el =>
                el.classList.toggle("ativo", el === botao)
            );

            $$(".produto").forEach(el => {
                el.style.display =
                    categoria === "todos" || el.classList.contains(categoria)
                        ? "flex" : "none";
            });
        });
    });

    try {
        contador(PedidoChapa.lerCarrinho());
    } catch (erro) {
        console.error(erro);
        aviso("Não foi possível carregar o carrinho.");
    }

    window.addEventListener("storage", e => {
        if (e.key === "chapa-quente-carrinho") {
            try {
                contador(PedidoChapa.lerCarrinho());
            } catch (erro) {
                console.error(erro);
            }
        }
    });

    const form = $("#reserva-form");
    const nome = $("#reserva-nome");
    const data = $("#reserva-data");
    const hora = $("#reserva-hora");
    const pessoas = $("#reserva-pessoas");
    const observacoes = $("#reserva-obs");
    const grade = $("#reserva-mesas");
    const resumo = $("#reserva-resumo");
    const feedback = $("#reserva-feedback");

    const CHAVE = "chapa-quente-reservas-demo-v1";
    const DURACAO = 90;
    const MESAS = [2, 2, 4, 4, 6, 8].map((lugares, i) => ({
        id: i + 1, lugares
    }));

    const dois = n => String(n).padStart(2, "0");
    const minutos = h => {
        const [horas, mins] = h.split(":").map(Number);
        return horas * 60 + mins;
    };

    function hoje() {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }

    function limite() {
        const d = hoje();
        const ultimo = new Date(d.getFullYear(), d.getMonth() + 2, 0).getDate();
        return new Date(
            d.getFullYear(), d.getMonth() + 1, Math.min(d.getDate(), ultimo)
        );
    }

    function interpretarData() {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data.value);
        if (!m) return null;

        const dia = +m[1], mes = +m[2], ano = +m[3];
        if (ano < 1 || mes < 1 || mes > 12) return null;

        const d = new Date(0);
        d.setFullYear(ano, mes - 1, dia);
        d.setHours(0, 0, 0, 0);

        return d.getDate() === dia && d.getMonth() === mes - 1 ? d : null;
    }

    function dataValida() {
        const d = interpretarData();
        return d && d >= hoje() && d <= limite();
    }

    function dataISO() {
        const d = interpretarData();
        return d
            ? `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`
            : "";
    }

    function horarioValido() {
        if (!/^\d{2}:\d{2}$/.test(hora.value)) return false;
        const m = minutos(hora.value);
        return m >= 1080 && m <= 1380 && m % 30 === 0;
    }

    function horarioFuturo() {
        const d = interpretarData();
        if (!d || !horarioValido()) return false;
        return d.getTime() + minutos(hora.value) * 60000 > Date.now();
    }

    function lerReservas() {
        try {
            const lista = JSON.parse(localStorage.getItem(CHAVE) || "[]");
            return Array.isArray(lista) ? lista : [];
        } catch {
            return [];
        }
    }

    function ocupadas() {
        return new Set(lerReservas()
            .filter(r => r.data === dataISO() &&
                Math.abs(minutos(r.hora) - minutos(hora.value)) < DURACAO)
            .map(r => r.mesa));
    }

    function escolherMesa() {
        const total = Number(pessoas.value);
        if (!dataValida() || !horarioFuturo() || !total) return null;

        const bloqueadas = ocupadas();
        return MESAS
            .filter(m => m.lugares >= total && !bloqueadas.has(m.id))
            .sort((a, b) => a.lugares - b.lugares || a.id - b.id)[0] || null;
    }

    function erro(campo, texto = "") {
        const el = form.querySelector(`[data-erro="${campo}"]`);
        if (el) el.textContent = texto;
    }

    function atualizar() {
        grade.replaceChildren();

        if (!dataValida()) {
            resumo.textContent = "Informe uma data válida dentro do próximo mês.";
            return;
        }

        if (!horarioFuturo()) {
            resumo.textContent = "Selecione um horário futuro entre 18h e 23h.";
            return;
        }

        const bloqueadas = ocupadas();
        const mesa = escolherMesa();

        MESAS.forEach(m => {
            const reservada = bloqueadas.has(m.id);
            const card = document.createElement("div");
            card.className = `reserva-mesa${reservada ? " reservada" : ""}`;

            card.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="7" width="14" height="10" rx="2"/>
                    <path d="M8 4v3m8-3v3M8 17v3m8-3v3M2 10h3m14 0h3M2 14h3m14 0h3"/>
                </svg>
                <strong>Mesa ${dois(m.id)}</strong>
                <small>${m.lugares} lugares • ${reservada ? "Reservada" : "Disponível"}</small>
            `;
            grade.append(card);
        });

        resumo.textContent = !pessoas.value
            ? "Selecione a quantidade de pessoas."
            : mesa
                ? `Mesa ${dois(mesa.id)} sugerida para ${pessoas.value} pessoa(s).`
                : "Nenhuma mesa disponível nesse horário.";
    }

    data.addEventListener("input", () => {
        const n = data.value.replace(/\D/g, "").slice(0, 8);
        let dia = n.slice(0, 2);
        let mes = n.slice(2, 4);
        const ano = n.slice(4, 8);

        if (mes.length === 2) {
            mes = dois(Math.min(12, Math.max(1, +mes)));
        }

        if (dia.length === 2) {
            let max = 31;
            if (mes.length === 2) {
                max = +mes === 2 && ano.length < 4
                    ? 29
                    : new Date(ano.length === 4 ? +ano : 2024, +mes, 0).getDate();
            }
            dia = dois(Math.min(max, Math.max(1, +dia)));
        }

        data.value = dia + (mes ? "/" + mes : "") + (ano ? "/" + ano : "");
        erro("data");
        atualizar();
    });

    data.addEventListener("blur", () => {
        if (data.value && !dataValida()) {
            erro("data", "Escolha uma data válida até 1 mês de antecedência.");
        }
    });

    [hora, pessoas].forEach(el => el.addEventListener("change", atualizar));

    form.addEventListener("submit", e => {
        e.preventDefault();
        ["nome", "data", "hora", "pessoas"].forEach(c => erro(c));
        feedback.textContent = "";
        feedback.classList.remove("sucesso");

        let valido = true;
        const verificar = (condicao, campo, texto) => {
            if (!condicao) {
                erro(campo, texto);
                valido = false;
            }
        };

        verificar(nome.value.trim().length >= 3,
            "nome", "Informe seu nome completo.");
        verificar(dataValida(),
            "data", "Escolha uma data válida até 1 mês de antecedência.");
        verificar(horarioValido() && horarioFuturo(),
            "hora", "Escolha um horário futuro entre 18h e 23h.");
        verificar(Number.isInteger(+pessoas.value) &&
            +pessoas.value >= 1 && +pessoas.value <= 8,
            "pessoas", "Selecione entre 1 e 8 pessoas.");

        if (!valido) return;

        const mesa = escolherMesa();
        if (!mesa) {
            feedback.textContent = "Não há mesa disponível. Tente outro horário.";
            return;
        }

        const lista = lerReservas();
        const dia = data.value, horario = hora.value;

        lista.push({
            id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
            nome: nome.value.trim(),
            data: dataISO(),
            hora: horario,
            pessoas: +pessoas.value,
            mesa: mesa.id,
            observacoes: observacoes.value.trim()
        });

        try {
            localStorage.setItem(CHAVE, JSON.stringify(lista));
        } catch {
            feedback.textContent = "Não foi possível salvar a reserva.";
            return;
        }

        form.reset();
        atualizar();
        feedback.textContent =
            `Reserva de demonstração salva! Mesa ${dois(mesa.id)}, ${dia} às ${horario}. Não é uma confirmação do restaurante.`;
        feedback.classList.add("sucesso");
    });

    window.addEventListener("storage", e => {
        if (e.key === CHAVE) atualizar();
    });

    atualizar();
})();
