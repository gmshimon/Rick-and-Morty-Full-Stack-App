
import { initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'


// Your web app’s Firebase configuration, pulled from env
const firebaseConfig = {
  apiKey: "AIzaSyBC9yQ2uwbFGPyYIHv5lUDjpLUEiMn19IE",
  authDomain: "rick-and-montry.firebaseapp.com",
  projectId: "rick-and-montry",
  storageBucket: "rick-and-montry.firebasestorage.app",
  messagingSenderId: "970103929806",
  appId: "1:970103929806:web:252174c8ddcf51f616099f",
  measurementId: "G-X0FEWVT6R7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export default auth;