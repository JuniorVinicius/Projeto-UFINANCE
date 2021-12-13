const inputFonte = document.querySelector("#input-fonte");
const inputNumber = document.querySelector("#input-valor");
const lista = document.querySelector("ul");
const form = document.querySelector("form");
const saldo = document.querySelector("h1");
const toggle = document.querySelector("#toggle");
const receitaValue = document.querySelector("#receitaValue");
const despesaValue = document.querySelector("#despesaValue");
const textoToggle = document.querySelector("#span-receita-toggle");

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
    despesa = despesa - valor;
  } else {
    receita = receita + valor;
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

  li.appendChild(spanFonte);
  li.appendChild(spanValor);

  lista.appendChild(li);
}

function saveRecord (nomeFonte, valorDigitado){
  
  if (checked === true){
    registro.push(nomeFonte, -Number(valorDigitado));
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

  changeValue(Number(valorDigitado)); 
  
  saveRecord(nomeFonte, valorDigitado);

  if (!nomeFonte && !valorDigitado) {
    alert("Insira uma Fonte e um Valor");
  } else if (!nomeFonte) {
    alert("Insira uma Fonte");
  } else if (!valorDigitado) {
    alert("insira um valor");
  }else if (valorDigitado!=Number){
    alert("insira um valor válido");
  }

  if (nomeFonte && valorDigitado == Number) {
    addElement(registro);
  }

  inputNumber.value = "";
  inputFonte.value = "";
});
