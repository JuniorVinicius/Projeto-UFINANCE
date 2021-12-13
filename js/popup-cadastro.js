const botao = document.querySelector('#botao-cadastro');
const popup = document.querySelector('.popup-cadastro');
const botao_fechar = document.querySelector('#btn-fechar');


botao.addEventListener('click', () => {
    popup.classList.add('ativado');
    botao.style.display = 'none';
})

botao_fechar.addEventListener('click', () => {
    popup.classList.remove('ativado');
    botao.style.display = 'block';
})