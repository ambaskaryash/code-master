export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  order: number;
  videoId?: string;
  tags: string[];
  isImplemented: boolean;
  
  // Enhanced LeetCode-style fields
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  companies: string[];
  frequency: number; // 1-5 scale
  acceptanceRate: number;
  
  // Code templates
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  
  // Test cases (hidden from users)
  testCases: {
    input: any[];
    expectedOutput: any;
  }[];
}

// Enhanced categories covering all LeetCode topics
export const leetcodeCategories = {
  "Array": "Arrays",
  "String": "Strings", 
  "Linked List": "Linked Lists",
  "Tree": "Trees",
  "Binary Tree": "Binary Trees",
  "Binary Search Tree": "Binary Search Trees",
  "Dynamic Programming": "Dynamic Programming",
  "Stack": "Stacks",
  "Queue": "Queues",
  "Heap": "Heaps",
  "Hash Table": "Hash Tables",
  "Binary Search": "Binary Search",
  "Two Pointers": "Two Pointers",
  "Sliding Window": "Sliding Window",
  "Backtracking": "Backtracking",
  "Graph": "Graphs",
  "DFS": "Depth-First Search",
  "BFS": "Breadth-First Search",
  "Trie": "Trie",
  "Bit Manipulation": "Bit Manipulation",
  "Math": "Mathematics",
  "Greedy": "Greedy Algorithms",
  "Divide and Conquer": "Divide and Conquer",
  "Union Find": "Union Find",
  "Intervals": "Intervals",
  "Sort": "Sorting",
  "Design": "Design",
  "Simulation": "Simulation",
  "Game Theory": "Game Theory",
  // Keeping our unique categories
  "DevOps": "DevOps & Infrastructure",
  "Database": "Database & SQL",
  "Container": "Containerization"
};

// Top companies for filtering
export const companies = [
  "Google", "Amazon", "Microsoft", "Facebook", "Apple", "Netflix", 
  "Adobe", "Goldman Sachs", "Bloomberg", "Uber", "Airbnb", "LinkedIn",
  "Twitter", "Salesforce", "Oracle", "IBM", "Spotify", "Dropbox"
];

// The 100 curated problems - LeetCode Top 100
export const leetcode100Problems: LeetCodeProblem[] = [
  // ARRAYS (15 problems)
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
      { input: [[2,7,11,15], 9], expectedOutput: [0,1] },
      { input: [[3,2,4], 6], expectedOutput: [1,2] },
      { input: [[3,3], 6], expectedOutput: [0,1] }
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
      { input: [[7,1,5,3,6,4]], expectedOutput: 5 },
      { input: [[7,6,4,3,1]], expectedOutput: 0 },
      { input: [[1,2,3,4,5]], expectedOutput: 4 }
    ]
  },

  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    order: 3,
    videoId: "3OamzN90kPg",
    tags: ["Array", "Hash Table", "Sorting"],
    isImplemented: true,
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true"
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    companies: ["Google", "Adobe", "Yahoo"],
    frequency: 3,
    acceptanceRate: 59.8,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    
};`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        `,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[1,2,3,1]], expectedOutput: true },
      { input: [[1,2,3,4]], expectedOutput: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expectedOutput: true }
    ]
  },

  // More array problems will be added here...
  
  // STRINGS (10 problems)
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    order: 16,
    videoId: "9UtInBqnCgA",
    tags: ["Hash Table", "String", "Sorting"],
    isImplemented: true,
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true"
      },
      {
        input: 's = "rat", t = "car"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    companies: ["Amazon", "Microsoft", "Spotify"],
    frequency: 4,
    acceptanceRate: 63.1,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        `,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`
    },
    testCases: [
      { input: ["anagram", "nagaram"], expectedOutput: true },
      { input: ["rat", "car"], expectedOutput: false }
    ]
  },

  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    order: 17,
    videoId: "wiGpQwVHdE0",
    tags: ["Hash Table", "String", "Sliding Window"],
    isImplemented: true,
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    frequency: 5,
    acceptanceRate: 33.8,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`
    },
    testCases: [
      { input: ["abcabcbb"], expectedOutput: 3 },
      { input: ["bbbbb"], expectedOutput: 1 },
      { input: ["pwwkew"], expectedOutput: 3 }
    ]
  },

  // LINKED LISTS (8 problems)
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    order: 26,
    videoId: "G0_I-ZF0S38",
    tags: ["Linked List", "Recursion"],
    isImplemented: true,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Adobe"],
    frequency: 5,
    acceptanceRate: 72.1,
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`
    },
    testCases: [
      { input: [[1,2,3,4,5]], expectedOutput: [5,4,3,2,1] },
      { input: [[1,2]], expectedOutput: [2,1] },
      { input: [[]], expectedOutput: [] }
    ]
  },

  // More core LeetCode problems
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    order: 27,
    videoId: "yubRKwixN-U",
    tags: ["Math"],
    isImplemented: true,
    description: `Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.`,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        input: "x = 10",
        output: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    hints: [
      "Beware of overflow when you reverse the integer."
    ],
    companies: ["Amazon", "Google", "Microsoft"],
    frequency: 4,
    acceptanceRate: 52.1,
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    
};`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        `,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        
    }
};`
    },
    testCases: [
      { input: [121], expectedOutput: true },
      { input: [-121], expectedOutput: false },
      { input: [10], expectedOutput: false },
      { input: [0], expectedOutput: true }
    ]
  },

  {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "Hash Table",
    order: 28,
    videoId: "3jdxYj3DD98",
    tags: ["Hash Table", "Math", "String"],
    isImplemented: true,
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

- I can be placed before V (5) and X (10) to make 4 and 9.
- X can be placed before L (50) and C (100) to make 40 and 90.
- C can be placed before D (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.`,
    examples: [
      {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3."
      },
      {
        input: 's = "LVIII"',
        output: "58",
        explanation: "L = 50, V = 5, III = 3."
      },
      {
        input: 's = "MCMXC"',
        output: "1994",
        explanation: "M = 1000, CM = 900, XC = 90."
      }
    ],
    constraints: [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    frequency: 4,
    acceptanceRate: 58.4,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    
};`,
      python: `class Solution:
    def romanToInt(self, s: str) -> int:
        `,
      java: `class Solution {
    public int romanToInt(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    int romanToInt(string s) {
        
    }
};`
    },
    testCases: [
      { input: ["III"], expectedOutput: 3 },
      { input: ["LVIII"], expectedOutput: 58 },
      { input: ["MCMXC"], expectedOutput: 1994 },
      { input: ["IV"], expectedOutput: 4 }
    ]
  },

  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    order: 29,
    videoId: "0sWShKIJoo4",
    tags: ["String", "Trie"],
    isImplemented: true,
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"'
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings."
      }
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters."
    ],
    companies: ["Google", "Amazon", "Microsoft"],
    frequency: 3,
    acceptanceRate: 40.1,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    
};`,
      python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        `,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        
    }
}`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        
    }
};`
    },
    testCases: [
      { input: [["flower","flow","flight"]], expectedOutput: "fl" },
      { input: [["dog","racecar","car"]], expectedOutput: "" },
      { input: [["ab", "a"]], expectedOutput: "a" }
    ]
  },

  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    order: 30,
    videoId: "jzZsG8n2R9A",
    tags: ["Array", "Two Pointers", "Sorting"],
    isImplemented: true,
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]."
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!",
      "For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
    frequency: 5,
    acceptanceRate: 32.4,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    
};`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expectedOutput: [[-1,-1,2],[-1,0,1]] },
      { input: [[0,1,1]], expectedOutput: [] },
      { input: [[0,0,0]], expectedOutput: [[0,0,0]] }
    ]
  }
];

// Difficulty distribution for 100 problems
export const difficultyDistribution = {
  Easy: 30,    // 30 easy problems
  Medium: 50,  // 50 medium problems  
  Hard: 20     // 20 hard problems
};

// Category distribution for 100 problems
export const categoryDistribution = {
  "Array": 15,
  "String": 10,
  "Linked List": 8,
  "Tree": 10,
  "Dynamic Programming": 12,
  "Hash Table": 8,
  "Two Pointers": 6,
  "Binary Search": 5,
  "Stack": 5,
  "Backtracking": 6,
  "Graph": 6,
  "Bit Manipulation": 4,
  "Math": 3,
  "Design": 2,
  // Our unique additions
  "DevOps": 2,
  "Database": 2
};