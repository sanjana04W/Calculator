document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");

  let currentInput = "";
  let operator = "";
  let firstValue = "";

  function updateDisplay(value) {
    display.value = value;
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.innerText;
      const action = btn.dataset.action;

      if (btn.classList.contains("number")) {
        currentInput += value;
        updateDisplay(currentInput);
      } 
      else if (btn.classList.contains("operator")) {
        if (currentInput === "" && firstValue === "") return;
        if (firstValue === "") {
          firstValue = currentInput;
          operator = action;
          currentInput = "";
        } else {
          firstValue = eval(`${firstValue} ${operator} ${currentInput}`);
          operator = action;
          currentInput = "";
          updateDisplay(firstValue);
        }
      } 
      else if (action === "=") {
        if (firstValue !== "" && currentInput !== "") {
          firstValue = eval(`${firstValue} ${operator} ${currentInput}`);
          updateDisplay(firstValue);
          currentInput = "";
          operator = "";
        }
      } 
      else if (action === "clear") {
        currentInput = "";
        firstValue = "";
        operator = "";
        updateDisplay("");
      } 
      else if (action === "back") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
      } 
      else if (action === "+/-") {
        if (currentInput !== "") {
          currentInput = (parseFloat(currentInput) * -1).toString();
          updateDisplay(currentInput);
        }
      }
    });
  });
});
