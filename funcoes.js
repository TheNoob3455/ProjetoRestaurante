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
