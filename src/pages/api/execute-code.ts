import type { NextApiRequest, NextApiResponse } from 'next';
import { executeCode } from '@/lib/judge0';
import { SupportedLanguage } from '@/utils/types/problem';

interface ExecuteCodeRequest {
  code: string;
  language: SupportedLanguage;
  problemId: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface ExecuteCodeResponse {
  success: boolean;
  results: Array<{
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    error?: string;
    runtime?: number;
    memory?: number;
  }>;
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExecuteCodeResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are allowed',
      results: []
    });
  }

  try {
    // Validate request body
    const { code, language, problemId, testCases }: ExecuteCodeRequest = req.body;

    if (!code || !language || !problemId || !testCases) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        message: 'Missing required fields: code, language, problemId, testCases',
        results: []
      });
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid test cases',
        message: 'testCases must be a non-empty array',
        results: []
      });
    }

    // Validate supported language
    const supportedLanguages: SupportedLanguage[] = ['javascript', 'python', 'java', 'cpp'];
    if (!supportedLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        error: 'Unsupported language',
        message: `Language '${language}' is not supported. Supported languages: ${supportedLanguages.join(', ')}`,
        results: []
      });
    }

    // Validate test cases format
    for (const testCase of testCases) {
      if (!testCase.input || !testCase.expectedOutput) {
        return res.status(400).json({
          success: false,
          error: 'Invalid test case',
          message: 'Each test case must have input and expectedOutput',
          results: []
        });
      }
    }

    // Check if Judge0 API key is configured
    if (!process.env.RAPIDAPI_KEY) {
      console.error('RapidAPI key not configured');
      return res.status(500).json({
        success: false,
        error: 'Service configuration error',
        message: 'Code execution service is not properly configured. Please contact support.',
        results: []
      });
    }

    console.log(`🚀 Executing code for problem ${problemId} in ${language}...`);
    console.log(`📝 Code length: ${code.length} characters`);
    console.log(`🧪 Test cases: ${testCases.length}`);

    // Execute code with Judge0
    const executionResult = await executeCode(code, language, testCases);

    // Log execution results
    const passedCount = executionResult.results.filter(r => r.passed).length;
    const totalCount = executionResult.results.length;
    console.log(`✅ Execution completed: ${passedCount}/${totalCount} test cases passed`);

    // Add some additional metrics
    const avgRuntime = executionResult.results
      .filter(r => r.runtime)
      .reduce((sum, r) => sum + (r.runtime || 0), 0) / executionResult.results.length;

    const avgMemory = executionResult.results
      .filter(r => r.memory)
      .reduce((sum, r) => sum + (r.memory || 0), 0) / executionResult.results.length;

    if (avgRuntime > 0) {
      console.log(`⏱️  Average runtime: ${avgRuntime.toFixed(2)}ms`);
    }
    if (avgMemory > 0) {
      console.log(`💾 Average memory: ${(avgMemory / 1024).toFixed(2)}KB`);
    }

    return res.status(200).json(executionResult);

  } catch (error) {
    console.error('❌ Code execution error:', error);
    
    // Handle specific error types
    let errorMessage = 'An unexpected error occurred during code execution';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Judge0 submission failed')) {
        errorMessage = 'Code execution service is temporarily unavailable';
        statusCode = 503;
      } else if (error.message.includes('Submission timed out')) {
        errorMessage = 'Code execution timed out. Please optimize your solution or try again later';
        statusCode = 408;
      } else if (error.message.includes('Unsupported language')) {
        errorMessage = error.message;
        statusCode = 400;
      } else {
        errorMessage = `Execution error: ${error.message}`;
      }
    }

    return res.status(statusCode).json({
      success: false,
      error: 'Execution failed',
      message: errorMessage,
      results: []
    });
  }
}

// Configure API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Limit request size
    },
    responseLimit: '8mb', // Allow larger responses for test results
  },
}