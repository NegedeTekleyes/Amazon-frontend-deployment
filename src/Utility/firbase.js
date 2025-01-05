import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// auth
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHQN9--CJZG_r_fbY9FwGJ4tGZVVfDOTQ',
  authDomain: 'website-21dc9.firebaseapp.com',
  projectId: 'website-21dc9',
  storageBucket: 'website-21dc9.firebasestorage.app',
  messagingSenderId: '424800851030',
  appId: '1:424800851030:web:c5fc94edc784aba31d17f7',
  measurementId: 'G-6L3YHH29ZW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
