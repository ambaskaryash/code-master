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
      starter_function_name: 'twoSum'
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
      starter_function_name: 'reverseList'
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
      starter_function_name: 'isValid'
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