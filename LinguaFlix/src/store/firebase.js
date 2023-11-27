// Import the functions you need from the SDKs you need
import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKIB2UVNClkMIGfP6fKb3m0Mys-2t012E",
  authDomain: "linguaflix-1edb6.firebaseapp.com",
  databaseURL: "https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "linguaflix-1edb6",
  storageBucket: "linguaflix-1edb6.appspot.com",
  messagingSenderId: "482196287384",
  appId: "1:482196287384:web:0722767971994c1ccc45ed",
  measurementId: "G-JZVFV24SVJ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export { EmailAuthProvider, reauthenticateWithCredential, updatePassword };
export { ref, child, push, update };
// export const { setRole } = permissionsSlice.actions;
// export default permissionsSlice.reducer;

export const DB_URL = 'https://linguaflix-1edb6-default-rtdb.europe-west1.firebasedatabase.app';