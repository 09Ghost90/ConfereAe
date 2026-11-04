
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Primeiro arquivo é selecionado

    if (!file) return;

    const extensao = file.name.split('.').pop().toLowerCase(); // Obtém a extensão do arquivo
    const reader = new FileReader();

    reader.onload = function(e) {
        let registros = [];

        // Verificar a extensão do arquivo
        if (extensao === 'json') registros = lerJSON(e.target.result);
        else if (extensao === 'csv') registros = lerCSV(e.target.result);
        else if (extensao === 'txt') registros = lerTXT(e.target.result);
        else {
            alert('Formato de arquivo não suportado. Por favor, selecione um arquivo JSON, CSV ou TXT.');
        }

        console.table(registros); // Exibe os registros no console em formato de tabela.
    };

    reader.readAsText(file, 'UTF-8'); // Lê o conteúdo do arquivo como texto

    // Ler e converter para JSON

});

function lerJSON(conteudo) {
    const dados = JSON.parse(conteudo); // Converte o conteúdo JSON em objeto JavaScript
    return Array.isArray(dados) ? dados : [dados]; // Retorna um array de registros
}

function lerCSV(conteudo) {

}

function lerTXT(conteudo) {

}