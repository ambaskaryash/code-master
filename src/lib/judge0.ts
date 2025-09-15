import { SupportedLanguage } from '@/utils/types/problem';

// Judge0 Language IDs mapping
export const JUDGE0_LANGUAGE_IDS: Record<SupportedLanguage, number> = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  java: 62,       // Java
  cpp: 54,        // C++ (GCC 9.2.0)
};

// Judge0 API Configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.RAPIDAPI_KEY || '';
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';

export interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
  wall_time_limit?: number;
}

export interface Judge0Result {
  token: string;
  status: {
    id: number;
    description: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  exit_code?: number;
  time?: string;
  memory?: number;
  source_code?: string;
}

// Status IDs from Judge0
export const JUDGE0_STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
} as const;

/**
 * Get code template wrapper for different languages
 * This wraps user code to make it executable with test cases
 */
export function getCodeTemplate(language: SupportedLanguage, userCode: string, input: string): string {
  switch (language) {
    case 'javascript':
      return `
${userCode}

// Test execution
const input = \`${input}\`;
const lines = input.trim().split('\\n');

try {
  // Parse input based on the problem format
  // For most LeetCode problems, we expect JSON-like input
  let result;
  
  // Try to parse as JSON first
  try {
    const inputData = JSON.parse(lines[0]);
    if (Array.isArray(inputData) && inputData.length >= 2) {
      // Two Sum format: [nums, target]
      result = twoSum(inputData[0], inputData[1]);
    } else {
      result = inputData;
    }
  } catch {
    // If JSON parsing fails, treat as simple string input
    result = lines[0];
  }
  
  console.log(JSON.stringify(result));
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
`;

    case 'python':
      return `
${userCode}

# Test execution
import json
import sys

try:
    input_data = input().strip()
    
    # Try to parse as JSON first
    try:
        parsed_input = json.loads(input_data)
        if isinstance(parsed_input, list) and len(parsed_input) >= 2:
            # Two Sum format: [nums, target]
            solution = Solution()
            result = solution.twoSum(parsed_input[0], parsed_input[1])
        else:
            result = parsed_input
    except json.JSONDecodeError:
        # If JSON parsing fails, treat as simple string input
        result = input_data
    
    print(json.dumps(result, separators=(',', ':')))
except Exception as error:
    print(f"Error: {str(error)}", file=sys.stderr)
    sys.exit(1)
`;

    case 'java':
      return `
import java.util.*;
import java.io.*;
import com.google.gson.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            String inputData = scanner.nextLine().trim();
            
            Gson gson = new Gson();
            
            // Try to parse as JSON array
            try {
                int[][] parsed = gson.fromJson(inputData, int[][].class);
                if (parsed.length >= 2) {
                    // Two Sum format: [nums, target]
                    Solution solution = new Solution();
                    int[] result = solution.twoSum(parsed[0], parsed[1]);
                    System.out.println(gson.toJson(result));
                }
            } catch (Exception e) {
                // If parsing fails, return the input
                System.out.println(inputData);
            }
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(1);
        }
    }
}
`;

    case 'cpp':
      return `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

${userCode}

int main() {
    try {
        string input_line;
        getline(cin, input_line);
        
        // Simple parsing for Two Sum problem
        // Expected format: [[1,2,3,4], 6]
        // This is a simplified parser - in production you'd want more robust JSON parsing
        
        cout << "[1, 2]" << endl; // Placeholder result
        
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
        return 1;
    }
    
    return 0;
}
`;

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

/**
 * Submit code to Judge0 for execution
 */
export async function submitToJudge0(submission: Judge0Submission): Promise<string> {
  const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': JUDGE0_API_KEY,
      'X-RapidAPI-Host': JUDGE0_API_HOST,
    },
    body: JSON.stringify({
      ...submission,
      source_code: Buffer.from(submission.source_code).toString('base64'),
      stdin: submission.stdin ? Buffer.from(submission.stdin).toString('base64') : undefined,
      expected_output: submission.expected_output 
        ? Buffer.from(submission.expected_output).toString('base64') 
        : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Judge0 submission failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.token;
}

/**
 * Get submission result from Judge0
 */
export async function getSubmissionResult(token: string): Promise<Judge0Result> {
  const response = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
    headers: {
      'X-RapidAPI-Key': JUDGE0_API_KEY,
      'X-RapidAPI-Host': JUDGE0_API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`Judge0 result fetch failed: ${response.status}`);
  }

  const result = await response.json();
  
  // Decode base64 encoded fields
  if (result.stdout) {
    result.stdout = Buffer.from(result.stdout, 'base64').toString('utf-8');
  }
  if (result.stderr) {
    result.stderr = Buffer.from(result.stderr, 'base64').toString('utf-8');
  }
  if (result.compile_output) {
    result.compile_output = Buffer.from(result.compile_output, 'base64').toString('utf-8');
  }
  if (result.message) {
    result.message = Buffer.from(result.message, 'base64').toString('utf-8');
  }

  return result;
}

/**
 * Wait for submission to complete with polling
 */
export async function waitForCompletion(token: string, maxAttempts = 10): Promise<Judge0Result> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await getSubmissionResult(token);
    
    // Check if processing is complete
    if (result.status.id !== JUDGE0_STATUS.IN_QUEUE && result.status.id !== JUDGE0_STATUS.PROCESSING) {
      return result;
    }
    
    // Wait before next attempt (exponential backoff)
    await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 5000)));
  }
  
  throw new Error('Submission timed out');
}

/**
 * Execute code with test cases
 */
export async function executeCode(
  code: string, 
  language: SupportedLanguage, 
  testCases: Array<{ input: string; expectedOutput: string }>
): Promise<{
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
}> {
  const languageId = JUDGE0_LANGUAGE_IDS[language];
  const results = [];
  let allPassed = true;

  for (const testCase of testCases) {
    try {
      // Wrap user code with test case execution
      const wrappedCode = getCodeTemplate(language, code, testCase.input);
      
      // Submit to Judge0
      const token = await submitToJudge0({
        source_code: wrappedCode,
        language_id: languageId,
        stdin: testCase.input,
        cpu_time_limit: 2, // 2 seconds
        memory_limit: 128000, // 128 MB
      });

      // Wait for completion
      const result = await waitForCompletion(token);
      
      let actualOutput = '';
      let error = undefined;
      let passed = false;

      if (result.status.id === JUDGE0_STATUS.ACCEPTED) {
        actualOutput = (result.stdout || '').trim();
        passed = actualOutput === testCase.expectedOutput.trim();
      } else {
        error = result.stderr || result.compile_output || result.message || 'Unknown error';
        actualOutput = result.stdout || '';
        passed = false;
      }

      if (!passed) {
        allPassed = false;
      }

      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput,
        passed,
        error,
        runtime: result.time ? parseFloat(result.time) * 1000 : undefined, // Convert to ms
        memory: result.memory,
      });

    } catch (error) {
      allPassed = false;
      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return {
    success: allPassed,
    results,
  };
}