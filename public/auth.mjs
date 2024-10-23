import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup,GithubAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyA7JfGgYHLwlFYmyLzhHKmg4ENNxKIig3g",
  authDomain: "g-auth-dashboardly.firebaseapp.com",
  projectId: "g-auth-dashboardly",
  storageBucket: "g-auth-dashboardly.appspot.com",
  messagingSenderId: "433966242942",
  appId: "1:433966242942:web:c801c1865e843b43284c2f",
  measurementId: "G-K21H114NRM"
};
let isSigningIn = false;
const app = initializeApp(firebaseConfig);
const auth = new getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const gprovider = new GithubAuthProvider();
const g_auth = document.getElementById('g-auth');
g_auth.addEventListener('click' , function(){
  isSigningIn = true;
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const Data = {
        email : user.email,
        name : user.displayName,
      }
        mongo(Data);   
    }).then(() => {
      isSigningIn = false; // Reset the flag after successful sign-in and mongo call
  }).catch((error) => {
      isSigningIn = false;
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})
const g_git = document.getElementById('g-git');
g_git.addEventListener('click',()=>{ 
    isSigningIn = true;
    signInWithPopup(auth,gprovider)
    .then((result)=>{
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const Data = {
          email : user.email,
          name : user.displayName,
        }
        mongo(Data);
      }).then(() => {
        isSigningIn = false; // Reset the flag after successful sign-in and mongo call
    }).catch((error) => {
      isSigningIn = false; // Reset the flag after successful sign-in and mongo call
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } )
    onAuthStateChanged(auth, (user) => {
      if (user&& !isSigningIn) { // Only redirect if not in the middle of signing in
          window.location.href = '../Already_logged_in';
      } else if (!user) {
          g_auth.style.display = 'block';
      }
  });
      function mongo(Data) {
        async function makeaconnection(Data) {
            try {
                const response = await fetch('/api/users', { // Use await here
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Data })
                });
                const data = await response.json();
            } catch (error) {
                alert(error);
                alert("You are not connected to the internet");
            }
        }
    
        async function handleMongo(Data) {
            await makeaconnection(Data); 
            window.location.href = '../user'; 
        }
    
        handleMongo(Data); 
    }
    