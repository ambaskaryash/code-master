const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
  console.log('Verifying database schema...');
  
  try {
    // Check if problems table exists and get its structure
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking problems table:', error.message);
      return false;
    }
    
    console.log('✅ Problems table exists and is accessible');
    return true;
  } catch (err) {
    console.error('Error verifying schema:', err.message);
    return false;
  }
}

async function importProblems() {
  console.log('Starting problems import...');
  
  const problems = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      order_num: 1,
      video_id: null,
      likes: 2847,
      dislikes: 312,
      acceptance_rate: 54.1,
      frequency: 9.5,
      problem_statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        },
        {
          input: 'nums = [3,3], target = 6',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
        }
      ],
      constraints: '2 ≤ nums.length ≤ 10^4\n-10^9 ≤ nums[i] ≤ 10^9\n-10^9 ≤ target ≤ 10^9\nOnly one valid answer exists.',
      starter_code: {
        javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
        python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ',
        java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
        cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'twoSum',
      testCases: [
        {
          input: '[[2,7,11,15], 9]',
          expectedOutput: '[0,1]'
        },
        {
          input: '[[3,2,4], 6]',
          expectedOutput: '[1,2]'
        },
        {
          input: '[[3,3], 6]',
          expectedOutput: '[0,1]'
        },
        {
          input: '[[2,5,5,11], 10]',
          expectedOutput: '[1,2]'
        },
        {
          input: '[[-1,-2,-3,-4,-5], -8]',
          expectedOutput: '[2,4]'
        }
      ]
    },
    {
      id: 'reverse-linked-list',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      category: 'Linked List',
      order_num: 4,
      video_id: null,
      likes: 1789,
      dislikes: 89,
      acceptance_rate: 71.2,
      frequency: 8.9,
      problem_statement: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: 'Reverse the linked list.'
        },
        {
          input: 'head = [1,2]',
          output: '[2,1]',
          explanation: 'Reverse the two-node linked list.'
        },
        {
          input: 'head = []',
          output: '[]',
          explanation: 'Empty list remains empty.'
        }
      ],
      constraints: 'The number of nodes in the list is the range [0, 5000].\n-5000 ≤ Node.val ≤ 5000',
      starter_code: {
        javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};',
        python: '# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ',
        java: '/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}',
        cpp: '/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'reverseList',
      testCases: [
        {
          input: '[1,2,3,4,5]',
          expectedOutput: '[5,4,3,2,1]'
        },
        {
          input: '[1,2]',
          expectedOutput: '[2,1]'
        },
        {
          input: '[]',
          expectedOutput: '[]'
        },
        {
          input: '[1]',
          expectedOutput: '[1]'
        },
        {
          input: '[1,2,3]',
          expectedOutput: '[3,2,1]'
        }
      ]
    },
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      order_num: 13,
      video_id: null,
      likes: 1845,
      dislikes: 178,
      acceptance_rate: 40.1,
      frequency: 8.4,
      problem_statement: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'Valid parentheses.'
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'All brackets are properly matched.'
        },
        {
          input: 's = "(]"',
          output: 'false',
          explanation: 'Mismatched brackets.'
        }
      ],
      constraints: '1 ≤ s.length ≤ 10^4\ns consists of parentheses only \'()[]{}\'.',
      starter_code: {
        javascript: '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};',
        python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        ',
        java: 'class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}',
        cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'isValid',
      testCases: [
        {
          input: '"()"',
          expectedOutput: 'true'
        },
        {
          input: '"()[]{}"',
          expectedOutput: 'true'
        },
        {
          input: '"(]"',
          expectedOutput: 'false'
        },
        {
          input: '"([)]"',
          expectedOutput: 'false'
        },
        {
          input: '"{[]}"',
          expectedOutput: 'true'
        },
        {
          input: '""',
          expectedOutput: 'true'
        },
        {
          input: '"(("',
          expectedOutput: 'false'
        }
      ]
    },
    {
      id: 'best-time-to-buy-and-sell-stock',
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      category: 'Array',
      order_num: 121,
      video_id: null,
      likes: 2456,
      dislikes: 89,
      acceptance_rate: 54.5,
      frequency: 8.7,
      problem_statement: 'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
      examples: [
        {
          input: 'prices = [7,1,5,3,6,4]',
          output: '5',
          explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
        },
        {
          input: 'prices = [7,6,4,3,1]',
          output: '0',
          explanation: 'In this case, no transactions are done and the max profit = 0.'
        }
      ],
      constraints: '1 ≤ prices.length ≤ 10^5\n0 ≤ prices[i] ≤ 10^4',
      starter_code: {
        javascript: '/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};',
        python: 'class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        ',
        java: 'class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}',
        cpp: 'class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'maxProfit',
      testCases: [
        {
          input: '[7,1,5,3,6,4]',
          expectedOutput: '5'
        },
        {
          input: '[7,6,4,3,1]',
          expectedOutput: '0'
        },
        {
          input: '[1,2,3,4,5]',
          expectedOutput: '4'
        },
        {
          input: '[2,4,1]',
          expectedOutput: '2'
        },
        {
          input: '[1]',
          expectedOutput: '0'
        }
      ]
    },
    {
      id: 'contains-duplicate',
      title: 'Contains Duplicate',
      difficulty: 'Easy',
      category: 'Array',
      order_num: 217,
      video_id: null,
      likes: 1789,
      dislikes: 412,
      acceptance_rate: 61.2,
      frequency: 7.8,
      problem_statement: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
      examples: [
        {
          input: 'nums = [1,2,3,1]',
          output: 'true',
          explanation: 'Element 1 appears at the first and last position.'
        },
        {
          input: 'nums = [1,2,3,4]',
          output: 'false',
          explanation: 'All elements are distinct.'
        },
        {
          input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
          output: 'true',
          explanation: 'Multiple elements appear more than once.'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 10^5\n-10^9 ≤ nums[i] ≤ 10^9',
      starter_code: {
        javascript: '/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar containsDuplicate = function(nums) {\n    \n};',
        python: 'class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        ',
        java: 'class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}',
        cpp: 'class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'containsDuplicate',
      testCases: [
        {
          input: '[1,2,3,1]',
          expectedOutput: 'true'
        },
        {
          input: '[1,2,3,4]',
          expectedOutput: 'false'
        },
        {
          input: '[1,1,1,3,3,4,3,2,4,2]',
          expectedOutput: 'true'
        },
        {
          input: '[1]',
          expectedOutput: 'false'
        },
        {
          input: '[1,5,-2,-4,0]',
          expectedOutput: 'false'
        }
      ]
    },
    {
      id: 'maximum-subarray',
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      category: 'Array',
      order_num: 53,
      video_id: null,
      likes: 3421,
      dislikes: 156,
      acceptance_rate: 49.8,
      frequency: 9.1,
      problem_statement: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
        },
        {
          input: 'nums = [1]',
          output: '1',
          explanation: 'The subarray [1] has the largest sum 1.'
        },
        {
          input: 'nums = [5,4,-1,7,8]',
          output: '23',
          explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.'
        }
      ],
      constraints: '1 ≤ nums.length ≤ 10^5\n-10^4 ≤ nums[i] ≤ 10^4',
      starter_code: {
        javascript: '/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};',
        python: 'class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ',
        java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}',
        cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'maxSubArray',
      testCases: [
        {
          input: '[-2,1,-3,4,-1,2,1,-5,4]',
          expectedOutput: '6'
        },
        {
          input: '[1]',
          expectedOutput: '1'
        },
        {
          input: '[5,4,-1,7,8]',
          expectedOutput: '23'
        },
        {
          input: '[-1]',
          expectedOutput: '-1'
        },
        {
          input: '[-2,-1]',
          expectedOutput: '-1'
        }
      ]
    },
    {
      id: 'merge-two-sorted-lists',
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      category: 'Linked List',
      order_num: 21,
      video_id: null,
      likes: 2891,
      dislikes: 234,
      acceptance_rate: 62.1,
      frequency: 8.9,
      problem_statement: 'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
      examples: [
        {
          input: 'list1 = [1,2,4], list2 = [1,3,4]',
          output: '[1,1,2,3,4,4]',
          explanation: 'The merged list is [1,1,2,3,4,4].'
        },
        {
          input: 'list1 = [], list2 = []',
          output: '[]',
          explanation: 'Both lists are empty.'
        },
        {
          input: 'list1 = [], list2 = [0]',
          output: '[0]',
          explanation: 'Only list2 has elements.'
        }
      ],
      constraints: 'The number of nodes in both lists is in the range [0, 50].\n-100 ≤ Node.val ≤ 100\nBoth list1 and list2 are sorted in non-decreasing order.',
      starter_code: {
        javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};',
        python: '# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ',
        java: '/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}',
        cpp: '/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};'
      },
      handler_function: 'solve',
      starter_function_name: 'mergeTwoLists',
      testCases: [
        {
          input: '[[1,2,4], [1,3,4]]',
          expectedOutput: '[1,1,2,3,4,4]'
        },
        {
          input: '[[], []]',
          expectedOutput: '[]'
        },
        {
          input: '[[], [0]]',
          expectedOutput: '[0]'
        },
        {
          input: '[[1], [2]]',
          expectedOutput: '[1,2]'
        },
        {
          input: '[[2], [1]]',
          expectedOutput: '[1,2]'
        }
      ]
    }
  ];

  try {
    // Insert problems one by one to handle any conflicts
    let successCount = 0;
    for (const problem of problems) {
      const { error } = await supabase
        .from('problems')
        .upsert(problem, { 
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`Error inserting problem ${problem.id}:`, error.message);
      } else {
        console.log(`✅ Inserted/Updated problem: ${problem.title}`);
        successCount++;
      }
    }

    console.log(`\n✅ Import completed! ${successCount}/${problems.length} problems imported successfully.`);
    return true;
  } catch (err) {
    console.error('Error during import:', err.message);
    return false;
  }
}

async function verifyImport() {
  console.log('\nVerifying import...');
  
  try {
    const { data, error, count } = await supabase
      .from('problems')
      .select('id, title, difficulty, category', { count: 'exact' });

    if (error) {
      console.error('Error verifying import:', error.message);
      return false;
    }

    console.log(`\n📊 Total problems in database: ${count}`);
    
    if (data && data.length > 0) {
      console.log('\nSample problems:');
      data.slice(0, 5).forEach((problem, index) => {
        console.log(`${index + 1}. ${problem.title} (${problem.difficulty} - ${problem.category})`);
      });
    }

    return true;
  } catch (err) {
    console.error('Error verifying import:', err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting LeetCode Problems Import\n');
  
  const schemaOk = await verifySchema();
  if (!schemaOk) {
    console.log('\n❌ Schema verification failed. Please ensure your database is set up correctly.');
    process.exit(1);
  }

  console.log('');
  const importOk = await importProblems();
  if (!importOk) {
    console.log('\n❌ Import failed.');
    process.exit(1);
  }

  await verifyImport();
  console.log('\n🎉 All done! Your LeetCode clone now has sample problems to work with.');
}

main().catch(console.error);