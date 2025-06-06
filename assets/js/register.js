


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";


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



// this is a self invoking function
(() => {

    // registering user inputs 
    const submit = document.getElementById('submit');

    if (submit) {
        submit.addEventListener("click", (event) => {

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmpassword = document.getElementById('confirmpassword').value;
            const submit = document.getElementById('submit');
            const loadingBtn = document.getElementById('loadingBtn');
        
            event.preventDefault()

            if (!email) {
                alert("Please enter your Email address.");
                return;
            }

            // confirm password before submitting
            if (password == confirmpassword) {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    //alert("creating Account...")
                    submit.style.display = 'none';
                    loadingBtn.style.display = 'flex';
                    // ...
                    window.location.href = "explore.html"
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/email-already-in-use') {
                        alert("Email already in use! Please Use another email and try again.");
                    } else if (errorCode === 'auth/weak-password') {
                        alert("Password should be at least 6 characters! Please try again");
                    } else {
                        alert(`${errorMessage} (${errorCode})`);
                    }
                    // ..
                });
            } else {
                alert("Passwords Do Not Match, please try again! ")
            }
        
        })
    }



    // registering using google
    
    const submitGoogle = document.getElementById('googleRegister');

    if (submitGoogle) {
        

        submitGoogle.addEventListener('click', (e) => {

            const provider = new GoogleAuthProvider();
            e.preventDefault();
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                window.location.href = "explore.html"
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                alert(errorMessage)
            });
        })
    }


})()



