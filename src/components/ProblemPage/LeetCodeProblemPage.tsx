import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { DBProblem, SupportedLanguage, TestResult } from '@/utils/types/problem';
import { toast } from 'react-toastify';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import Confetti from 'react-confetti';
import CodeMasterHeader from '../Header/LeetCodeHeader';
import Split from 'react-split';
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
  IoBulbOutline,
  IoChevronDown,
  IoSettingsOutline,
  IoExpandOutline
} from 'react-icons/io5';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

interface CodeMasterProblemPageProps {
	problem: DBProblem;
}

const CodeMasterProblemPage: React.FC<CodeMasterProblemPageProps> = ({ problem: initialProblem }) => {
	const { user } = useAuth();
	const [problem, setProblem] = useState<DBProblem | null>(initialProblem);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'discussions' | 'submissions'>('description');
  const [showCelebration, setShowCelebration] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Language configurations for CodeMirror
  const languageConfig = {
    javascript: { 
      name: 'JavaScript', 
      extension: [javascript()],
      defaultCode: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};'
    },
    python: { 
      name: 'Python3', 
      extension: [python()],
      defaultCode: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        '
    },
    java: { 
      name: 'Java', 
      extension: [java()],
      defaultCode: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}'
    },
    cpp: { 
      name: 'C++', 
      extension: [cpp()],
      defaultCode: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};'
    }
  };

  useEffect(() => {
    if (problem) {
      // Set initial code based on problem's starter code
      if (problem.starterCode && problem.starterCode[selectedLanguage]) {
        setCode(problem.starterCode[selectedLanguage]);
      } else {
        setCode(languageConfig[selectedLanguage].defaultCode);
      }
      setLoading(false);
    }
  }, [problem, selectedLanguage]);

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
    setConsoleOutput('Running code...\n');
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problemId: problem.id,
          testCases: problem.testCases?.map(testCase => ({
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          })),
        }),
      });

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.message || 'Code execution failed');
      }

      setTestResults(result.results);
      setConsoleOutput(prev => prev + 'Execution completed.\n');
      
      if (result.success) {
        toast.success('All test cases passed!');
      } else {
        toast.error('Some test cases failed');
      }
      
    } catch (error) {
      console.error('Error running code:', error);
      setConsoleOutput(prev => prev + `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
      toast.error('Error running code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitSolution = async () => {
    if (!problem || !user) return;
    
    setIsSubmitting(true);
    setConsoleOutput('Submitting solution...\n');
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          problemId: problem.id,
          testCases: problem.testCases?.map(testCase => ({
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          })),
        }),
      });

      const result = await response.json();
      setTestResults(result.results);
      setShowTestResults(true);
      
      if (result.success) {
        setShowCelebration(true);
        
        // Mark problem as solved - update user progress
        try {
          const { error } = await supabase
            .from('user_progress')
            .upsert({
              userId: user.id,
              problemId: problem.id,
              status: 'solved',
              solvedAt: new Date().toISOString()
            });
          
          if (error) {
            console.error('Error updating user progress:', error);
          }
        } catch (progressError) {
          console.error('Error tracking problem progress:', progressError);
        }
        
        setTimeout(() => setShowCelebration(false), 5000);
        toast.success('🎉 Congratulations! Solution accepted!');
        setConsoleOutput(prev => prev + '✅ Success! All test cases passed.\n');
      } else {
        toast.error('Some test cases failed. Please review your solution.');
        setConsoleOutput(prev => prev + '❌ Some test cases failed.\n');
      }
      
    } catch (error) {
      console.error('Error submitting solution:', error);
      toast.error('Error submitting solution');
      setConsoleOutput(prev => prev + `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white text-xl">Problem not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <CodeMasterHeader problemPage={true} />
      
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
      
      {/* Main Content */}
      <div className="flex h-screen pt-14"> {/* pt-14 accounts for header height */}
        <Split
          sizes={[50, 50]}
          minSize={300}
          expandToMin={false}
          gutterSize={6}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="flex h-full"
        >
          {/* Left Panel - Problem Description */}
          <div className="bg-white dark:bg-gray-800 flex flex-col">
            {/* Problem Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {problem.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-orange-500">
                      <IoThumbsUpOutline className="w-4 h-4" />
                      <span>{problem.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-orange-500">
                      <IoThumbsDownOutline className="w-4 h-4" />
                      <span>{problem.dislikes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-orange-500">
                      <IoStarOutline className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Problem Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                {problem.acceptanceRate && (
                  <div className="flex items-center space-x-1">
                    <IoCheckmarkCircle className="w-4 h-4" />
                    <span>Accepted: {problem.acceptanceRate.toFixed(1)}%</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <IoEyeOutline className="w-4 h-4" />
                  <span>Submissions: {Math.floor(Math.random() * 1000000)}</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              {(['description', 'editorial', 'discussions', 'submissions'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-orange-500 border-b-2 border-orange-500 bg-white dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'description' && (
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  {/* Problem Description */}
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: problem.description || 'Problem description not available.' }}
                  />

                  {/* Examples */}
                  {problem.examples && problem.examples.length > 0 && (
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Examples:</h3>
                      {problem.examples.map((example, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm space-y-2">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400 font-medium">Input: </span>
                              <code className="text-orange-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400 font-medium">Output: </span>
                              <code className="text-green-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {example.output}
                              </code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Explanation: </span>
                                <span className="text-gray-700 dark:text-gray-300">{example.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Constraints */}
                  {problem.constraints && (
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Constraints:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(Array.isArray(problem.constraints) 
                          ? problem.constraints 
                          : (problem.constraints as string).split('\n')
                        ).map((constraint, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">
                            <code className="text-gray-800 dark:text-gray-200">{constraint.trim()}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Follow up */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Follow up:</strong> Could you solve it in one pass?
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'editorial' && (
                <div className="text-center py-12">
                  <IoCodeSlashOutline className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Editorial content coming soon!</p>
                </div>
              )}

              {activeTab === 'discussions' && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Discussion feature coming soon!</p>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Submissions history coming soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-white dark:bg-gray-800 flex flex-col">
            {/* Editor Header */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                  title="Fullscreen"
                >
                  {isFullscreen ? <BsFullscreenExit className="w-4 h-4" /> : <BsFullscreen className="w-4 h-4" />}
                </button>
                <button
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                  title="Settings"
                >
                  <IoSettingsOutline className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 bg-gray-900">
              <CodeMirror
                value={code}
                height="100%"
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
                  height: '100%',
                }}
              />
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Console</span>
                  <button
                    onClick={() => setShowTestResults(!showTestResults)}
                    className="text-sm text-leetcode-orange hover:underline"
                  >
                    {showTestResults ? 'Hide' : 'Show'} Testcase
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors disabled:opacity-50 text-sm"
                  >
                    <IoPlay className="w-4 h-4" />
                    <span>Run</span>
                  </button>
                  <button
                    onClick={submitSolution}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-4 py-2 bg-leetcode-orange hover:bg-leetcode-orange-hover text-white rounded transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    <IoCheckmarkCircle className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results Panel */}
            {showTestResults && (
              <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 max-h-40 overflow-y-auto">
                <div className="p-4">
                  <h4 className="text-gray-900 dark:text-white font-medium mb-3 text-sm">Test Results:</h4>
                  {testResults.length > 0 ? (
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded text-sm ${
                            result.passed
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
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
                          {result.runtime && (
                            <div className="text-xs">
                              <IoTime className="w-3 h-3 inline mr-1" />
                              {result.runtime}ms
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {consoleOutput || 'No test results yet. Click Run to test your code.'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Split>
      </div>
    </div>
  );
};

export default CodeMasterProblemPage;
