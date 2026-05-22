var form = document.querySelector('.contato-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  var nome = document.getElementById('nome');
  var email = document.getElementById('email');
  var assunto = document.getElementById('assunto');
  var mensagem = document.getElementById('mensagem');

  nome.style.borderColor = '';
  email.style.borderColor = '';
  assunto.style.borderColor = '';
  mensagem.style.borderColor = '';

  if (nome.value == '') {
    console.error('Erro: nome vazio');
    alert('Informe seu nome.');
    nome.style.borderColor = '#e24b4a';
    nome.focus();
    return;
  }

  if (email.value == '' || email.value.indexOf('@') == -1) {
    console.error('Erro: e-mail inválido');
    alert('Informe um e-mail válido.');
    email.style.borderColor = '#e24b4a';
    email.focus();
    return;
  }

  if (assunto.value == '') {
    console.error('Erro: assunto vazio');
    alert('Informe o assunto.');
    assunto.style.borderColor = '#e24b4a';
    assunto.focus();
    return;
  }

  if (mensagem.value == '') {
    console.error('Erro: mensagem vazia');
    alert('Escreva sua mensagem.');
    mensagem.style.borderColor = '#e24b4a';
    mensagem.focus();
    return;
  }

  console.log('Formulário enviado com sucesso!');
  console.log('Nome: ' + nome.value);
  console.log('E-mail: ' + email.value);
  console.log('Assunto: ' + assunto.value);
  console.log('Mensagem: ' + mensagem.value);

  alert('Mensagem enviada com sucesso!');
  form.reset();
}); 

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