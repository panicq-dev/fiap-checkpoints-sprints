//#region Barra de progresso | Home
const barra = document.getElementById("progresso");

window.addEventListener("scroll", () => {
    // localização do scroll
    const scrollTop = window.scrollY;
    // altura total da página - altura da janela
    const alturaPagina =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    // divisão do quanto foi rolado pela altura total da página
    const porcentagem = (scrollTop / alturaPagina) * 100;

    // aplicando na barra
    barra.style.width = porcentagem + "%";
});
//#endregion

//#region Validador de tela de usuario | Home
// Função com Intersection Observer
const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("fade");
        } else {
            // remove quando não aparecer para o user
            entrada.target.classList.remove("fade");
        }
    });
}, {
    // ativa quando 10% aparecer
    threshold: 0.1
});
// Seleciona todos os elementos com o .animar
const elementosAnimados = document.querySelectorAll(".animar");

// Adiciona o observador em cada elementp
elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
});
//#endregion


document.addEventListener('DOMContentLoaded', () => {
    const betaTesterInfo = document.querySelector('.beta-tester-info');
    const betaTesterElement = document.getElementById('beta-tester-name');

    if (!betaTesterInfo || !betaTesterElement) return;

    const betaTesterName = localStorage.getItem('betaTesterName');

    if (betaTesterName && betaTesterName.trim() !== '') {
        betaTesterElement.textContent = betaTesterName;
        betaTesterInfo.style.display = 'block';
    } else {
        betaTesterInfo.style.display = 'none';
    }
});