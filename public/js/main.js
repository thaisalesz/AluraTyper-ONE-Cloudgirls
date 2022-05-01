let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");

$(document).ready(function () {
    atualizaTamFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
})

function atualizaTamFrase() {
    let frase = $(".frase").text(); //pega conteudo do <p>, ou seja, toda a frase
    let numPalavras = frase.split(" ").length; //separa a frase em um array e pega o numero de palavras
    let tamanhoFrase = $("#tamanho-frase"); //pega o numero de contagem de palavras dentro da tag span
    tamanhoFrase.text(numPalavras); //altera o numero mostrado na pagina pelo numero de palavra da frase
}

function atualizaTimerInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input", function () {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        let qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    })
}

function inicializaCronometro() {

    campo.one("focus", function () {
        let tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true);
        let cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000)
    })
}

function finalizaJogo() {
    campo.attr("disabled", true)
    $("#botao-reiniciar").attr("disabled", false);
    campo.addClass("campo-desativado")
    inserePlacar();
}


function inicializaMarcadores() {

    campo.on("input", function () {
        let frase = $(".frase").text()
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false)
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

