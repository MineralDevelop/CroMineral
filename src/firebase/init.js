import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCA9YIP27_B2m0L7YOSxUmPXxo_mdU6i3A",
  authDomain: "vuetest-6f8f6.firebaseapp.com",
  projectId: "vuetest-6f8f6",
  storageBucket: "vuetest-6f8f6.appspot.com",
  messagingSenderId: "538448945754",
  appId: "1:538448945754:web:40f0b21d603fea0835ee63"
};

initializeApp(firebaseConfig)

const db = getFirestore()
export default db