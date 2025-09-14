import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

// Utility functions for handling Firebase connection state
export const enableFirestoreNetwork = async () => {
	try {
		await enableNetwork(firestore);
		console.log("Firestore network enabled");
	} catch (error) {
		console.warn("Failed to enable Firestore network:", error);
	}
};

export const disableFirestoreNetwork = async () => {
	try {
		await disableNetwork(firestore);
		console.log("Firestore network disabled");
	} catch (error) {
		console.warn("Failed to disable Firestore network:", error);
	}
};

// Check if we're in development and enable network on initialization
if (typeof window !== 'undefined') {
	// Only run in browser environment
	enableFirestoreNetwork().catch(console.warn);
}

export { auth, firestore, app };
