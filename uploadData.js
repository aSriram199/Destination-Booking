import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApvH5DEH3bU1QUKpKiGyLZ1ODOW4hxbmc",
  authDomain: "cs-task-41a7d.firebaseapp.com",
  projectId: "cs-task-41a7d",
  storageBucket: "cs-task-41a7d.firebasestorage.app",
  messagingSenderId: "167420865856",
  appId: "1:167420865856:web:28ab0fa79363e5644f5ea5",
  measurementId: "G-N0J6L6ZW9M"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const destinationsData = [
// data can be uploaded from here type the data here and use node uploadData.js
];


async function uploadDataToFirestore() {
  try {
    console.log("Starting data upload to Firestore...");
    
    const destinationsCollection = collection(db, "destinations");
    
    for (const destination of destinationsData) {
      await setDoc(doc(destinationsCollection, destination.id.toString()), {
        ...destination,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Uploaded: ${destination.name}`);
    }
    
    console.log("All destinations uploaded successfully!");
    console.log(`Total destinations uploaded: ${destinationsData.length}`);
    
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}


uploadDataToFirestore();
