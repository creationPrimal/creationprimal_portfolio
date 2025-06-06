import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAQyhuYQdv96BrgA8kTOnV03imie3V-uVo",
authDomain: "creationprimal-cdb9d.firebaseapp.com",
projectId: "creationprimal-cdb9d",
storageBucket: "creationprimal-cdb9d.firebasestorage.app",
messagingSenderId: "207453154136",
appId: "1:207453154136:web:9c287aa360c291cf6b932d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




// This is if user is authenticated

(() => {

    onAuthStateChanged(auth, (user) => {

    const signInBtns = document.querySelectorAll('.btn-sign-in');
    const gameLogInBtns = document.querySelectorAll('.game-login');
    const sourcecodeBtns = document.querySelectorAll('.getsourcecode');
    const logoutBtn = document.getElementById('logoutBtn');


     // User is logged in ******************************************
    if (user) {

        signInBtns.forEach(btn => { btn.style.display = "none"; })
        gameLogInBtns.forEach(btn => { btn.style.display = "none"; })
        sourcecodeBtns.forEach(btn => { btn.style.width = "100%"; })
        logoutBtn.style.display = "flex";

    } 

    // No user is logged in ****************************************
    else {
        
        
    }
    });









    // log out ******************************************************

    if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth)
        .then(() => {
            alert("You have been logged out.");
            // Optionally redirect or update UI
            window.location.reload(); // or window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Error logging out: " + error.message);
        });
    });
    }

})()




