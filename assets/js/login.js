


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";


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


// registering user inputs
// this is a self invoking function
(() => {
    const submit = document.getElementById('submit');

    if (submit) {
        submit.addEventListener("click", (event) => {

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submit = document.getElementById('submit');
            const loadingBtn = document.getElementById('loadingBtn');

            if (!email) {
                alert("Please enter your Email address.");
                return;
            }
        
            event.preventDefault()
            signInWithEmailAndPassword(auth, email, password)
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
                if (errorCode === 'auth/invalid-credential') {
                    alert("Incorrect Credentials. Please try again.");
                } else {
                    alert(`${errorMessage} (${errorCode})`);
                }
                // ..
            });
        
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



    // reset password after forgetting
    
    const forgotpassword = document.getElementById('forgotpassword');
    
    if (forgotpassword) {
        forgotpassword.addEventListener('click', (e) => {

            const useremail = document.getElementById('useremail').value.trim();
            e.preventDefault();

            if (!useremail) {
                alert("Please enter your email address.");
                return;
            }

            sendPasswordResetEmail(auth, useremail).then(() => {
                // Password reset email sent!
                // ..
                alert("Password Reset Email sent to your email.")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage)
            });
        })
    }

    

})()



