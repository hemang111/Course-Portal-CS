import {signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
export function handleAuthStateChange(auth, mongo_fetch) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.querySelector('#profile_img').setAttribute('src', user.photoURL);
        if (user.email == null) {
          mongo_fetch(user.reloadUserInfo.providerUserInfo[0]);
        } else {
          mongo_fetch(user);
        }
      } else {
        window.location.href = '../noaccess'; // Redirect to 'noaccess' if no user is signed in
      }
    });
  }
  export function setupLogoutButton(auth) {
    document.getElementById('logout').addEventListener('click',()=>{
      signOutUser(auth);
    })
  }
  
  // Function to sign out the user
  function signOutUser(auth) {
    signOut(auth).then(() => {
      window.location.href = '../'; // Redirect to home after logout
    }).catch((error) => {
      console.error(error); // Handle errors if logout fails
    });
  }