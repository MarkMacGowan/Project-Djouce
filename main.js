console.warn("electron is running...")
const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("index.html")
}
app.whenReady().then(createWindow)

function createFormWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("newBudgetForm.html")
}


