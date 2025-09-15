const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Test cases for the final remaining problems with correct IDs
const finalTestCases = {
  // Correct ID variations
  'three-sum': [
    {
      input: '[[-1,0,1,2,-1,-4]]',
      expectedOutput: '[[-1,-1,2],[-1,0,1]]'
    },
    {
      input: '[[0,1,1]]',
      expectedOutput: '[]'
    },
    {
      input: '[[0,0,0]]',
      expectedOutput: '[[0,0,0]]'
    }
  ],
  'longest-substring-without-repeating': [
    {
      input: '"abcabcbb"',
      expectedOutput: '3'
    },
    {
      input: '"bbbbb"',
      expectedOutput: '1'
    },
    {
      input: '"pwwkew"',
      expectedOutput: '3'
    }
  ],
  'maximum-depth-binary-tree': [
    {
      input: '[3,9,20,null,null,15,7]',
      expectedOutput: '3'
    },
    {
      input: '[1,null,2]',
      expectedOutput: '2'
    },
    {
      input: '[]',
      expectedOutput: '0'
    }
  ],
  'median-two-sorted-arrays': [
    {
      input: '[[1,3], [2]]',
      expectedOutput: '2.0'
    },
    {
      input: '[[1,2], [3,4]]',
      expectedOutput: '2.5'
    },
    {
      input: '[[0,0], [0,0]]',
      expectedOutput: '0.0'
    }
  ]
};

async function main() {
  console.log('🎯 Final Test Cases Addition\n');

  // Get all problems to see exact IDs
  const { data: problems, error } = await supabase
    .from('problems')
    .select('id, title, testCases')
    .order('order_num');

  if (error) {
    console.error('Error fetching problems:', error.message);
    return;
  }

  console.log('📋 All problems in database:');
  problems.forEach((problem, index) => {
    const testCaseCount = problem.testCases ? problem.testCases.length : 0;
    const status = testCaseCount > 0 ? '✅' : '❌';
    console.log(`${index + 1}. ${problem.id} - "${problem.title}" - ${testCaseCount} test cases ${status}`);
  });

  console.log('\n🚀 Adding test cases to remaining problems...\n');

  let addedCount = 0;
  
  for (const problem of problems) {
    const testCaseCount = problem.testCases ? problem.testCases.length : 0;
    
    if (testCaseCount === 0) {
      // Check if we have test cases for this problem ID
      const testCases = finalTestCases[problem.id];
      
      if (testCases) {
        try {
          const { error } = await supabase
            .from('problems')
            .update({ 
              testCases: testCases,
              updated_at: new Date().toISOString()
            })
            .eq('id', problem.id);

          if (error) {
            console.error(`❌ Error updating ${problem.id}:`, error.message);
          } else {
            console.log(`✅ Added ${testCases.length} test cases to "${problem.title}" (${problem.id})`);
            addedCount++;
          }
        } catch (err) {
          console.error(`❌ Error updating ${problem.id}:`, err.message);
        }
      } else {
        console.log(`⚠️  No test cases available for "${problem.title}" (${problem.id})`);
      }
    }
  }

  console.log(`\n✅ Added test cases to ${addedCount} additional problems`);

  // Final verification
  const { data: finalProblems } = await supabase
    .from('problems')
    .select('id, title, testCases')
    .order('order_num');

  const problemsWithTestCases = finalProblems.filter(p => p.testCases && p.testCases.length > 0);
  console.log(`\n🎉 FINAL RESULT: ${problemsWithTestCases.length}/${finalProblems.length} problems have test cases!`);
}

main().catch(console.error);