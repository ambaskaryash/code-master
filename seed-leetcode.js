const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC33qUr6wG66qgbgkFWJs_6UHnbM5WbBqM",
  authDomain: "leetcode-3ed2f.firebaseapp.com",
  projectId: "leetcode-3ed2f",
  storageBucket: "leetcode-3ed2f.firebasestorage.app",
  messagingSenderId: "490759559925",
  appId: "1:490759559925:web:520db8478789208e1983bc"
};

// LeetCode-style problems with enhanced features
const leetcodeProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "KLlXCFG5TnA",
    tags: ["Array", "Hash Table"],
    isImplemented: true,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Again, the best way would be to use a HashMap to keep track of the values and their indices."
    ],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    frequency: 5,
    acceptanceRate: 49.1,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" }
    ]
  },

  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 2,
    videoId: "1pkOgXD63yU",
    tags: ["Array", "Dynamic Programming"],
    isImplemented: true,
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
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" },
      { input: "[1,2,3,4,5]", expectedOutput: "4" }
    ]
  }
];

async function seedLeetCodeProblems() {
  try {
    console.log('🔥 Initializing Firebase...');
    
    // Initialize Firebase
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const firestore = getFirestore(app);
    
    console.log('🔥 Starting to seed LeetCode-style problems...');
    
    for (const problem of leetcodeProblems) {
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
        testCases: problem.testCases || [],
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(docRef, problemData, { merge: true });
      console.log(`✅ Added/Updated: ${problem.title} (${problem.id})`);
    }
    
    console.log(`🎉 All ${leetcodeProblems.length} LeetCode-style problems seeded successfully!`);
    console.log('🚀 You can now access http://localhost:3000/problems/two-sum');
    
  } catch (error) {
    console.error('❌ Error seeding LeetCode problems:', error);
  }
}

// Run the seeding
seedLeetCodeProblems();