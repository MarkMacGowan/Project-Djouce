const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Konrad Start Creates a new window for newBudgetForm
function createNewBudgetFormWindow() {
    const newWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    newWindow.loadFile(path.join(__dirname, 'newBudgetForm.html'));

    newWindow.on('closed', () => {
        newWindow = null;
    });
}

// Listen for the 'openNewBudgetForm' ipc
ipcMain.on('openNewBudgetForm', (event, arg) => {
    createNewBudgetFormWindow();
});

// Output data from newBudgetForm.html
ipcMain.on('submitBudgetFormData', (event, formData) => {
    console.log('Received form data in main process:', formData);
});
// Konrad End
