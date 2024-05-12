import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";
//import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyABi-ROP9jjrQzZ0zx6SNdcpdlZ1iTDBhA",
    authDomain: "matutor-db-9424d.firebaseapp.com",
    projectId: "matutor-db-9424d",
    storageBucket: "matutor-db-9424d.appspot.com",
    messagingSenderId: "65458218474",
    appId: "1:65458218474:web:8331f19e42afa21689fe93",
    storageBucket: "gs://matutor-db-9424d.appspot.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage();
const storageRef = ref(storage);

export { auth };
export { db };
export { storage };