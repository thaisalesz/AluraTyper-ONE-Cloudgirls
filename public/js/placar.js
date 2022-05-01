$("#botao-placar").click(mostraPlacar)
$("#botao-sync").click(sincronizaPlacar)

function inserePlacar() {
    let corpoTabela = $(".placar").find("tbody");
    let usuario = $("#usuarios").val();
    let contadorPalavras = $("#contador-palavras").text();

    let linha = novaLinha(usuario, contadorPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function novaLinha(usuario, contadorPalavras) {
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(contadorPalavras)
    let colunaRemover = $("<td>");
    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    let linha = $(this).parent().parent()
    linha.fadeOut();
    setTimeout(function () {
        linha.remove();
    }, 1000)
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(500);
}

function scrollPlacar() {
    let posicaoPlacar = $(".placar").offset().top;
    $("html,body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function sincronizaPlacar() {
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function () {
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text()

        let score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score);
    });

    let dados = {
        placar: placar
    }
    $.post("http://localhost:3000/placar", dados, function () {
        console.log("salvou")
        $(".tooltip").tooltipster("open"); 
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close"); 
        })
        
    })
}

function atualizaPlacar() {

    $.get("http://localhost:3000/placar", function (data) {
        $(data).each(function () {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}
