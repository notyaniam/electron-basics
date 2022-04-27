const number1 = document.getElementById("number-1"),
  number2 = document.getElementById("number-2"),
  calcForm = document.querySelector("form");

// calculate the digits from calc window
calcForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const value1 = number1.value,
    value2 = number2.value;
  if (!value1 || !value2) {
    const valueDiv = document.createElement("div");
    const valueH4 = document.createElement("h4");
    valueH4.innerText = "All values are required to continue.";
    valueH4.style.color = "red";
    valueDiv.appendChild(valueH4);
    calcForm.appendChild(valueDiv);
    return;
  }

  // send the values for processing
  window.electronAPI.userValues(value1, value2);
});
