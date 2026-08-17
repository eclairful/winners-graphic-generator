"use strict";

//// Imports ////

// NPM imports
const { app, BrowserWindow, Menu } = require("electron");

// Internal imports
const Constants = require("../lib/const.json");
const Package = require("../package.json");

//// Global ////

// Constants //

const APPNAME = Package.name;
const VERSION = Package.version;
const DEBUG = Constants.debug;

const START_MSG = `${APPNAME} (version ${VERSION})`;

const HTML_PATH = "res/html/index.html";

/** @type {Electron.BrowserWindowConstructorOptions} */
const WINDOW_OPTIONS = { width: 800, height: 600 };

// Functions //

/**
 * Creates & applies configurations to the initial browser window,
 * then loads the initial html file
 */
function createWindow() {
  // create & configure window object
  const win = new BrowserWindow(WINDOW_OPTIONS);
  win.menuBarVisible = false; // menubar is fugly I hate it

  // Replace menu bar with context menu
  const editContextMenuTemplate = [
    { role: "copy" },
    { role: "cut" },
    { role: "paste" },
    { role: "selectAll" },
  ];
  if (DEBUG) editContextMenuTemplate.push({ role: "toggleDevTools" }); // add devtools if debug mode
  const editContextMenu = Menu.buildFromTemplate(editContextMenuTemplate);
  const devContextMenu = Menu.buildFromTemplate([{ role: "toggleDevTools" }]);

  win.webContents.on("context-menu", (_, params) => {
    if (params.isEditable) editContextMenu.popup();
    else if (DEBUG) devContextMenu.popup();
  });

  // load browser window with the initial HTML path
  win.loadFile(HTML_PATH);
}

// Initialize //

// initialize after load completed
app.whenReady().then(() => {
  console.log(START_MSG);
  createWindow(); // start browser window after everything has loaded

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// make sure electron process closes after windows are all gone
app.on("window-all-closed", () => {
  app.quit();
});
