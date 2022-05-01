$("#botao-troca").click(fraseAleatoria)
$("#botao-frase-id").click(buscaFrase)

function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function () {
        $("#erro").toggle();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);
    })
        .always(function () {
            console.log("entrou")
            $("#spinner").toggle();
        });
}

function trocaFraseAleatoria(data) {
    $("#spinner").toggle();
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamFrase();
    atualizaTimerInicial(data[numeroAleatorio].tempo)
}

function buscaFrase() {
    let frase = $(".frase");

    let fraseId = $("#frase-id").val();
    let dados = { id: fraseId };

    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function () {
            $("#spinner").toggle();
        })
}

function trocaFrase(data) {
    let frase = $(".frase");
    frase.text(data.texto)
    atualizaTamFrase()
    atualizaTimerInicial()
}