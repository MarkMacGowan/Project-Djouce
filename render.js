const { ipcRenderer } = require('electron');

document.getElementById('newBudgetButton').addEventListener('click', () => {
    ipcRenderer.send('open-new-budget-form');
});
