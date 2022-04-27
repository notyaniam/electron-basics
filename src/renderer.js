const titleBtn = document.getElementById("btn"),
  titleInput = document.getElementById("title"),
  mtyBtn = document.getElementById("mtyBtn"),
  mtyResults = document.getElementById("multiply"),
  infoUl = document.getElementById("sys-content"),
  calcUl = document.getElementById("calc-content"),
  infoBtn = document.getElementById("info-btn");

// handle title change
titleBtn.addEventListener("click", function () {
  window.electronAPI.setTitle(titleInput.value);
});

// handle multiplication
mtyBtn.addEventListener("click", async function () {
  const results = await window.electronAPI.getResults(12);
  mtyResults.innerText = results;
});

// update ul with system info
infoBtn.addEventListener("click", async function () {
  const sysInfo = await window.electronAPI.getSystemInfo();
  if (sysInfo.length) {
    infoUl.innerHTML = "";
    sysInfo.map((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.title}: </span><span>${item.value}</span> `;
      infoUl.appendChild(li);
    });
  }
});

window.electronAPI.calcResults((event, item) => {
  const calcLi = document.createElement("li");
  calcLi.innerHTML = `<span>First Number: ${item.value1} * Second Number: ${item.value2} = ${item.result}`;
  calcLi.style.color = "green";
  calcUl.appendChild(calcLi);
});
