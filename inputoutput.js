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



function addTable() {
    var budgetName = document.getElementById('budgetName').value
    var budgetIncome = document.getElementById('budgetIncome').value
    var budgetExpeses = document.getElementById('budgetExpeses').value
    var budgetInVsOut = budgetIncome - budgetExpeses

    
    var user_data = {
        budgetName: budgetName,
        budgetIncome: budgetIncome,
        budgetExpeses: budgetExpeses,
        budgetInVsOut: budgetInVsOut
    }
    database_ref.child('Budgets/'+ budgetName ).set(user_data)


    alert('added')
}

function save() {
    var budgetName = document.getElementById('budgetName').value
    var budgetIncome = document.getElementById('budgetIncome').value
    var budgetExpeses = document.getElementById('budgetExpeses').value
    var budgetInVsOut = budgetIncome - budgetExpeses

    database.ref('bud/' + budgetName).set({
        budgetName: budgetName,
        budgetIncome: budgetIncome,
        budgetExpeses: budgetExpeses,
        budgetInVsOut: budgetInVsOut
    })

    alert('Saved')
}

function get() {
    var username = document.getElementById('username').value

    var user_ref = database.ref('users/' + username)
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()

        alert(data.email)

    })

}

function update() {
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var updates = {
        email: email,
        password: password
    }

    database.ref('users/' + username).update(updates)

    alert('updated')
}

function remove() {
    var username = document.getElementById('username').value

    database.ref('users/' + username).remove()

    alert('deleted')
}

function getUser(){
    alert('hi')
    userID = userAuth.getCurrentUser().getUid();
    alert( user.uid)
    alert('hi')
}