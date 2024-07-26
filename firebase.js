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


localStorage.setItem(key)
// Set up our register function
function checkKey() {
    window.location.href = 'inputoutput.html';
   alert(localStorage.getItem('key'))
   
}
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
    var budgetIncome = document.getElementById('budgetIncome').value
    var budgetExpeses = document.getElementById('budgetExpeses').value
    

    database.ref('budgets/' + localStorage.getItem('key') + budgetName ).set({
        budgetName: budgetName,
        budgetIncome: budgetIncome,
        budgetExpeses: budgetExpeses
    })

    alert('Saved')
}

function get() {
    var budgetName = document.getElementById('budgetName').value

    var user_ref = database.ref('budgets/' + budgetName)
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()

        alert(data.budgetIncome)
        alert(key)

    })

}

function update() {
    var budgetName = document.getElementById('budgetName').value
    var budgetIncome = document.getElementById('budgetIncome').value
    var budgetExpeses = document.getElementById('budgetExpeses').value

    var updates = {
        budgetIncome: budgetIncome,
        budgetExpeses: budgetExpeses
    }

    database.ref('budgets/' + budgetName).update(updates)

    alert('updated')
}

function remove() {
    var budgetName = document.getElementById('budgetName').value

    database.ref('budgets/' + budgetName).remove()

    alert('deleted')
}