import { NextApiRequest, NextApiResponse } from 'next';

// Judge0 Language IDs
const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  java: 62,       // Java
  cpp: 54,        // C++ (GCC 9.2.0)
} as const;

type SupportedLanguage = keyof typeof LANGUAGE_IDS;

interface ExecuteCodeRequest {
  code: string;
  language: SupportedLanguage;
  testCases?: Array<{
    input: string | any[];
    expectedOutput: string | any;
  }>;
  problemId?: string;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  runtime?: number;
  error?: string;
}

// Helper function to extract function name from code
function extractFunctionName(code: string): string {
  // JavaScript patterns
  const jsPatterns = [
    /var\s+(\w+)\s*=\s*function/,           // var funcName = function
    /const\s+(\w+)\s*=\s*function/,         // const funcName = function  
    /let\s+(\w+)\s*=\s*function/,           // let funcName = function
    /function\s+(\w+)/,                     // function funcName
    /const\s+(\w+)\s*=\s*\(/,               // const funcName = (
    /var\s+(\w+)\s*=\s*\(/,                 // var funcName = (
    /let\s+(\w+)\s*=\s*\(/                  // let funcName = (
  ];
  
  // Python patterns
  const pythonPatterns = [
    /def\s+(\w+)\s*\(/                      // def funcName(
  ];
  
  // Java patterns
  const javaPatterns = [
    /public\s+\w+\s+(\w+)\s*\(/,            // public returnType funcName(
    /private\s+\w+\s+(\w+)\s*\(/,           // private returnType funcName(
    /protected\s+\w+\s+(\w+)\s*\(/,         // protected returnType funcName(
    /static\s+\w+\s+(\w+)\s*\(/             // static returnType funcName(
  ];
  
  // C++ patterns
  const cppPatterns = [
    /\w+\s+(\w+)\s*\([^)]*\)\s*{/,          // returnType funcName() {
    /class\s+\w+\s*{[^}]*public:[^}]*(\w+)\s*\(/  // class methods
  ];
  
  const allPatterns = [...jsPatterns, ...pythonPatterns, ...javaPatterns, ...cppPatterns];
  
  for (const pattern of allPatterns) {
    const match = code.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // Fallback: return a common function name based on common patterns
  if (code.includes('twoSum')) return 'twoSum';
  if (code.includes('threeSum')) return 'threeSum';
  if (code.includes('isPalindrome')) return 'isPalindrome';
  if (code.includes('reverseString')) return 'reverseString';
  if (code.includes('maxDepth')) return 'maxDepth';
  if (code.includes('isValid')) return 'isValid';
  if (code.includes('mergeTwoLists')) return 'mergeTwoLists';
  
  // Ultimate fallback
  return 'solution';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, language, testCases, problemId }: ExecuteCodeRequest = req.body;
    
    console.log('Execute code request:', {
      problemId,
      language,
      testCasesReceived: !!testCases,
      testCasesCount: testCases?.length || 0,
      firstTestCase: testCases?.[0]
    });

    if (!code || !language) {
      return res.status(400).json({ error: 'Missing required fields: code and language' });
    }

    // Use test cases from request (should come from database)
    const actualTestCases = testCases || [];
    
    if (actualTestCases.length === 0) {
      return res.status(400).json({ error: 'No test cases provided' });
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // Execute code for each test case
    const results: TestResult[] = [];
    
    for (const testCase of actualTestCases) {
      try {
        const result = await executeWithJudge0(code, languageId, testCase.input, problemId || '');
        
        // Compare results - handle both string and JSON array comparison
        const actualOutput = result.stdout?.trim() || '';
        const expectedOutput = typeof testCase.expectedOutput === 'string' ? testCase.expectedOutput.trim() : JSON.stringify(testCase.expectedOutput);
        
        let passed = false;
        try {
          // Try JSON comparison first
          const actualJson = JSON.parse(actualOutput);
          const expectedJson = typeof testCase.expectedOutput === 'string' ? JSON.parse(testCase.expectedOutput) : testCase.expectedOutput;
          passed = JSON.stringify(actualJson) === JSON.stringify(expectedJson);
        } catch {
          // Fallback to string comparison
          passed = actualOutput === expectedOutput;
        }
        
        results.push({
          passed,
          input: typeof testCase.input === 'string' ? testCase.input : JSON.stringify(testCase.input),
          expected: expectedOutput,
          actual: actualOutput || result.stderr || 'No output',
          runtime: result.time ? Math.round(result.time * 1000) : undefined,
          error: result.stderr || undefined,
        });
      } catch (error) {
        results.push({
          passed: false,
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: 'Execution error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    const allPassed = results.every(result => result.passed);
    
    return res.status(200).json({
      success: allPassed,
      results,
      message: allPassed ? 'All test cases passed!' : 'Some test cases failed',
    });

  } catch (error) {
    console.error('Code execution error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function executeWithJudge0(code: string, languageId: number, testInput: string, problemId: string = '') {
  const JUDGE0_URL = process.env.JUDGE0_URL || 'https://judge0-ce.p.rapidapi.com';
  const API_KEY = process.env.RAPIDAPI_KEY;

  // Parse test input to get function arguments
  let executableCode;
  try {
    let parsedArgs;
    
    // Handle different input formats
    if (testInput.includes('], ')) {
      // Format: "[2,7,11,15], 9" -> convert to [[2,7,11,15], 9]
      const parts = testInput.split('], ');
      const arrayPart = parts[0] + ']';
      const remainingParts = parts.slice(1).join('], ');
      parsedArgs = [JSON.parse(arrayPart)];
      
      // Parse remaining arguments
      const remaining = remainingParts.split(', ');
      for (const part of remaining) {
        try {
          // Try to parse as JSON first (for arrays, objects)
          parsedArgs.push(JSON.parse(part));
        } catch {
          // If not JSON, try as number or keep as string
          const num = Number(part);
          parsedArgs.push(isNaN(num) ? part.replace(/"/g, '') : num);
        }
      }
    } else {
      try {
        parsedArgs = JSON.parse(`[${testInput}]`);
      } catch {
        // Handle simple comma-separated values
        parsedArgs = testInput.split(', ').map(arg => {
          try {
            return JSON.parse(arg);
          } catch {
            const num = Number(arg);
            return isNaN(num) ? arg.replace(/"/g, '') : num;
          }
        });
      }
    }
    
    // Extract function name from user code
    const functionName = extractFunctionName(code);
    
    // For JavaScript (Node.js) - wrap user code with test execution
    if (languageId === 63) {
      const argsList = parsedArgs.map((arg, index) => `arg${index}`).join(', ');
      const argsDeclaration = parsedArgs.map((arg, index) => 
        `const arg${index} = ${JSON.stringify(arg)};`
      ).join('\n');
      
      executableCode = `
${code}

// Test execution
${argsDeclaration}
const result = ${functionName}(${argsList});
console.log(JSON.stringify(result));
      `;
    }
    // For Python
    else if (languageId === 71) {
      const argsList = parsedArgs.map((arg, index) => `arg${index}`).join(', ');
      const argsDeclaration = parsedArgs.map((arg, index) => 
        `arg${index} = ${JSON.stringify(arg)}`
      ).join('\n');
      
      executableCode = `
${code}

# Test execution
${argsDeclaration}
result = ${functionName}(${argsList})
print(result)
      `;
    }
    // For Java
    else if (languageId === 62) {
      // Java requires more complex handling - we'll implement this later
      executableCode = code;
    }
    // For C++
    else if (languageId === 54) {
      // C++ requires more complex handling - we'll implement this later
      executableCode = code;
    }
    else {
      executableCode = code;
    }
  } catch (error) {
    console.error('Error parsing test input:', testInput, error);
    executableCode = code;
  }

  // Step 1: Submit code for execution
  const submissionResponse = await fetch(`${JUDGE0_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': API_KEY || '',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({
      source_code: executableCode,
      language_id: languageId,
      stdin: '',
      expected_output: null,
      cpu_time_limit: 2,
      memory_limit: 128000,
    }),
  });

  if (!submissionResponse.ok) {
    throw new Error(`Judge0 submission failed: ${submissionResponse.statusText}`);
  }

  const submission = await submissionResponse.json();
  const token = submission.token;

  // Step 2: Poll for results
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    
    const resultResponse = await fetch(`${JUDGE0_URL}/submissions/${token}`, {
      headers: {
        'X-RapidAPI-Key': API_KEY || '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    });

    if (!resultResponse.ok) {
      throw new Error(`Judge0 result fetch failed: ${resultResponse.statusText}`);
    }

    const result = await resultResponse.json();
    
    // Status 1-2 means still processing, 3+ means completed
    if (result.status?.id >= 3) {
      return {
        stdout: result.stdout,
        stderr: result.stderr,
        time: result.time,
        memory: result.memory,
        status: result.status,
      };
    }
    
    attempts++;
  }

  throw new Error('Code execution timeout');
}