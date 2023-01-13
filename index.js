const displayOne = document.querySelector(".screen1");
const displayTwo = document.querySelector(".screen2");
const tempResult = document.querySelector(".temp-result");
const numbersOnly = document.querySelectorAll("[data-number]");
const operatorsOnly = document.querySelectorAll("[data-operation]");
const equalMark = document.querySelector("[data-equals]");
const clearAll = document.querySelector(".item_ac");
const clearLast = document.querySelector(".item_c");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

for (let number of numbersOnly) {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    displayTwo.innerText = dis2Num;
  });
}

for (let operators of operatorsOnly) {
  operators.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    console.log("operationName", e.target.textContent);
    console.log("operationName", e.target.innerText);
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
}

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  displayOne.innerText = dis1Num;
  displayTwo.innerText = "";
  dis2Num = "";
  tempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) * (parseFloat(dis2Num) / 100);
    console.log("%", result);
  }
}
// operation();

equalMark.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayTwo.innerText = result;
  tempResult.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAll.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  displayOne.innerText = "0";
  displayTwo.innerText = "0";
  result = "";
  tempResult.innerText = "0";
});

clearLast.addEventListener("click", () => {
  displayTwo.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    console.log("enter");
    clickEqual();
  }
});

function clickButtonEl(key) {
  for (let button of numbersOnly) {
    if (button.innerText === key) button.click();
  }
}

function clickOperation(key) {
  for (let operation of operatorsOnly) {
    if (operation.innerText === key) operation.click();
  }
}

function clickEqual() {
  equalMark.click();
}
