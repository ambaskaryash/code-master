// Define LeetCodeProblem interface locally to avoid circular imports
export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  order: number;
  videoId?: string;
  tags: string[];
  isImplemented: boolean;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  companies: string[];
  frequency: number;
  acceptanceRate: number;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  testCases: {
    input: any[];
    expectedOutput: any;
  }[];
}

// Extended problems list (continuing from the base problems)
export const extendedProblems: LeetCodeProblem[] = [
  // ARRAYS (continuing)
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    order: 4,
    videoId: "bNvIQI2wAjk",
    tags: ["Array", "Prefix Sum"],
    isImplemented: true,
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.`,
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]"
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
    ],
    hints: [
      "Since you can't use division, how can you compute the product of all elements except the current one?",
      "Think about using two arrays - one for prefix products and one for suffix products."
    ],
    companies: ["Amazon", "Microsoft", "Facebook", "Apple"],
    frequency: 5,
    acceptanceRate: 64.8,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};`,
      python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[1,2,3,4]], expectedOutput: [24,12,8,6] },
      { input: [[-1,1,0,-3,3]], expectedOutput: [0,0,9,0,0] }
    ]
  },

  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Easy",
    category: "Array",
    order: 5,
    videoId: "86CQq3pKSUw",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    isImplemented: true,
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "This is a classic problem. Can you solve it using Kadane's algorithm?",
      "At each position, decide whether to start a new subarray or extend the existing one."
    ],
    companies: ["Amazon", "Google", "Microsoft", "LinkedIn"],
    frequency: 5,
    acceptanceRate: 49.5,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    
};`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expectedOutput: 6 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[5,4,-1,7,8]], expectedOutput: 23 }
    ]
  },

  // STRINGS (continuing)
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String",
    order: 18,
    videoId: "jJXJ16kPFWg",
    tags: ["Two Pointers", "String"],
    isImplemented: true,
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    companies: ["Microsoft", "Facebook", "Amazon"],
    frequency: 4,
    acceptanceRate: 42.3,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`
    },
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expectedOutput: true },
      { input: ["race a car"], expectedOutput: false },
      { input: [" "], expectedOutput: true }
    ]
  },

  // LINKED LISTS (continuing)
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    order: 27,
    videoId: "gBTe7lFR3vc",
    tags: ["Hash Table", "Linked List", "Two Pointers"],
    isImplemented: true,
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.`,
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)."
      },
      {
        input: "head = [1,2], pos = 0",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 0th node."
      }
    ],
    constraints: [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
      "pos is -1 or a valid index in the linked-list."
    ],
    hints: [
      "Can you solve it using O(1) (i.e. constant) memory?",
      "Think about Floyd's Tortoise and Hare algorithm."
    ],
    companies: ["Amazon", "Microsoft", "Bloomberg", "Adobe"],
    frequency: 5,
    acceptanceRate: 45.1,
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        `,
      java: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`
    },
    testCases: [
      { input: [[3,2,0,-4], 1], expectedOutput: true },
      { input: [[1,2], 0], expectedOutput: true },
      { input: [[1], -1], expectedOutput: false }
    ]
  },

  // TREES
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 35,
    videoId: "OnSn2XEQ4MY",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    isImplemented: true,
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]"
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    frequency: 4,
    acceptanceRate: 74.5,
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode invertTree(TreeNode root) {
        
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        
    }
};`
    },
    testCases: [
      { input: [[4,2,7,1,3,6,9]], expectedOutput: [4,7,2,9,6,3,1] },
      { input: [[2,1,3]], expectedOutput: [2,3,1] },
      { input: [[]], expectedOutput: [] }
    ]
  },

  // DYNAMIC PROGRAMMING
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    order: 45,
    videoId: "Y0lT9Fck7qI",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    isImplemented: true,
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    hints: [
      "To reach nth step, you could have come from (n-1)th or (n-2)th step.",
      "This is essentially a Fibonacci sequence!"
    ],
    companies: ["Amazon", "Google", "Adobe", "Apple"],
    frequency: 4,
    acceptanceRate: 51.6,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        `,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`
    },
    testCases: [
      { input: [2], expectedOutput: 2 },
      { input: [3], expectedOutput: 3 },
      { input: [4], expectedOutput: 5 }
    ]
  },

  // STACKS
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 50,
    videoId: "xty7fr-k0TU",
    tags: ["String", "Stack"],
    isImplemented: true,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    frequency: 5,
    acceptanceRate: 40.7,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`
    },
    testCases: [
      { input: ["()"], expectedOutput: true },
      { input: ["()[]{}"], expectedOutput: true },
      { input: ["(]"], expectedOutput: false }
    ]
  },

  // HASH TABLES
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Hash Table",
    order: 60,
    videoId: "vzdNOK2oB2E",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    isImplemented: true,
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    companies: ["Amazon", "Facebook", "Uber", "Bloomberg"],
    frequency: 4,
    acceptanceRate: 67.0,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};`,
      python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        `,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
    }
};`
    },
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], expectedOutput: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: [[""]], expectedOutput: [[""]] },
      { input: [["a"]], expectedOutput: [["a"]] }
    ]
  },

  // Keep existing DevOps and Database problems
  {
    id: "monitoring-setup",
    title: "Monitoring: Prometheus & Alerting",
    difficulty: "Medium",
    category: "DevOps",
    order: 90,
    videoId: "h4Sl21AKiDg",
    tags: ["DevOps", "Monitoring", "Prometheus", "Alerting", "YAML"],
    isImplemented: true,
    description: `Set up a comprehensive monitoring stack with Prometheus, Grafana, and AlertManager for a microservices application.

Your task is to:
1. Configure Prometheus to scrape metrics from multiple services
2. Set up Grafana dashboards for visualization
3. Configure AlertManager for notifications
4. Implement custom metrics for application monitoring`,
    examples: [
      {
        input: "Services: web-app, database, redis, nginx",
        output: "Complete monitoring stack with dashboards and alerts"
      }
    ],
    constraints: [
      "Must support at least 4 different services",
      "Include both infrastructure and application metrics",
      "Set up at least 3 different alert rules"
    ],
    companies: ["Netflix", "Uber", "Airbnb", "Google"],
    frequency: 3,
    acceptanceRate: 45.2,
    starterCode: {
      javascript: `// prometheus.yml configuration
/*
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
*/

// Your monitoring configuration here`,
      python: `# monitoring_setup.py
# Configure Prometheus, Grafana, and AlertManager

def setup_prometheus_config():
    """Configure Prometheus scraping targets"""
    pass

def setup_grafana_dashboards():
    """Create Grafana dashboards for services"""
    pass

def setup_alertmanager():
    """Configure AlertManager rules"""
    pass`,
      java: `// MonitoringSetup.java
public class MonitoringSetup {
    
    public void configurePrometheus() {
        // Configure Prometheus metrics collection
    }
    
    public void setupGrafanaDashboards() {
        // Set up Grafana dashboards
    }
    
    public void configureAlerts() {
        // Configure AlertManager
    }
}`,
      cpp: `// monitoring_setup.cpp
#include <iostream>
#include <string>

class MonitoringSetup {
public:
    void configurePrometheus() {
        // Configure Prometheus setup
    }
    
    void setupGrafana() {
        // Set up Grafana dashboards
    }
    
    void configureAlerts() {
        // Configure AlertManager
    }
};`
    },
    testCases: [
      { input: [["web-app", "database", "redis", "nginx"]], expectedOutput: "monitoring_stack_configured" },
      { input: [["api", "worker", "cache"]], expectedOutput: "monitoring_stack_configured" }
    ]
  }
];

// Combine with original problems for complete 100-problem set
export const complete100Problems = [
  // ... would include all 100 problems here
  // This is a sample showing the structure and variety
];