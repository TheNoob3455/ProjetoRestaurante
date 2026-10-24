export function validarEmail(email) {
            const regex = /^[^\s@]+@gmail\.com$/;
            const regex2 = /^[^\s@]+@hotmail\.com$/;
            const regex3 = /^[^\s@]+@yahoo\.com$/;
            const regex4 = /^[^\s@]+@outlook\.com$/;
            const regex5 = /^[^\s@]+@icloud\.com$/;
            const regex6 = /^[^\s@]+@proton\.me$/;
            
            if (regex.test(email) || regex2.test(email) || regex3.test(email) || regex4.test(email) || regex5.test(email) || regex6.test(email)) {
                return true;
            } else {
                return false;
            }
}

export function validarCPF(strCPF) {
            strCPF = strCPF.replace(/[^\d]+/g, '');
            if (strCPF.length !== 11 || /^(\d)\1+$/.test(strCPF)) return false;
            
            let Soma = 0;
            let Resto;
            
            for (let i = 1; i <= 9; i++) {
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            }
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(strCPF.substring(9, 10))) return false;
            
            Soma = 0;
            for (let i = 1; i <= 10; i++) {
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            }
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
            
            return true;
}
