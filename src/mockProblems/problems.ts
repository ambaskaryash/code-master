export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	videoId?: string;
	tags: string[];
	isImplemented: boolean;
	
	// Enhanced LeetCode-style fields
	description?: string;
	examples?: {
		input: string;
		output: string;
		explanation?: string;
	}[];
	constraints?: string[];
	hints?: string[];
	companies?: string[];
	frequency?: number; // 1-5 scale
	acceptanceRate?: number;
	
	// Code templates for multiple languages
	starterCode?: {
		javascript: string;
		python: string;
		java: string;
		cpp: string;
	};
	
	// Test cases (hidden from users)
	testCases?: {
		input: any[];
		expectedOutput: any;
	}[];
};

export const categories = {
	"Array": "Arrays",
	"String": "Strings", 
	"Linked List": "Linked Lists",
	"Tree": "Trees",
	"Dynamic Programming": "Dynamic Programming",
	"Stack": "Stacks & Queues",
	"Binary Search": "Binary Search",
	"Two Pointers": "Two Pointers",
	"Backtracking": "Backtracking",
	"Intervals": "Intervals",
	"Graph": "Graphs",
	"Hash Table": "Hash Tables",
	"Sliding Window": "Sliding Window",
	"Math": "Mathematics",
	"DevOps": "DevOps & Infrastructure",
	"Database": "Database & SQL",
	"Container": "Containerization"
};

export const difficulties = ["Easy", "Medium", "Hard"];

export const problems: Problem[] = [
	{
		id: "two-sum",
		title: "Two Sum",
		difficulty: "Easy",
		category: "Array",
		order: 1,
		videoId: "8-k1C6ehKuw",
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
			},
			{
				input: "nums = [3,3], target = 6",
				output: "[0,1]"
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
		id: "reverse-linked-list",
		title: "Reverse Linked List",
		difficulty: "Easy",
		category: "Linked List",
		order: 2,
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
			},
			{
				input: "head = []",
				output: "[]"
			}
		],
		constraints: [
			"The number of nodes in the list is the range [0, 5000].",
			"-5000 <= Node.val <= 5000"
		],
		hints: [
			"A linked list can be reversed either iteratively or recursively. Could you implement both?"
		],
		companies: ["Facebook", "Microsoft", "Amazon", "Apple", "Google"],
		frequency: 5,
		acceptanceRate: 67.4,
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
	{
		id: "longest-substring-without-repeating-characters",
		title: "Longest Substring Without Repeating Characters",
		difficulty: "Medium",
		category: "String",
		order: 3,
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
			},
			{
				input: 's = "pwwkew"',
				output: "3",
				explanation: 'The answer is "wke", with the length of 3.'
			}
		],
		constraints: [
			"0 <= s.length <= 5 * 10^4",
			"s consists of English letters, digits, symbols and spaces."
		],
		hints: [
			"Use a sliding window approach with a hash map to track characters.",
			"When you encounter a repeating character, move the left pointer to the right of the previous occurrence."
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
			{ input: ["pwwkew"], expectedOutput: 3 },
			{ input: ["dvdf"], expectedOutput: 3 }
		]
	},
	{
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medium",
		category: "Dynamic Programming",
		order: 4,
		videoId: "Yan0cv2cLy8",
		tags: ["Array", "Dynamic Programming", "Greedy"],
		isImplemented: true,
		description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.`,
		examples: [
			{
				input: "nums = [2,3,1,1,4]",
				output: "true",
				explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
			},
			{
				input: "nums = [3,2,1,0,4]",
				output: "false",
				explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
			}
		],
		constraints: [
			"1 <= nums.length <= 10^4",
			"0 <= nums[i] <= 10^5"
		],
		hints: [
			"Think about this problem in reverse. Start from the end and work backward.",
			"Keep track of the furthest position you can reach at each step."
		],
		companies: ["Microsoft", "Amazon", "Google"],
		frequency: 4,
		acceptanceRate: 36.9,
		starterCode: {
			javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
};`,
			python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        `,
			java: `class Solution {
    public boolean canJump(int[] nums) {
        
    }
}`,
			cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        
    }
};`
		},
		testCases: [
			{ input: [[2,3,1,1,4]], expectedOutput: true },
			{ input: [[3,2,1,0,4]], expectedOutput: false },
			{ input: [[0]], expectedOutput: true }
		]
	},
	{
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Easy",
		category: "Stack",
		order: 5,
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
			},
			{
				input: 's = "([)]"',
				output: "false"
			}
		],
		constraints: [
			"1 <= s.length <= 10^4",
			"s consists of parentheses only '()[]{}'."
		],
		hints: [
			"Use a stack to keep track of opening brackets.",
			"When you see a closing bracket, check if it matches the most recent opening bracket."
		],
		companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
		frequency: 5,
		acceptanceRate: 40.5,
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
			{ input: ["(]"], expectedOutput: false },
			{ input: ["([)]"], expectedOutput: false },
			{ input: ["{[]}"], expectedOutput: true }
		]
	},
	{
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Medium",
		category: "Binary Search",
		order: 6,
		videoId: "ZfFl4torNg4",
		tags: ["Array", "Binary Search", "Matrix"],
		isImplemented: true,
		description: `You are given an m x n integer matrix matrix with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.`,
		examples: [
			{
				input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5",
				output: "true"
			},
			{
				input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 14",
				output: "true"
			},
			{
				input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20",
				output: "false"
			}
		],
		constraints: [
			"m == matrix.length",
			"n == matrix[i].length",
			"1 <= m, n <= 100",
			"-10^4 <= matrix[i][j], target <= 10^4"
		],
		hints: [
			"Don't treat it as a 2D matrix, just treat it as a sorted list.",
			"Use binary search."
		],
		companies: ["Amazon", "Microsoft", "Google", "Adobe"],
		frequency: 4,
		acceptanceRate: 38.9,
		starterCode: {
			javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    
};`,
			python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        `,
			java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        
    }
}`,
			cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        
    }
};`
		},
		testCases: [
			{ input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5], expectedOutput: true },
			{ input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 14], expectedOutput: true },
			{ input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20], expectedOutput: false }
		]
	},
	{
		id: "container-with-most-water",
		title: "Container With Most Water",
		difficulty: "Medium",
		category: "Two Pointers",
		order: 7,
		videoId: "UuiTKBwPgAo",
		tags: ["Array", "Two Pointers", "Greedy"],
		isImplemented: true,
		description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Note that you may not slant the container.`,
		examples: [
			{
				input: "height = [1,8,6,2,5,4,8,3,7]",
				output: "49",
				explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
			},
			{
				input: "height = [1,1]",
				output: "1"
			}
		],
		constraints: [
			"n == height.length",
			"2 <= n <= 10^5",
			"0 <= height[i] <= 10^4"
		],
		hints: [
			"If you simulate the problem, it will be O(n^2) which is not efficient.",
			"Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line."
		],
		companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
		frequency: 5,
		acceptanceRate: 54.9,
		starterCode: {
			javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};`,
			python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        `,
			java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`,
			cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`
		},
		testCases: [
			{ input: [[1,8,6,2,5,4,8,3,7]], expectedOutput: 49 },
			{ input: [[1,1]], expectedOutput: 1 },
			{ input: [[1,2,1]], expectedOutput: 2 }
		]
	},
	{
		id: "merge-intervals",
		title: "Merge Intervals",
		difficulty: "Medium",
		category: "Intervals",
		order: 8,
		videoId: "44H3cEC2fFM",
		tags: ["Array", "Sorting"],
		isImplemented: true,
	},
	{
		id: "maximum-depth-of-binary-tree",
		title: "Maximum Depth of Binary Tree",
		difficulty: "Easy",
		category: "Tree",
		order: 9,
		videoId: "4qYTqOiRMoM",
		tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
		isImplemented: true,
	},
	{
		id: "best-time-to-buy-and-sell-stock",
		title: "Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		category: "Array",
		order: 10,
		videoId: "1pkOgXD63yU",
		tags: ["Array", "Dynamic Programming"],
		isImplemented: true,
	},
	{
		id: "subsets",
		title: "Subsets",
		difficulty: "Medium",
		category: "Backtracking",
		order: 11,
		videoId: "REOH22Xwdkk",
		tags: ["Array", "Backtracking", "Bit Manipulation"],
		isImplemented: true,
	},
	{
		id: "monitoring-setup",
		title: "Monitoring: Prometheus & Alerting",
		difficulty: "Medium",
		category: "DevOps",
		order: 12,
		videoId: "h4Sl21AKiDg",
		tags: ["DevOps", "Monitoring", "Prometheus", "Alerting", "YAML"],
		isImplemented: true,
	},
	{
		id: "sql-complex-queries",
		title: "SQL: Complex Queries & Analytics",
		difficulty: "Medium",
		category: "Database",
		order: 13,
		videoId: "p3qvj9hO_Bo",
		tags: ["Database", "SQL", "Analytics", "Joins", "Window Functions"],
		isImplemented: true,
	},
	{
		id: "docker-multi-service",
		title: "Docker: Multi-Service Application Stack",
		difficulty: "Medium",
		category: "Container",
		order: 14,
		videoId: "DM65_JyGxCo",
		tags: ["Docker", "Container", "Docker Compose", "Orchestration", "Networking"],
		isImplemented: true,
	},
	{
		id: "database-migration-scripts",
		title: "Database: Safe Migration Scripts",
		difficulty: "Hard",
		category: "Database",
		order: 15,
		videoId: "qzPPmI8xl4E",
		tags: ["Database", "Migration", "SQL", "Schema", "Data Migration"],
		isImplemented: true,
	},
];
