import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

export async function debugFirebaseConnection() {
  try {
    console.log('🔍 Debugging Firebase connection...');
    
    // Test basic Firestore connection
    const testCollection = collection(firestore, 'test');
    console.log('✅ Firestore connection established');
    
    // Check if problems collection exists and has data
    const problemsCollection = collection(firestore, 'problems');
    const problemsSnapshot = await getDocs(problemsCollection);
    
    console.log(`📊 Problems collection contains ${problemsSnapshot.size} documents`);
    
    if (problemsSnapshot.empty) {
      console.warn('⚠️ Problems collection is empty! You need to seed the database.');
      console.log('💡 Visit http://localhost:3001/admin/seed to add problems to Firebase');
    } else {
      console.log('📋 Problems found:');
      problemsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.title} (${data.difficulty})`);
      });
    }
    
    return {
      connected: true,
      problemCount: problemsSnapshot.size,
      problems: problemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    };
    
  } catch (error: any) {
    console.error('❌ Firebase connection error:', error);
    
    if (error.code === 'permission-denied') {
      console.log('🔒 Permission denied - check your Firestore security rules');
    } else if (error.code === 'unavailable') {
      console.log('🌐 Firebase service unavailable - check your internet connection');
    } else {
      console.log('🔧 Check your Firebase configuration in .env.local');
    }
    
    return {
      connected: false,
      error: error.message,
      problemCount: 0,
      problems: []
    };
  }
}

// Export for browser console use
if (typeof window !== 'undefined') {
  (window as any).debugFirebase = debugFirebaseConnection;
}