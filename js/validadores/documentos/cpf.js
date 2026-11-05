export function validaCpf(valor) {
    let soma = 0;
    let digito1 = 0;
    let digito2 = 0;
    let resto = 0;

    const cpf = String(valor).replace(/\D/g, '');

    if (cpf.length !== 11) {
        return { status: 'Inválido', motivo: 'O CPF precisa ter 11 dígitos.' };
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return { status: 'Inválido', motivo: 'CPF com todos os dígitos iguais.' };
    }

    try {

        // Calcular primeiro dígito
        for (let i = 0; i < 9; i++) {
            soma += Number(cpf[i]) * (10 - i);
        }

        resto = soma % 11;
        digito1 = resto < 2 ? 0 : 11 - resto;

        // Calcular segundo dígito
        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += Number(cpf[i]) * (11 - i);
        }

        resto = soma % 11;
        digito2 = resto < 2 ? 0 : 11 - resto;

        // Comparar os dígitos calculados
        if (digito1 === Number(cpf[9]) && digito2 === Number(cpf[10])) {
            return { status: 'Válido', motivo: 'CPF válido matematicamente.' };
        } else {
            return { status: 'Inválido', motivo: 'Dígitos verificadores incorretos.' };
        }
    } catch (erro) {
        return {status: 'Erro', motivo: 'Não foi possível validar CPF, erro interno do Servidor.'};
    };
}
