import { doc, setDoc, getDoc, updateDoc, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

/**
 * Ensures a user document exists in Firestore before performing operations on it.
 * Creates the document if it doesn't exist, then applies the update.
 */
export async function ensureUserDocumentExists(
  userId: string, 
  updateData: DocumentData,
  userEmail?: string | null
): Promise<void> {
  const userRef = doc(firestore, 'users', userId);
  
  try {
    // First try to update the document
    await updateDoc(userRef, updateData);
  } catch (error: any) {
    // If the document doesn't exist, create it first
    if (error.code === 'not-found') {
      console.log('User document not found, creating new one...');
      
      // Create the user document with default values
      const defaultUserData = {
        uid: userId,
        email: userEmail || null,
        displayName: userEmail?.split('@')[0] || 'User',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      
      // Merge the default data with the update data
      const mergedData = { ...defaultUserData, ...updateData };
      
      // Create the document
      await setDoc(userRef, mergedData);
      console.log('✅ User document created successfully');
    } else {
      // If it's a different error, re-throw it
      throw error;
    }
  }
}

/**
 * Safe wrapper for updating user documents with automatic creation
 */
export async function safeUpdateUserDocument(
  userId: string,
  updateData: DocumentData,
  userEmail?: string | null
): Promise<void> {
  try {
    await ensureUserDocumentExists(userId, updateData, userEmail);
  } catch (error: any) {
    console.error('Error updating user document:', error);
    throw new Error(`Failed to update user document: ${error.message}`);
  }
}

/**
 * Checks if a user document exists
 */
export async function userDocumentExists(userId: string): Promise<boolean> {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  } catch (error) {
    console.error('Error checking user document:', error);
    return false;
  }
}

/**
 * Creates a user document if it doesn't exist
 */
export async function createUserDocumentIfNotExists(
  userId: string, 
  userEmail?: string | null
): Promise<void> {
  try {
    const exists = await userDocumentExists(userId);
    if (!exists) {
      const userRef = doc(firestore, 'users', userId);
      const userData = {
        uid: userId,
        email: userEmail || null,
        displayName: userEmail?.split('@')[0] || 'User',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      
      await setDoc(userRef, userData);
      console.log('✅ User document created for new user');
    }
  } catch (error) {
    console.error('Error creating user document:', error);
  }
}