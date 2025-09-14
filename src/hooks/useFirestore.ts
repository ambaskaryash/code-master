import { useEffect, useState, useCallback } from 'react';
import { firestore, enableFirestoreNetwork } from '@/firebase/firebase';
import { doc, getDoc, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const useFirestoreConnection = () => {
	const [isOnline, setIsOnline] = useState(true);
	const [isRetrying, setIsRetrying] = useState(false);

	const retryConnection = useCallback(async () => {
		if (isRetrying) return;
		
		setIsRetrying(true);
		try {
			await enableFirestoreNetwork();
			setIsOnline(true);
			toast.success('Connection restored!', { position: 'top-right', theme: 'dark' });
		} catch (error) {
			console.error('Failed to restore connection:', error);
			setIsOnline(false);
		} finally {
			setIsRetrying(false);
		}
	}, [isRetrying]);

	useEffect(() => {
		// Monitor online/offline status
		const handleOnline = () => {
			setIsOnline(true);
			retryConnection();
		};
		
		const handleOffline = () => {
			setIsOnline(false);
			toast.warning('You are offline. Some features may not work.', { 
				position: 'top-right', 
				theme: 'dark',
				autoClose: 5000 
			});
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, [retryConnection]);

	return { isOnline, retryConnection, isRetrying };
};

export const useFirestoreDoc = <T = any>(docRef: DocumentReference | null) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { retryConnection } = useFirestoreConnection();

	const fetchDoc = useCallback(async (retryCount = 0) => {
		if (!docRef) {
			setLoading(false);
			return;
		}

		try {
			setError(null);
			const docSnap = await getDoc(docRef);
			
			if (docSnap.exists()) {
				setData({ id: docSnap.id, ...docSnap.data() } as T);
			} else {
				setData(null);
				setError('Document not found');
			}
		} catch (error: any) {
			console.error('Firestore error:', error);
			
			if (error.code === 'failed-precondition' || error.message?.includes('offline')) {
				setError('You are currently offline. Please check your connection.');
				
				// Attempt to retry once
				if (retryCount === 0) {
					setTimeout(() => {
						retryConnection().then(() => {
							fetchDoc(1);
						});
					}, 2000);
					return;
				}
			} else {
				setError(`Failed to load data: ${error.message}`);
			}
		} finally {
			setLoading(false);
		}
	}, [docRef, retryConnection]);

	useEffect(() => {
		if (docRef) {
			setLoading(true);
			fetchDoc();
		}
	}, [docRef, fetchDoc]);

	return { data, loading, error, refetch: () => fetchDoc() };
};

export default useFirestoreDoc;