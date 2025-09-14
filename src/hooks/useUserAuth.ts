import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { createUserDocumentIfNotExists } from '@/utils/user-utils';

/**
 * Hook that ensures user document exists whenever a user signs in
 */
export function useUserAuth() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const initializeUser = async () => {
      if (user && !loading) {
        try {
          // Ensure user document exists in Firestore
          await createUserDocumentIfNotExists(user.uid, user.email);
        } catch (error) {
          console.error('Failed to initialize user document:', error);
        }
      }
    };

    initializeUser();
  }, [user, loading]);

  return { user, loading, error };
}