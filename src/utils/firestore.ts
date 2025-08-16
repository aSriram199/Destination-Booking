import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import firebaseConfig from './config';
import type { Destination } from "@/types";

// Define the Destination interface


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch destinations from Firestore
export const getDestinationsFromFirestore = async (): Promise<Destination[]> => {
  try {
    const destinationsCollection = collection(db, "destinations");
    const snapshot = await getDocs(destinationsCollection);
    
    const destinations: Destination[] = [];
    snapshot.forEach((doc) => {
      destinations.push({ id: doc.id, ...doc.data() } as Destination);
    });
    
    return destinations;
    console.log(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};

// Function to get a single destination by ID
export const getDestinationById = async (id: string): Promise<Destination | null> => {
  try {
    const destinationsCollection = collection(db, "destinations");
    const docRef = doc(destinationsCollection, id);
    const docSnap = await getDoc(docRef); // Use getDoc instead of getDocs
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Destination;
    } else {
      console.log("No such destination!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
};

// Add a booking to Firestore
export const addBookingToFirestore = async (data: any) => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const docRef = await addDoc(bookingsCollection, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

// Get all bookings from Firestore
export const getBookingsFromFirestore = async () => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const snapshot = await getDocs(bookingsCollection);
    const bookings: any[] = [];
    snapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Delete a booking from Firestore
export const deleteBookingFromFirestore = async (id: string) => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const docRef = doc(bookingsCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export { db };
export type { Destination };
