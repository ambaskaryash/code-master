import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { problemId = 'two-sum' } = req.query;

  try {
    // Check specific problem
    const docRef = doc(firestore, 'problems', problemId as string);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const problemData = { id: docSnap.id, ...docSnap.data() };
      
      return res.status(200).json({ 
        success: true,
        found: true,
        problem: problemData,
        hasDescription: !!problemData.description,
        hasProblemStatement: !!problemData.problemStatement,
        hasExamples: !!problemData.examples && problemData.examples.length > 0,
        hasTestCases: !!problemData.testCases && problemData.testCases.length > 0
      });
    } else {
      // Check if we have any problems at all
      const problemsRef = collection(firestore, 'problems');
      const problemsQuery = query(problemsRef, limit(5));
      const querySnapshot = await getDocs(problemsQuery);
      
      const sampleProblems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'No title',
        hasDescription: !!doc.data().description,
        hasProblemStatement: !!doc.data().problemStatement
      }));
      
      return res.status(200).json({ 
        success: true,
        found: false,
        message: `Problem '${problemId}' not found`,
        sampleProblems,
        totalProblemsFound: querySnapshot.size
      });
    }
  } catch (error: any) {
    console.error('❌ Error checking problem:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Error checking problem' 
    });
  }
}