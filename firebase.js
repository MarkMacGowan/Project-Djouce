// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEkcImAAty4_JzMDfT9tlH0lM3E5V_qmI",
    authDomain: "project-djouce.firebaseapp.com",
    databaseURL: "https://project-djouce-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-djouce",
    storageBucket: "project-djouce.appspot.com",
    messagingSenderId: "411335950540",
    appId: "1:411335950540:web:2016d50b16eb3a3cde0269"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
const database = firebase.database()
const auth = firebase.auth()

// Set up our register function
function register() {
    // Get all input fields
    email = document.getElementById('register_email').value
    password = document.getElementById('register_password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code need to create code here 
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser
            localStorage.setItem('key', user.uid);
            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            alert('User Created!!')
            window.open("projectPageGrid.html"); 

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })


}

// Set up our login function
function login() {

    // Get all our input fields
    email = document.getElementById('login_email').value
    password = document.getElementById('login_password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Wrong Email or Password')
        return
        // Don't continue running the code need to create code here 
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser
            localStorage.setItem('key', user.uid);
            alert(user.uid)
            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)



            alert('User Logged In!!')
            console.log("User Logged In");
            window.open("projectPageGrid.html");
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Password needs to be longer than 6 characters
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function save() {

    var budgetName = document.getElementById('budgetName').value
    var incomeSource = document.getElementById('incomeSource').value 
    var incomeAmount = document.getElementById('incomeAmount').value
    var incomeFrequency = document.getElementById('incomeFrequency').value
    var incomeDate = document.getElementById('incomeDate').value
    var expenseCategory = document.getElementById('expenseCategory').value
    var expenseAmount = document.getElementById('expenseAmount').value
    var expenseFrequency = document.getElementById('expenseFrequency').value
    var expenseDate = document.getElementById('expenseDate').value



    database.ref('users/' + localStorage.getItem('key') + '/' + document.getElementById('budgetName').value).set({
        budgetName: budgetName,
        IncomeSource: incomeSource,
        IncomeAmount: incomeAmount,
        IncomeFrequency: incomeFrequency,
        IncomeDate: incomeDate,
        ExpenseCategory: expenseCategory,
        ExpenseAmount: expenseAmount,
        ExpenseFrequency: expenseFrequency,
        ExpenseDate: expenseDate
    })

    alert('Saved')
}

function get() {

    var user_ref = database.ref('users/' + localStorage.getItem('key') + '/' + document.getElementById('budgetName').value)
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()

        alert(data.budgetIncome)
        alert(key)
        document.getElementById('incomeSource').value 
        document.getElementById('incomeAmount').value
        document.getElementById('incomeFrequency').value
        document.getElementById('incomeDate').value
        document.getElementById('expenseCategory').value
        document.getElementById('expenseAmount').value
        document.getElementById('expenseFrequency').value
        document.getElementById('expenseDate').value

    })

}

function update() {
    var incomeSource = document.getElementById('incomeSource').value 
    var incomeAmount = document.getElementById('incomeAmount').value
    var incomeFrequency = document.getElementById('incomeFrequency').value
    var incomeDate = document.getElementById('incomeDate').value
    var expenseCategory = document.getElementById('expenseCategory').value
    var expenseAmount = document.getElementById('expenseAmount').value
    var expenseFrequency = document.getElementById('expenseFrequency').value
    var expenseDate = document.getElementById('expenseDate').value

    var updates = {
        IncomeSource: incomeSource,
        IncomeAmount: incomeAmount,
        IncomeFrequency: incomeFrequency,
        IncomeDate: incomeDate,
        ExpenseCategory: expenseCategory,
        ExpenseAmount: expenseAmount,
        ExpenseFrequency: expenseFrequency,
        ExpenseDate: expenseDate
    }

    database.ref('users/' + localStorage.getItem('key') + '/' + document.getElementById('budgetName').value).update(updates)

    alert('updated')
}

function remove() {
    database.ref('users/' + localStorage.getItem('key') + '/' + document.getElementById('budgetName').value).remove()

    alert('deleted')
}