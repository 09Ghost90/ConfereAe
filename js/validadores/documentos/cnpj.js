export function validaCnpj(valor) {
    // Pesos para multiplicação do CNPJ
    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    let digito1 = 0;
    let digito2 = 0;
    let resto = 0;

    const cnpj = String(valor).replace(/\D/g, '');

    // Validação se o CPNJ tem 14 de comprimento.
    if (cnpj.length !== 14) {
        return { status: 'Inválido', motivo: 'O CNPJ precisa ter 14 dígitos.'};
    }

    // Validar se CNPJ tem dígitos repetidos
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return { status: 'Inválido', motivo: 'CNPJ com todos os dígitos iguais.' };
    }
    
    try {
        // Calcular primeiro dígito
        for (let i = 0; i < 12; i++) {
            soma += Number(cnpj[i] * pesos1[i])
        }

        resto = soma % 11;
        digito1 = resto < 2 ? 0 : 11 - resto;

        // Calculando segundo dígito
        soma = 0;
        
        for (let i = 0; i < 13; i++) {
            soma += Number(cnpj[i] * pesos2[i]);
        }

        resto = soma % 11;
        digito2 = resto < 2 ? 0 : 11 - resto;

        // Comparar os dígitos calculados
        if (
            digito1 === Number(cnpj[12]) && digito2 === Number(cnpj[13])
        ) {
            return { status: 'Válido', motivo: 'CNPJ válido matematicamente.' };
        } else {
            return { status: 'Inválido', motivo: 'CNPJ não é válido matematicamente.'
            };
        }
    } catch (erro) {
        return {
            status: 'Erro', motivo: 'Não foi possível validar CNPJ, erro interno do Servidor.'
        };
    };
}
