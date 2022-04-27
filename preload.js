const { contextBridge, ipcRenderer } = require("electron");

// expose electron apis to the world
contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("title:update", title),
  // sending values to main processor without expecting reply on window
  userValues: (value1, value2) =>
    ipcRenderer.send("calc:request", value1, value2),
  // sending results to the main window from the main processor
  calcResults: (callback) => ipcRenderer.on("calc:results", callback),
  // two-way request - request info from the frontend and away reply
  getResults: (value) => ipcRenderer.invoke("result:multiply", value),
  getSystemInfo: () => ipcRenderer.invoke("get:systeminfo"),
});
