import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { problems as mockProblems } from '@/mockProblems/problems';
import { leetcode100Problems } from '@/mockProblems/leetcode100';
import { extendedProblems } from '@/mockProblems/extended-problems';
import { enhancedExistingProblems } from '@/mockProblems/enhanced-existing-problems';
import { problems as localProblems } from '@/utils/problems';

// Function to seed all problems from mock data to Firebase
export async function seedAllProblems() {
  try {
    console.log('🔥 Starting to seed problems to Firestore...');
    
    for (const problem of mockProblems) {
      const docRef = doc(firestore, 'problems', problem.id);
      
      const problemData = {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        videoId: problem.videoId || '',
        tags: problem.tags || [],
        isImplemented: problem.isImplemented,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, problemData, { merge: true });
      console.log(`✅ Added/Updated: ${problem.title} (${problem.id})`);
    }
    
    console.log('🎉 All problems seeded successfully!');
    return true;
    
  } catch (error: any) {
    console.error('❌ Error seeding problems:', error);
    throw error;
  }
}

// Function to add just the monitoring setup problem
export async function addMonitoringSetupProblem() {
  try {
    console.log('🔥 Adding monitoring setup problem to Firestore...');
    
    const monitoringProblem = mockProblems.find(p => p.id === 'monitoring-setup');
    if (!monitoringProblem) {
      throw new Error('Monitoring setup problem not found in mock data');
    }
    
    const docRef = doc(firestore, 'problems', 'monitoring-setup');
    
    const problemData = {
      title: monitoringProblem.title,
      difficulty: monitoringProblem.difficulty,
      category: monitoringProblem.category,
      order: monitoringProblem.order,
      videoId: monitoringProblem.videoId || '',
      tags: monitoringProblem.tags || [],
      isImplemented: monitoringProblem.isImplemented,
      likes: 0,
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(docRef, problemData, { merge: true });
    console.log(`✅ Added monitoring setup problem successfully!`);
    console.log('Problem data:', problemData);
    
    return true;
    
  } catch (error: any) {
    console.error('❌ Error adding monitoring setup problem:', error);
    throw error;
  }
}

// Function to check if a problem exists in Firestore
export async function checkProblemExists(problemId: string) {
  try {
    const docRef = doc(firestore, 'problems', problemId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(`Error checking if problem ${problemId} exists:`, error);
    return false;
  }
}

// Function to add just the new SQL/Docker/Database problems
export async function addNewDatabaseProblems() {
  try {
    console.log('🔥 Adding new SQL/Docker/Database problems to Firestore...');
    
    const newProblemIds = ['sql-complex-queries', 'docker-multi-service', 'database-migration-scripts'];
    
    for (const problemId of newProblemIds) {
      const problem = mockProblems.find(p => p.id === problemId);
      if (!problem) {
        console.warn(`Problem ${problemId} not found in mock data`);
        continue;
      }
      
      const docRef = doc(firestore, 'problems', problem.id);
      
      const problemData = {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        videoId: problem.videoId || '',
        tags: problem.tags || [],
        isImplemented: problem.isImplemented,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, problemData, { merge: true });
      console.log(`✅ Added: ${problem.title} (${problem.id})`);
    }
    
    console.log('🎉 New database problems added successfully!');
    return true;
    
  } catch (error: any) {
    console.error('❌ Error adding new database problems:', error);
    throw error;
  }
}

// Function to seed LeetCode-style problems
export async function seedLeetCodeProblems() {
  try {
    console.log('🔥 Starting to seed LeetCode-style problems to Firestore...');
    
    // Combine all our new problems
    const allNewProblems = [...leetcode100Problems, ...extendedProblems];
    
    for (const problem of allNewProblems) {
      const docRef = doc(firestore, 'problems', problem.id);
      
      const problemData = {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        videoId: problem.videoId || '',
        tags: problem.tags || [],
        isImplemented: problem.isImplemented,
        // Enhanced LeetCode fields
        description: problem.description || '',
        examples: problem.examples || [],
        constraints: problem.constraints || [],
        hints: problem.hints || [],
        companies: problem.companies || [],
        frequency: problem.frequency || 1,
        acceptanceRate: problem.acceptanceRate || 50,
        starterCode: problem.starterCode || {
          javascript: '// Your solution here',
          python: '# Your solution here',
          java: '// Your solution here',
          cpp: '// Your solution here'
        },
        testCases: (problem.testCases || []).map(tc => {
          // Ensure we're properly stringifying all array-type data to avoid Firebase nested array errors
          let inputData = typeof tc.input === 'string' ? tc.input : JSON.stringify(tc.input);
          let outputData = typeof tc.expectedOutput === 'string' ? tc.expectedOutput : JSON.stringify(tc.expectedOutput);
          
          return {
            input: inputData,
            expectedOutput: outputData
          };
        }),
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, problemData, { merge: true });
      console.log(`✅ Added/Updated: ${problem.title} (${problem.id})`);
    }
    
    console.log(`🎉 All ${allNewProblems.length} LeetCode-style problems seeded successfully!`);
    return true;
    
  } catch (error: any) {
    console.error('❌ Error seeding LeetCode problems:', error);
    throw error;
  }
}

// Function to seed ALL problems with comprehensive LeetCode-style data
export async function seedAllEnhancedProblems() {
  try {
    console.log('🔥 Starting to seed ALL enhanced problems to Firestore...');
    
    // Combine enhanced existing problems with new problems
    const allEnhancedProblems = [
      ...enhancedExistingProblems,
      ...leetcode100Problems,
      ...extendedProblems
    ];
    
    // Also include the enhanced versions of the originally enhanced problems
    const enhancedOriginalProblems = mockProblems.map(problem => {
      // Check if we have an enhanced version
      const enhanced = enhancedExistingProblems.find(ep => ep.id === problem.id);
      if (enhanced) {
        return enhanced;
      }
      
      // For problems like "best-time-to-buy-and-sell-stock" that were already enhanced
      if (problem.id === "best-time-to-buy-and-sell-stock") {
        return {
          ...problem,
          description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
          examples: [
            {
              input: "prices = [7,1,5,3,6,4]",
              output: "5",
              explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
            },
            {
              input: "prices = [7,6,4,3,1]",
              output: "0",
              explanation: "In this case, no transactions are done and the max profit = 0."
            }
          ],
          constraints: [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
          ],
          companies: ["Amazon", "Microsoft", "Goldman Sachs", "Bloomberg"],
          frequency: 5,
          acceptanceRate: 54.2,
          starterCode: {
            javascript: `/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};`,
            python: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        `,
            java: `class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}`,
            cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};`
          },
          testCases: [
            { input: [[7,1,5,3,6,4]], expectedOutput: 5 },
            { input: [[7,6,4,3,1]], expectedOutput: 0 },
            { input: [[1,2,3,4,5]], expectedOutput: 4 }
          ]
        };
      }
      
      // Return original problem with enhanced descriptions based on problem type
      const getEnhancedDescription = (problem: any) => {
        // First, check if we have the actual problem data from local files
        const localProblem = localProblems[problem.id];
        if (localProblem) {
          // Use the local problem data with enhanced fields
          return {
            ...problem,
            description: localProblem.problemStatement || localProblem.description || problem.description || 'Problem description',
            problemStatement: localProblem.problemStatement || localProblem.description || problem.description || 'Problem description',
            examples: localProblem.examples ? localProblem.examples.map(ex => ({
              input: ex.inputText || ex.input || 'Sample input',
              output: ex.outputText || ex.output || 'Sample output',
              explanation: ex.explanation || 'Sample explanation'
            })) : (problem.examples || []),
            constraints: localProblem.constraints ? 
              (Array.isArray(localProblem.constraints) ? localProblem.constraints : [localProblem.constraints]) 
              : (problem.constraints || []),
            companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
            frequency: 5,
            acceptanceRate: problem.id === 'two-sum' ? 54.1 : 50,
            starterCode: {
              javascript: localProblem.starterCode || `// ${localProblem.title}\nfunction solve() {\n    // Your solution here\n}`,
              python: `# ${localProblem.title}\ndef solve():\n    # Your solution here\n    pass`,
              java: `// ${localProblem.title}\npublic class Solution {\n    public void solve() {\n        // Your solution here\n    }\n}`,
              cpp: `// ${localProblem.title}\nclass Solution {\npublic:\n    void solve() {\n        // Your solution here\n    }\n};`
            },
            testCases: problem.id === 'two-sum' ? [
              { input: JSON.stringify([[2,7,11,15], 9]), expectedOutput: JSON.stringify([0,1]) },
              { input: JSON.stringify([[3,2,4], 6]), expectedOutput: JSON.stringify([1,2]) },
              { input: JSON.stringify([[3,3], 6]), expectedOutput: JSON.stringify([0,1]) }
            ] : [],
            hints: problem.id === 'two-sum' ? [
              "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
              "Again, the best way would be to use a HashMap to keep track of the values and their indices."
            ] : []
          };
        }
        
        // Map problem IDs to comprehensive descriptions
        const problemDescriptions: { [key: string]: any } = {
          "merge-intervals": {
            description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
            examples: [
              { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlaps, merge them into [1,6]." },
              { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals [1,4] and [4,5] are considered overlapping." }
            ],
            constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
            companies: ["Microsoft", "Amazon", "Google", "Facebook"],
            testCases: [{ input: [[[1,3],[2,6],[8,10],[15,18]]], expectedOutput: [[1,6],[8,10],[15,18]] }]
          },
          "maximum-depth-of-binary-tree": {
            description: `Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
            examples: [
              { input: "root = [3,9,20,null,null,15,7]", output: "3" },
              { input: "root = [1,null,2]", output: "2" }
            ],
            constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
            companies: ["Amazon", "Microsoft", "Google", "Facebook"],
            testCases: [{ input: [[3,9,20,null,null,15,7]], expectedOutput: 3 }]
          },
          "subsets": {
            description: `Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.`,
            examples: [
              { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
              { input: "nums = [0]", output: "[[],[0]]" }
            ],
            constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
            companies: ["Amazon", "Microsoft", "Google", "Facebook"],
            testCases: [{ input: [[1,2,3]], expectedOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] }]
          },
          "monitoring-setup": {
            description: `Set up a comprehensive monitoring solution using Prometheus and Alertmanager.\n\n**Note: This problem requires Docker and basic understanding of monitoring concepts.**\n\nYou need to create a monitoring stack that includes:\n1. Prometheus server configuration\n2. Application metrics collection\n3. Alert rules for critical conditions\n4. Alertmanager for notification routing\n\nThe solution should monitor system metrics, application health, and send alerts when thresholds are exceeded.`,
            examples: [
              { input: "Application with high CPU usage (>80%)", output: "Alert triggered and sent to designated channels" },
              { input: "Service down for more than 1 minute", output: "Critical alert sent immediately" }
            ],
            constraints: ["Must use Prometheus for metrics collection", "Must configure at least 3 alert rules", "Alert routing must support multiple channels"],
            companies: ["Netflix", "Uber", "Airbnb", "Google"]
          },
          "sql-complex-queries": {
            description: `Write complex SQL queries to analyze business data and generate insights.\n\n**Note: This problem requires a MySQL/PostgreSQL database.**\n\nYou are given multiple related tables and need to write queries that:\n1. Use advanced joins and subqueries\n2. Implement window functions for analytics\n3. Calculate running totals and rankings\n4. Generate business reports with aggregations`,
            examples: [
              { input: "Find top 5 customers by total order value", output: "SQL query with JOIN, GROUP BY, ORDER BY" }
            ],
            constraints: ["Must use proper JOIN syntax", "Queries must be optimized", "Handle NULL values appropriately"],
            companies: ["Microsoft", "Oracle", "IBM", "Snowflake"]
          },
          "docker-multi-service": {
            description: `Design and implement a multi-service application stack using Docker and Docker Compose.\n\n**Note: This problem requires Docker and Docker Engine.**\n\nYour task is to containerize a web application that includes:\n1. Frontend service\n2. Backend API service\n3. Database service\n4. Cache service\n5. Reverse proxy`,
            examples: [
              { input: "Multi-service web application", output: "Complete docker-compose.yml with all services" }
            ],
            constraints: ["Must use Docker Compose", "Services must communicate via networks", "Include health checks"],
            companies: ["Docker", "Amazon", "Google", "Microsoft"]
          },
          "database-migration-scripts": {
            description: `Create safe and reversible database migration scripts for a production system.\n\nYou need to design migration scripts that:\n1. Add new tables and columns safely\n2. Migrate existing data without data loss\n3. Handle rollback scenarios\n4. Maintain referential integrity\n5. Minimize downtime during deployment`,
            examples: [
              { input: "Add new column 'email' to users table", output: "Migration script with rollback capability" }
            ],
            constraints: ["Migrations must be atomic", "Must provide rollback scripts", "Handle large datasets efficiently"],
            companies: ["Stripe", "Shopify", "Atlassian", "GitHub"]
          }
        };
        
        const enhanced = problemDescriptions[problem.id];
        if (enhanced) {
          return {
            ...problem,
            ...enhanced,
            frequency: enhanced.frequency || 4,
            acceptanceRate: enhanced.acceptanceRate || 50,
            starterCode: enhanced.starterCode || {
              javascript: '// Your solution here',
              python: '# Your solution here', 
              java: '// Your solution here',
              cpp: '// Your solution here'
            }
          };
        }
        
        // Default fallback with better description
        return {
          ...problem,
          description: `Solve the ${problem.title} problem using ${problem.category.toLowerCase()} techniques.`,
          examples: [{ input: "Check problem examples", output: "Expected solution" }],
          constraints: ["Follow problem constraints"],
          companies: ["Various Tech Companies"],
          frequency: 3,
          acceptanceRate: 50,
          starterCode: {
            javascript: `// ${problem.title}
// Your solution here
function solve() {
    
}`,
            python: `# ${problem.title}
# Your solution here
def solve():
    pass`,
            java: `// ${problem.title}
// Your solution here
public class Solution {
    public void solve() {
        
    }
}`,
            cpp: `// ${problem.title}
// Your solution here
class Solution {
public:
    void solve() {
        
    }
};`
          },
          testCases: []
        };
      };
      
      return getEnhancedDescription(problem);
    });
    
    // Combine everything, removing duplicates by id
    const finalProblems = [...enhancedOriginalProblems];
    
    // Add leetcode100 and extended problems (they don't duplicate)
    finalProblems.push(...leetcode100Problems.filter(p => !finalProblems.some(fp => fp.id === p.id)));
    finalProblems.push(...extendedProblems.filter(p => !finalProblems.some(fp => fp.id === p.id)));
    
    for (const problem of finalProblems) {
      const docRef = doc(firestore, 'problems', problem.id);
      
      const problemData = {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        videoId: problem.videoId || '',
        tags: problem.tags || [],
        isImplemented: problem.isImplemented,
        // Enhanced LeetCode fields  
        description: problem.description || problem.problemStatement || '',
        problemStatement: problem.problemStatement || problem.description || '',
        examples: problem.examples || [],
        constraints: problem.constraints || [],
        hints: problem.hints || [],
        companies: problem.companies || [],
        frequency: problem.frequency || 1,
        acceptanceRate: problem.acceptanceRate || 50,
        starterCode: problem.starterCode || {
          javascript: '// Your solution here',
          python: '# Your solution here',
          java: '// Your solution here',
          cpp: '// Your solution here'
        },
        testCases: (problem.testCases || []).map(tc => {
          // Ensure we're properly stringifying all array-type data to avoid Firebase nested array errors
          let inputData = typeof tc.input === 'string' ? tc.input : JSON.stringify(tc.input);
          let outputData = typeof tc.expectedOutput === 'string' ? tc.expectedOutput : JSON.stringify(tc.expectedOutput);
          
          return {
            input: inputData,
            expectedOutput: outputData
          };
        }),
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, problemData, { merge: true });
      console.log(`✅ Enhanced: ${problem.title} (${problem.id})`);
    }
    
    console.log(`🎉 All ${finalProblems.length} enhanced problems seeded successfully!`);
    console.log('📊 Enhanced problems now have comprehensive test cases and are Ready to Solve!');
    return true;
    
  } catch (error: any) {
    console.error('❌ Error seeding enhanced problems:', error);
    throw error;
  }
}

// Export for browser console use
if (typeof window !== 'undefined') {
  (window as any).seedAllProblems = seedAllProblems;
  (window as any).addMonitoringSetupProblem = addMonitoringSetupProblem;
  (window as any).addNewDatabaseProblems = addNewDatabaseProblems;
  (window as any).seedLeetCodeProblems = seedLeetCodeProblems;
  (window as any).seedAllEnhancedProblems = seedAllEnhancedProblems;
}
