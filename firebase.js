import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, uploadMediaAsync} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FieldValue } from 'firebase/firestore';



//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2IW1X5jaUNz7sgJqn9kdWh5jTUn8O9xk",
  authDomain: "weatherwear-404302.firebaseapp.com",
  projectId: "weatherwear-404302",
  databaseURL: "https://weatherwear-404302-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "weatherwear-404302.appspot.com",
  messagingSenderId: "138303696988",
  appId: "1:138303696988:web:fefed29f96ad0d3fa6b699",
  measurementId: "G-JY7HTZEXDF"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


const auth = app.auth();
const firestore = getFirestore(app);
const storage = getStorage();

export { auth, firestore, storage, app };

export const uploadMediaAsyn = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `images/${Math.random().toString(36).substring(7)}`);

  try {
    // Upload the file and get the task snapshot, which contains the download URL
    const snapshot = await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const storeMediaInFirestore = async (downloadURL, userId) => {
  // Assuming userId is passed as an argument or retrieved from the authenticated user
  const userCollectionRef = firestore.collection('users').doc(userId).collection('categories');

  try {
    // Add the media document to the user-specific collection
    await userCollectionRef.add({
      imageUrl: downloadURL,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};
