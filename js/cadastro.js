const inputFonte = document.querySelector("#input-fonte");
const inputNumber = document.querySelector("#input-valor");
const lista = document.querySelector("ul");
const form = document.querySelector("form");
const saldo = document.querySelector("h1");
const toggle = document.querySelector("#toggle");
const receitaValue = document.querySelector("#receitaValue");
const despesaValue = document.querySelector("#despesaValue");
const textoToggle = document.querySelector("#span-receita-toggle");
const caixaRegistrosVazia = document.querySelector("#caixa-registros");

let receita = 0;
let despesa = 0;
let checked = false;
let registro = JSON.parse(localStorage.getItem('record') || '[]');
let array = [];

if (localStorage.length > 0) {
  let i = 0;

  if (registro.length > 0){
    while(i < registro.length){
      array.push(registro[i]);
      array.push(registro[i+1]);

      addElement(array);

      i+=2;
    }
  }
  displayValue();
}

function changeValue(valor) {
  if (localStorage.length > 0) {
    receita = Number(localStorage.getItem("valorReceita"));
    despesa = Number(localStorage.getItem("valorDespesa"));
  }

  if (checked === true) {
    despesa  -= valor;
  } else {
    receita += valor;
  }

  let valorDoSaldo = receita + despesa;

  localStorage.setItem("valorReceita", receita);
  localStorage.setItem("valorDespesa", despesa);
  localStorage.setItem("valorSaldo", valorDoSaldo);

  displayValue();
}

toggle.addEventListener("change", () => {
  if (checked === false) {
    checked = true;
    textoToggle.textContent = "Despesa";
  } else {
    checked = false;
    textoToggle.textContent = "Receita";
  }

});

function displayValue() {
  saldo.textContent = `R$ ${Number(localStorage.getItem("valorSaldo")).toFixed(2)}`;
  receitaValue.textContent = `R$ ${Number(localStorage.getItem("valorReceita")).toFixed(2)}`;
  despesaValue.textContent = `R$ ${Number(localStorage.getItem("valorDespesa")).toFixed(2)}`;

}

function addElement(registro) {
  const li = document.createElement("li");
  const spanFonte = document.createElement("span");
  const spanValor = document.createElement("span");

  let count = registro.length;

  spanFonte.textContent = registro[count - 2];
  spanValor.textContent = Number(registro[count - 1]).toFixed(2);

  if (Math.sign(registro[count - 1]) === 1){
    spanValor.style.color = "var(--verde-fonte)";
  }else{
    spanValor.style.color = "var(--vermelho-fonte)";
  }

  li.appendChild(spanFonte);
  li.appendChild(spanValor);

  lista.appendChild(li);

  caixaRegistrosVazia.style.display = "none";
}

function saveRecord (nomeFonte, valorDigitado){
  
  if (checked === true){
    registro.push(nomeFonte, Number(valorDigitado) * -1);
  }else{
    registro.push(nomeFonte, valorDigitado);
  }
  console.log(registro);

  localStorage.setItem('record', JSON.stringify(registro));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let nomeFonte = inputFonte.value;
  let valorDigitado = inputNumber.value;
 
  if (!nomeFonte && !valorDigitado) {
    alert("Insira uma Fonte e um Valor");
  } else if (!nomeFonte) {
    alert("Insira uma Fonte");
  } else if (!valorDigitado) {
    alert("Insira um valor");
  }


  if (checked === false){
    if (Math.sign(valorDigitado) === -1){
      alert(
        `Insira apenas o valor, caso deseje cadastrar uma despesa, 
        marque o botão ao lado e informe apenas os valores.`
        );
    }

    if (nomeFonte && Math.sign(valorDigitado) === 1) {
      changeValue(Number(valorDigitado)); 
      saveRecord(nomeFonte, valorDigitado);
      addElement(registro);
    }

  }else{
    if (nomeFonte && valorDigitado) {
      if (Math.sign(valorDigitado) === -1){
        valorDigitado *= -1;
      }
      changeValue(Number(valorDigitado)); 
      saveRecord(nomeFonte, valorDigitado);
      addElement(registro);
    }
  }


  inputNumber.value = "";
  inputFonte.value = "";
});
