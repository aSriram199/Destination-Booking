import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import firebaseConfig from "./src/utils/config.js";


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
