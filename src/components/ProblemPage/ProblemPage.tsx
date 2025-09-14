import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { DBProblem, SupportedLanguage, CodeSubmission, TestResult } from '@/utils/types/problem';
import { toast } from 'react-toastify';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import Confetti from 'react-confetti';
import ProblemNavbar from './ProblemNavbar';
import { 
  IoPlay, 
  IoCheckmarkCircle, 
  IoCloseCircle, 
  IoTime,
  IoFlashOutline,
  IoBusinessOutline,
  IoStarOutline,
  IoEyeOutline,
  IoThumbsUpOutline,
  IoThumbsDownOutline,
  IoCodeSlashOutline,
  IoBulbOutline
} from 'react-icons/io5';

interface ProblemPageProps {
  problemId: string;
}

const ProblemPage: React.FC<ProblemPageProps> = ({ problemId }) => {
  const [user] = useAuthState(auth);
  const [problem, setProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'discuss'>('description');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  // Language configurations for CodeMirror
  const languageConfig = {
    javascript: { 
      name: 'JavaScript', 
      extension: [javascript()],
      defaultCode: '// Your solution here\nfunction solution() {\n    // Write your code here\n}\n'
    },
    python: { 
      name: 'Python', 
      extension: [python()],
      defaultCode: '# Your solution here\ndef solution():\n    # Write your code here\n    pass\n'
    },
    java: { 
      name: 'Java', 
      extension: [java()],
      defaultCode: '// Your solution here\npublic class Solution {\n    // Write your code here\n}\n'
    },
    cpp: { 
      name: 'C++', 
      extension: [cpp()],
      defaultCode: '// Your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}\n'
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const docRef = doc(firestore, 'problems', problemId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const problemData = { id: docSnap.id, ...docSnap.data() } as DBProblem;
          setProblem(problemData);
          
          // Set initial code based on problem's starter code
          if (problemData.starterCode && problemData.starterCode[selectedLanguage]) {
            setCode(problemData.starterCode[selectedLanguage]);
          } else {
            setCode(languageConfig[selectedLanguage].defaultCode);
          }
        } else {
          toast.error(`Problem '${problemId}' not found`);
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
        toast.error('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId, selectedLanguage]);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    if (problem?.starterCode && problem.starterCode[language]) {
      setCode(problem.starterCode[language]);
    } else {
      setCode(languageConfig[language].defaultCode);
    }
  };

  const runCode = async () => {
    if (!problem || !user) return;
    
    setIsSubmitting(true);
    setShowTestResults(true);
    
    try {
      // Call real code execution API
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problemId: problemId,
          testCases: problem.testCases?.map(testCase => ({
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.message || 'Code execution failed');
      }

      setTestResults(result.results);
      
      if (result.success) {
        toast.success('All test cases passed!');
        // Don't mark as solved yet - wait for submit
      } else {
        toast.error('Some test cases failed');
      }
      
    } catch (error) {
      console.error('Error running code:', error);
      toast.error(error instanceof Error ? error.message : 'Error running code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitSolution = async () => {
    if (!problem || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // Execute code first to verify solution
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problemId: problemId,
          testCases: problem.testCases?.map(testCase => ({
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTestResults(result.results);
      setShowTestResults(true);
      
      if (result.success) {
        // All tests passed - trigger celebration!
        setShowCelebration(true);
        setShowSolutionModal(true);
        
        // Mark problem as solved
        const userRef = doc(firestore, 'users', user.uid);
        await updateDoc(userRef, {
          solvedProblems: arrayUnion(problemId)
        });
        
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowCelebration(false);
        }, 5000);
        
        toast.success('🎉 Congratulations! Solution accepted!');
      } else {
        toast.error('Some test cases failed. Please review your solution.');
      }
      
    } catch (error) {
      console.error('Error submitting solution:', error);
      toast.error('Error submitting solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-layer-2 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-dark-layer-2 flex items-center justify-center">
        <div className="text-white text-xl">Problem not found</div>
      </div>
    );
  }

  // Solution explanations for different problems
  const getSolutionExplanation = () => {
    switch (problemId) {
      case 'two-sum':
        return {
          approach: 'Hash Map (One-pass)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          explanation: `
The key insight is to use a hash map to store numbers we've seen along with their indices. 

For each number in the array:
1. Calculate the complement (target - current number)
2. Check if the complement exists in our hash map
3. If yes, return both indices
4. If no, store the current number and its index

This approach works because we're looking for a pair that adds up to the target. When we encounter the second number of a valid pair, we'll find its complement already stored in our hash map.
          `,
          keyPoints: [
            'Uses O(n) time instead of O(n²) brute force approach',
            'Hash map provides O(1) average lookup time',
            'Single pass through the array is sufficient',
            'Stores visited numbers with their indices for quick access'
          ]
        };
      case 'palindrome-number':
        return {
          approach: 'String Reversal Method',
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(log n)',
          explanation: `
This solution converts the number to a string and checks if it reads the same forwards and backwards.

Steps:
1. Handle negative numbers (they can't be palindromes)
2. Convert number to string
3. Reverse the string and compare with original

Alternatively, you could reverse only half the number mathematically for O(1) space complexity.
          `,
          keyPoints: [
            'Negative numbers are never palindromes',
            'String reversal is intuitive and easy to understand',
            'Can be optimized to reverse only half the number',
            'Edge cases: single digit numbers are always palindromes'
          ]
        };
      default:
        return {
          approach: 'Algorithmic Solution',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          explanation: 'Great job solving this problem! Your solution efficiently handles the given constraints.',
          keyPoints: [
            'Well-structured approach to the problem',
            'Efficient implementation',
            'Handles edge cases properly'
          ]
        };
    }
  };

  const solutionInfo = getSolutionExplanation();

  return (
    <div className="min-h-screen bg-dark-layer-2 relative">
      {/* Navigation Header */}
      <ProblemNavbar problemTitle={problem?.title} />
      
      {/* Confetti Animation */}
      {showCelebration && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <div className="flex" style={{height: 'calc(100vh - 4rem)'}}> {/* Subtract topbar height */}
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 bg-dark-layer-1 border-r border-gray-600 flex flex-col">
          {/* Problem Header */}
          <div className="p-6 border-b border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <div className="flex items-center space-x-2 text-gray-400">
                  <IoThumbsUpOutline className="w-4 h-4" />
                  <span>{problem.likes}</span>
                  <IoThumbsDownOutline className="w-4 h-4" />
                  <span>{problem.dislikes}</span>
                </div>
              </div>
            </div>
            
            {/* Problem Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              {problem.acceptanceRate && (
                <div className="flex items-center space-x-1">
                  <IoCheckmarkCircle className="w-4 h-4" />
                  <span>{problem.acceptanceRate}% Accepted</span>
                </div>
              )}
              {problem.frequency && (
                <div className="flex items-center space-x-1">
                  <IoFlashOutline className="w-4 h-4" />
                  <span>Frequency: {problem.frequency}/5</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <IoEyeOutline className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 1000000)} views</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-600">
            {(['description', 'editorial', 'discuss'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Problem Description */}
                <div className="text-gray-300 leading-relaxed">
                  {problem.description || 'Problem description not available.'}
                </div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Examples:</h3>
                    {problem.examples.map((example, index) => (
                      <div key={index} className="mb-4 p-4 bg-dark-layer-2 rounded-lg">
                        <div className="text-sm">
                          <div className="mb-2">
                            <span className="text-gray-400">Input: </span>
                            <code className="text-blue-400">{example.input}</code>
                          </div>
                          <div className="mb-2">
                            <span className="text-gray-400">Output: </span>
                            <code className="text-green-400">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-gray-400">Explanation: </span>
                              <span className="text-gray-300">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Constraints:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <IoBulbOutline className="w-5 h-5 mr-2" />
                      Hints:
                    </h3>
                    {problem.hints.map((hint, index) => (
                      <details key={index} className="mb-2">
                        <summary className="cursor-pointer text-blue-400 text-sm hover:text-blue-300">
                          Hint {index + 1}
                        </summary>
                        <p className="mt-2 text-gray-300 text-sm pl-4">{hint}</p>
                      </details>
                    ))}
                  </div>
                )}

                {/* Companies */}
                {problem.companies && problem.companies.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <IoBusinessOutline className="w-5 h-5 mr-2" />
                      Companies:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.companies.slice(0, 6).map((company, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs"
                        >
                          {company}
                        </span>
                      ))}
                      {problem.companies.length > 6 && (
                        <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs">
                          +{problem.companies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {problem.tags && problem.tags.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Related Topics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs hover:bg-gray-500 cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="text-gray-300">
                <div className="text-center py-12">
                  <IoCodeSlashOutline className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <p>Editorial content coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">Check out the YouTube video for now.</p>
                </div>
              </div>
            )}

            {activeTab === 'discuss' && (
              <div className="text-gray-300">
                <div className="text-center py-12">
                  <p>Discussion feature coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">Share your solutions and approaches with the community.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Header */}
          <div className="p-4 bg-dark-layer-1 border-b border-gray-600 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-dark-layer-2 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              >
                {Object.entries(languageConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={runCode}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors disabled:opacity-50"
              >
                <IoPlay className="w-4 h-4" />
                <span>Run</span>
              </button>
              <button
                onClick={submitSolution}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-50"
              >
                <IoCheckmarkCircle className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-dark-layer-1 overflow-auto">
            <CodeMirror
              value={code}
              height="60vh"
              theme={vscodeDark}
              extensions={languageConfig[selectedLanguage].extension}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                highlightSelectionMatches: false,
              }}
              style={{
                fontSize: '14px',
              }}
            />
          </div>

          {/* Test Results */}
          {showTestResults && (
            <div className="bg-dark-layer-2 border-t border-gray-600 p-4 max-h-40 overflow-y-auto">
              <h4 className="text-white font-semibold mb-3">Test Results:</h4>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded text-sm ${
                      result.passed
                        ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                        : 'bg-red-600/20 text-red-400 border border-red-600/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.passed ? (
                        <IoCheckmarkCircle className="w-4 h-4" />
                      ) : (
                        <IoCloseCircle className="w-4 h-4" />
                      )}
                      <span>Test Case {index + 1}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      {result.runtime && (
                        <div className="flex items-center space-x-1">
                          <IoTime className="w-3 h-3" />
                          <span>{result.runtime}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Success Modal */}
      {showSolutionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-layer-1 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <IoCheckmarkCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Accepted!</h2>
                    <p className="text-gray-400">Congratulations on solving {problem?.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSolutionModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <IoCloseCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Test Results Summary */}
              <div className="mb-6 p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Runtime Results</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Test Cases: </span>
                    <span className="text-green-400 font-semibold">{testResults.length}/{testResults.length} Passed</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Runtime: </span>
                    <span className="text-white font-semibold">
                      {Math.round(testResults.reduce((sum, result) => sum + (result.runtime || 0), 0) / testResults.length)}ms
                    </span>
                  </div>
                </div>
              </div>

              {/* Solution Explanation */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Solution Explanation</h3>
                
                {/* Complexity Analysis */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-dark-layer-2 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-1">Time Complexity</h4>
                    <p className="text-white text-lg font-mono">{solutionInfo.timeComplexity}</p>
                  </div>
                  <div className="p-3 bg-dark-layer-2 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-1">Space Complexity</h4>
                    <p className="text-white text-lg font-mono">{solutionInfo.spaceComplexity}</p>
                  </div>
                </div>

                {/* Approach */}
                <div className="mb-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Approach: {solutionInfo.approach}</h4>
                  <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                    {solutionInfo.explanation}
                  </div>
                </div>

                {/* Key Points */}
                <div className="mb-6">
                  <h4 className="text-green-400 font-semibold mb-3">Key Points:</h4>
                  <ul className="space-y-2">
                    {solutionInfo.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <IoCheckmarkCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <div className="text-sm text-gray-400">
                  🎉 Keep up the great work! Try more problems to improve your skills.
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSolutionModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSolutionModal(false);
                      // Could navigate to next problem here
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Next Problem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
