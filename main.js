console.warn("electron is running...");
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false 
        }
    });
    win.loadFile('index.html');
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


function toggleForm() {
    var form = document.getElementById("budgetForm");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
// for the inputs to be able to be used as variables Konrad

function handleSubmit(event) {
    event.preventDefault(); 

    // User Information
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;

    // Income Details
    var incomeSource = document.getElementById('incomeSource').value;
    var incomeAmount = document.getElementById('incomeAmount').value;
    var incomeFrequency = document.getElementById('incomeFrequency').value;
    var incomeDate = document.getElementById('incomeDate').value;

    // Expenses
    var expenseCategory = document.getElementById('expenseCategory').value;
    var expenseAmount = document.getElementById('expenseAmount').value;
    var expenseFrequency = document.getElementById('expenseFrequency').value;
    var expenseDate = document.getElementById('expenseDate').value;
    var paymentMethod = document.getElementById('paymentMethod').value;

    // variables
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Income Source:", incomeSource);
    console.log("Income Amount:", incomeAmount);
    console.log("Income Frequency:", incomeFrequency);
    console.log("Income Date:", incomeDate);
    console.log("Expense Category:", expenseCategory);
    console.log("Expense Amount:", expenseAmount);
    console.log("Expense Frequency:", expenseFrequency);
    console.log("Expense Date:", expenseDate);
    console.log("Payment Method:", paymentMethod);

}
