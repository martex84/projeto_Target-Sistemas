function pergunta_3() {
    textoMenorFaturamento = ` - O dia ${calculaFaturamentos()[0].dia} teve o menor faturamento com : ${calculaFaturamentos()[0].valor}`;

    textoMaiorFaturamento = ` - O dia ${calculaFaturamentos()[1].dia} teve o maior faturamento com : ${calculaFaturamentos()[1].valor}`;

    textoMediaFaturamento = ` - A média do faturamento é  ${calculaFaturamentos()[2].media}, cotendo ${calculaFaturamentos()[2].contagemDia} dias que superam a média mensal`

    console.log("\n\n" +
        textoMenorFaturamento + ";\n" +
        textoMaiorFaturamento + ";\n" +
        textoMediaFaturamento + ";\n"
    );
}

function calculaFaturamentos() {
    const dataJson = lerArquivoJson();
    const valorResultado = [];

    valorResultado.push(menorFaturamento(dataJson));

    valorResultado.push(maiorFaturamento(dataJson));

    valorResultado.push(mediaFaturamento(dataJson));

    return valorResultado;
}

function menorFaturamento(objetoJson) {
    var valorAtual = {
        dia: "",
        valor: 0
    };

    const valorMinimo = objetoJson.forEach(valor => {


        if (valor.valor != 0) {
            if (valorAtual.valor === 0) {
                valorAtual.valor = valor.valor;
                valorAtual.dia = valor.dia;
            } else if (valorAtual.valor > valor.valor) {
                valorAtual.valor = valor.valor;
                valorAtual.dia = valor.dia;
            }
        }
    })

    return valorAtual;
}

function maiorFaturamento(objetoJson) {
    var valorAtual = {
        dia: "",
        valor: 0
    };

    const valorMaximo = objetoJson.forEach(valor => {
        if (valor.valor != 0) {
            if (valorAtual.valor === 0) {
                valorAtual.valor = valor.valor;
                valorAtual.dia = valor.dia;
            } else if (valorAtual.valor < valor.valor) {
                valorAtual.valor = valor.valor;
                valorAtual.dia = valor.dia;
            }
        }
    })

    return valorAtual;
}

function mediaFaturamento(objetoJson) {
    var valorAtual = {
        contagemDia: 0,
        media: 0
    }
    var contagemMedia = 0;
    var media = 0;

    objetoJson.forEach(valor => {
        if (valor.valor != 0) {
            contagemMedia++;
            media = media + valor.valor;
        }
    })

    valorAtual.media = media / contagemMedia;

    objetoJson.forEach(valor => {
        if (valor.valor != 0) {
            if (valorAtual.media < valor.valor) valorAtual.contagemDia++;
        }
    })

    return valorAtual;
}

function lerArquivoJson() {
    var path = require('path');
    var fs = require('fs');

    try {
        const data = fs.readFileSync(path.resolve(__dirname, 'dados.json'), "utf-8")
        return JSON.parse(data);
    } catch (err) {
        console.error(err)
    }
}

module.exports = pergunta_3();