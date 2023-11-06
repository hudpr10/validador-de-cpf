const campoCPF = document.querySelector('.cpf');
const legenda = document.querySelector('.legenda');
campoCPF.addEventListener('keydown', (e) => {
    for(let i = 0; i < 10; i++) {
        if(e.code === `Digit${i}`) {
            if(campoCPF.value.length === 3) {
                campoCPF.value += '.'
            } else if(campoCPF.value.length === 7) {
                campoCPF.value += '.'
            } else if(campoCPF.value.length === 11) {
                campoCPF.value += '-'
            }
        }
    }

    if(e.code === 'Enter') {
        verificadorDosDigitos();
        cpfRepetido();
        campoVazio();
    }
})

campoCPF.addEventListener('blur', () => {
    verificadorDosDigitos();
    cpfRepetido();
    campoVazio();
})

function campoVazio() {
    if(campoCPF.value === '') {
        legenda.innerHTML = ''
    }
}

function cpfRepetido() {
    const cpfLimpo = campoCPF.value.replace(/\.|-/g, "");
    const numerosRepetidos = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"];
    if(numerosRepetidos.includes(cpfLimpo)) {
        legenda.innerHTML = "*Esse CPF não é valido"
        legenda.classList.add('vermelho')
    }
}

function verificadorDosDigitos() {
    const cpfLimpo = campoCPF.value.replace(/\.|-/g, "");
    if(cpfLimpo.length < 11) {
        legenda.innerHTML = "*O CPF deve ter no mínimo 11 dígitos";
        legenda.classList.add('vermelho')
    } else if(cpfLimpo.length > 11) {
        legenda.innerHTML = "*O CPF deve ter no máximo 11 dígitos";
        legenda.classList.add('vermelho')
    } else {
        const numeros = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        let somaParaChaveI = 0;
        let somaParaChaveII = 0;
        
        for(let i = 0; i < cpfLimpo.length - 2; i++) {
            somaParaChaveI += cpfLimpo[i] * numeros[i + 1];
        }
        let chaveI = (somaParaChaveI * 10) % 11;
        if(chaveI == 10) {
            chaveI = 0;
        }
    
        for(let i = 0; i < cpfLimpo.length - 1; i++) {
            somaParaChaveII += cpfLimpo[i] * numeros[i]
        }
        let chaveII = (somaParaChaveII * 10) % 11;
        if(chaveII == 10) {
            chaveII = 0;
        }

        if(chaveI == cpfLimpo[9] && chaveII == cpfLimpo[10]) {
            legenda.innerHTML = "Esse CPF é valido"
            legenda.classList.remove('vermelho')
        } else {
            legenda.innerHTML = "CPF inválido!"
            legenda.classList.add('vermelho')
        }
    }
}