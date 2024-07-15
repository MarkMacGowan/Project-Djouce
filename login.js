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
// Initialize variables 
const auth = firebase.auth()
const database = firebase.database()

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