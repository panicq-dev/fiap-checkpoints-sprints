function criarSlideshow(config) {
    var imagens = config.imagens;
    var atual = 0;

    var img = document.getElementById(config.imgId);
    var pontos = document.getElementById(config.pontosId);

    if (!img || !pontos) return;

    // cria os pontos
    for (let i = 0; i < imagens.length; i++) {
        var ponto = document.createElement('span');

        ponto.setAttribute('data-index', i);
        pontos.appendChild(ponto);

        ponto.addEventListener('click', function () {
            atual = parseInt(this.getAttribute('data-index'));
            trocarSlide();
        });
    }

    function trocarSlide() {
        img.src = imagens[atual];

        var todos = pontos.querySelectorAll('span');

        todos.forEach(p => {
            p.style.background = '#aaa';
        });

        todos[atual].style.background = '#e8ff47';
    }

    document.getElementById(config.btnAnterior)
        ?.addEventListener('click', function () {

        atual = atual === 0
            ? imagens.length - 1
            : atual - 1;

        trocarSlide();
    });

    document.getElementById(config.btnProximo)
        ?.addEventListener('click', function () {

        atual = atual === imagens.length - 1
            ? 0
            : atual + 1;

        trocarSlide();
    });

    setInterval(() => {
        atual = atual === imagens.length - 1
            ? 0
            : atual + 1;

        trocarSlide();
    }, 4000);

    trocarSlide();
}


// Pitch
criarSlideshow({
    imagens: [
        './../img/Pitch_ATOM/slide1.jpg',
        './../img/Pitch_ATOM/slide2.jpg',
        './../img/Pitch_ATOM/slide3.jpg',
        './../img/Pitch_ATOM/slide4.jpg',
        './../img/Pitch_ATOM/slide5.jpg',
        './../img/Pitch_ATOM/slide6.jpg',
        './../img/Pitch_ATOM/slide7.jpg',
        './../img/Pitch_ATOM/slide8.jpg',
        './../img/Pitch_ATOM/slide9.jpg',
        './../img/Pitch_ATOM/slide10.jpg'
    ],

    imgId: 'slide-pitch',
    pontosId: 'pontos-pitch',
    btnAnterior: 'btn-anterior-pitch',
    btnProximo: 'btn-proximo-pitch'
});


// Screenshots
criarSlideshow({
    imagens: [
        './../img/notez-conteudos.png',
        './../img/notez-biblioteca.png',
        './../img/notez-hub.png',
        './../img/notez-camera.png'
    ],

    imgId: 'slide-screenshots',
    pontosId: 'pontos-screenshots',
    btnAnterior: 'btn-anterior-screenshots',
    btnProximo: 'btn-proximo-screenshots'
});
