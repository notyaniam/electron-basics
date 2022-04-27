const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { getSysInfo, multiplyValues } = require("./utils/appFunctions");

let calculateWindow;

// create a custom menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Calculate",
        accelerator: process.platform === "darwin" ? "Command+G" : "Ctrl+G",
        click() {
          createCalculateWindow();
        },
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

// function to create a new window
function createWindow() {
  // initialize a new window
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // initialize ipc main listener on renderer object items
  ipcMain.on("title:update", updateTitle);
  ipcMain.handle("result:multiply", calculateResult);
  ipcMain.handle("get:systeminfo", getSysInfo);
  // listen to request for calculation request
  ipcMain.on("calc:request", (e, value1, value2) => {
    // do the calculation
    const results = multiplyValues(e, value1, value2);
    // send back the results in web contents
    mainWindow.webContents.send("calc:results", results);
    calculateWindow.close();
  });

  // load index file
  mainWindow.loadFile(path.join(__dirname, "src", "index.html"));

  // close all children windows on close
  mainWindow.on("closed", () => app.quit());

  // add custom menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function createCalculateWindow() {
  // initialize an instance
  calculateWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // loading the html file
  calculateWindow.loadFile(path.join(__dirname, "src", "calculate.html"));

  // clean up memory on close
  calculateWindow.on("close", () => (calculateWindow = null));
}

// function to handle new ipc title request
function updateTitle(event, title) {
  // get DOM webcontents from the event
  const webContents = event.sender;
  // initialize a variable with the DOM content
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
  win.set;
}

// function to calculate multiplication
function calculateResult(event, value) {
  return 2 * Number(value);
}

// initializing the window
app.on("ready", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// add dev tools if in development mode
if (process.env.NODE_ENV !== "production")
  mainMenuTemplate.push({
    label: "DevTools",
    submenu: [
      { role: "reload" },
      {
        label: "Developer Tools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
