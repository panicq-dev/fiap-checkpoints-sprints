
var nome = document.querySelectorAll('.input-inscricao')[0];
var email = document.querySelectorAll('.input-inscricao')[1];
var senha = document.querySelectorAll('.input-inscricao')[2];
var confirma = document.querySelectorAll('.input-inscricao')[3];
var btn = document.querySelector('.btn-inscricao');
var olhoSenha = document.getElementById('olho-senha');
var olhoConfirma = document.getElementById('olho-confirma');

senha.style.paddingRight = '40px';
confirma.style.paddingRight = '40px';

olhoSenha.addEventListener('click', function() {
  if (senha.type == 'password') {
    senha.type = 'text';
    olhoSenha.style.opacity = '1';
  } else {
    senha.type = 'password';
    olhoSenha.style.opacity = '0.4';
  }
});

olhoConfirma.addEventListener('click', function() {
  if (confirma.type == 'password') {
    confirma.type = 'text';
    olhoConfirma.style.opacity = '1';
  } else {
    confirma.type = 'password';
    olhoConfirma.style.opacity = '0.4';
  }
});

// mensagem de erro
var erro = document.createElement('span');
erro.style.cssText = 'font-size:12px; color:#e24b4a; display:none;';
btn.parentNode.insertBefore(erro, btn);

btn.addEventListener('click', function() {
  erro.style.display = 'none';
  email.style.borderColor = '';
  senha.style.borderColor = '';
  confirma.style.borderColor = '';
  nome.style.borderColor = '';

  if (nome.value == '') {
    erro.textContent = 'Informe seu nome.';
    erro.style.display = 'block';
    nome.style.borderColor = '#e24b4a';
    return;
  }

  if (email.value == '') {
    erro.textContent = 'Informe seu e-mail.';
    erro.style.display = 'block';
    email.style.borderColor = '#e24b4a';
    return;
  }

  if (email.value.indexOf('@') == -1) {
    erro.textContent = 'E-mail inválido.';
    erro.style.display = 'block';
    email.style.borderColor = '#e24b4a';
    return;
  }

  if (senha.value.length < 6) {
    erro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    erro.style.display = 'block';
    senha.style.borderColor = '#e24b4a';
    return;
  }

  if (senha.value != confirma.value) {
    erro.textContent = 'As senhas não coincidem.';
    erro.style.display = 'block';
    confirma.style.borderColor = '#e24b4a';
    return;
  }

  btn.textContent = '✓ Inscrito!';
  btn.style.background = '#3b6d11';
  btn.disabled = true;
  localStorage.setItem('betaTesterName', nome.value);
  alert('Obrigado por se inscrever! Em breve você receberá novidades no seu e-mail.');
  setTimeout(function() {
    window.location.href = './../../index.html';
  }, 2500);
});