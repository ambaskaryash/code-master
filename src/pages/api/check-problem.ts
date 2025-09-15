import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { problemId = 'two-sum' } = req.query;

  try {
    // Check specific problem
    const { data: problemData, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', problemId as string)
      .single();
    
    if (!error && problemData) {
      return res.status(200).json({ 
        success: true,
        found: true,
        problem: problemData,
        hasDescription: !!problemData.problem_statement,
        hasExamples: !!problemData.examples,
        hasConstraints: !!problemData.constraints,
        hasStarterCode: !!problemData.starter_code
      });
    } else {
      // Check if we have any problems at all
      const { data: sampleProblems, error: sampleError } = await supabase
        .from('problems')
        .select('id, title, problem_statement')
        .limit(5);
      
      const formattedSamples = sampleProblems?.map(problem => ({
        id: problem.id,
        title: problem.title || 'No title',
        hasDescription: !!problem.problem_statement
      })) || [];
      
      return res.status(200).json({ 
        success: true,
        found: false,
        message: `Problem '${problemId}' not found`,
        sampleProblems: formattedSamples,
        totalProblemsFound: sampleProblems?.length || 0
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
