const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
const form3 = document.querySelector("#form3");

form1.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputVar = document.querySelector("#variavel");
  const inputStr = document.querySelector("#string");
  const box1 = document.querySelector("#box1");

  const resposta1 = document.querySelector("#resposta1");

  if (inputVar.value === "hello" && inputStr.value === "Hello World!") {
    resposta1.textContent = "Resposta Correta!";
    box1.style.backgroundColor = "green";
  } else {
    resposta1.textContent = "Resposta Errada!";
    box1.style.backgroundColor = "red";
  }
});

form2.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputSum = document.querySelector("#soma");
  const inputNumber = document.querySelector("#numero");
  const box2 = document.querySelector("#box2");

  const resposta2 = document.querySelector("#resposta2");

  if (inputSum.value === "somar" &&
    (inputNumber.value == "10 + 5" || inputNumber.value == "10+5")){
    resposta2.textContent = "Resposta Correta!";
    box2.style.backgroundColor = "green";
  } else {
    resposta2.textContent = "Resposta Errada!";
    box2.style.backgroundColor = "red";
  }

  let resultado = 10;

  console.log("resultado = " + resultado)
});

form3.addEventListener("submit", (event) => {
  event.preventDefault();

  const varConc = document.querySelector("#varConc");
  const box3 = document.querySelector("#box3");

  const resposta3 = document.querySelector("#resposta3");

  if (varConc.value === "+ soma" || varConc.value === "+soma") {
    resposta3.textContent = "Resposta Correta!";
    box3.style.backgroundColor = "green";
  } else {
    resposta3.textContent = "Resposta Errada!";
    box3.style.backgroundColor = "red";
  }
});
