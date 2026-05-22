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