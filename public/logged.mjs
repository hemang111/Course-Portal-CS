import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { handleAuthStateChange,setupLogoutButton } from "./functions/auth_user.js";
import { mongo_fetch } from "./functions/mongo.js";
import { fetchFirebaseConfig } from './functions/firebasconfig.js';
async function initFirebase() {
  try {
      const firebaseConfig = await fetchFirebaseConfig();
      const app = initializeApp(firebaseConfig);
      const auth = new getAuth(app);
      auth.languageCode = 'en';
      handleAuthStateChange(auth, mongo_fetch);
      setupLogoutButton(auth);
      // Initialize Firebase
     // firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
      
      // Proceed with your application logic, e.g., setting up authentication
  } catch (error) {
      console.error('Error initializing Firebase:', error);
  }
}

// Call the function to initialize Firebase
initFirebase();
