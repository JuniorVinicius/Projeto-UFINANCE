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

if (localStorage.length > 0) {
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

function addElement(fonte, valor) {
  const li = document.createElement("li");
  const spanFonte = document.createElement("span");
  const spanValor = document.createElement("span");

  spanFonte.textContent = fonte;
  spanValor.textContent = valor.toFixed(2);

  li.appendChild(spanFonte);
  li.appendChild(spanValor);

  lista.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let nomeFonte = inputFonte.value;
  let valorDigitado = inputNumber.value;

  changeValue(Number(valorDigitado));

  if (checked === true){
    addElement(nomeFonte, -Number(valorDigitado));
  }else{
    addElement(nomeFonte, Number(valorDigitado));
  }

  inputNumber.value = "";
  inputFonte.value = "";
});
