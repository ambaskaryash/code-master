const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test cases for remaining problems
const additionalProblemTestCases = {
  '3sum': [
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
    },
    {
      input: '[[-1,0,1,2,-1,-4,-2,-3,3,0,4]]',
      expectedOutput: '[[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]'
    },
    {
      input: '[[1,2,-2,-1]]',
      expectedOutput: '[]'
    }
  ],
  'container-with-most-water': [
    {
      input: '[1,8,6,2,5,4,8,3,7]',
      expectedOutput: '49'
    },
    {
      input: '[1,1]',
      expectedOutput: '1'
    },
    {
      input: '[1,2,1]',
      expectedOutput: '2'
    },
    {
      input: '[1,2,4,3]',
      expectedOutput: '4'
    },
    {
      input: '[2,1]',
      expectedOutput: '1'
    }
  ],
  'valid-palindrome': [
    {
      input: '"A man, a plan, a canal: Panama"',
      expectedOutput: 'true'
    },
    {
      input: '"race a car"',
      expectedOutput: 'false'
    },
    {
      input: '" "',
      expectedOutput: 'true'
    },
    {
      input: '"Madam"',
      expectedOutput: 'true'
    },
    {
      input: '"No \'x\' in Nixon"',
      expectedOutput: 'true'
    }
  ],
  'longest-substring-without-repeating-characters': [
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
    },
    {
      input: '""',
      expectedOutput: '0'
    },
    {
      input: '"dvdf"',
      expectedOutput: '3'
    }
  ],
  'maximum-depth-of-binary-tree': [
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
    },
    {
      input: '[0]',
      expectedOutput: '1'
    },
    {
      input: '[1,2,3,4,5]',
      expectedOutput: '3'
    }
  ],
  'invert-binary-tree': [
    {
      input: '[4,2,7,1,3,6,9]',
      expectedOutput: '[4,7,2,9,6,3,1]'
    },
    {
      input: '[2,1,3]',
      expectedOutput: '[2,3,1]'
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
      input: '[1,2]',
      expectedOutput: '[1,null,2]'
    }
  ],
  'climbing-stairs': [
    {
      input: '2',
      expectedOutput: '2'
    },
    {
      input: '3',
      expectedOutput: '3'
    },
    {
      input: '1',
      expectedOutput: '1'
    },
    {
      input: '4',
      expectedOutput: '5'
    },
    {
      input: '5',
      expectedOutput: '8'
    }
  ],
  'house-robber': [
    {
      input: '[1,2,3,1]',
      expectedOutput: '4'
    },
    {
      input: '[2,7,9,3,1]',
      expectedOutput: '12'
    },
    {
      input: '[2,1,1,2]',
      expectedOutput: '4'
    },
    {
      input: '[1]',
      expectedOutput: '1'
    },
    {
      input: '[2,1]',
      expectedOutput: '2'
    }
  ],
  'number-of-islands': [
    {
      input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
      expectedOutput: '1'
    },
    {
      input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      expectedOutput: '3'
    },
    {
      input: '[["1"]]',
      expectedOutput: '1'
    },
    {
      input: '[["0"]]',
      expectedOutput: '0'
    },
    {
      input: '[["1","0","1"],["0","1","0"],["1","0","1"]]',
      expectedOutput: '5'
    }
  ],
  'median-of-two-sorted-arrays': [
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
    },
    {
      input: '[[], [1]]',
      expectedOutput: '1.0'
    },
    {
      input: '[[2], []]',
      expectedOutput: '2.0'
    }
  ],
  'trapping-rain-water': [
    {
      input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
      expectedOutput: '6'
    },
    {
      input: '[4,2,0,3,2,5]',
      expectedOutput: '9'
    },
    {
      input: '[3,0,0,2,0,4]',
      expectedOutput: '10'
    },
    {
      input: '[0,2,0]',
      expectedOutput: '0'
    },
    {
      input: '[1]',
      expectedOutput: '0'
    }
  ]
};

async function addTestCasesToProblem(problemId, testCases) {
  try {
    const { error } = await supabase
      .from('problems')
      .update({ 
        testCases: testCases,
        updated_at: new Date().toISOString()
      })
      .eq('id', problemId);

    if (error) {
      console.error(`❌ Error updating ${problemId}:`, error.message);
      return false;
    }

    console.log(`✅ Added ${testCases.length} test cases to "${problemId}"`);
    return true;
  } catch (err) {
    console.error(`❌ Error updating ${problemId}:`, err.message);
    return false;
  }
}

async function getProblemsWithoutTestCases() {
  try {
    const { data: problems, error } = await supabase
      .from('problems')
      .select('id, title, testCases')
      .order('order_num');

    if (error) {
      console.error('Error fetching problems:', error.message);
      return null;
    }

    // Filter problems without test cases
    const problemsWithoutTestCases = problems.filter(problem => 
      !problem.testCases || problem.testCases.length === 0
    );

    return problemsWithoutTestCases;
  } catch (err) {
    console.error('Error fetching problems:', err.message);
    return null;
  }
}

async function main() {
  console.log('🎯 Adding Test Cases to Remaining Problems\n');

  // Get problems without test cases
  const problemsWithoutTestCases = await getProblemsWithoutTestCases();
  
  if (!problemsWithoutTestCases) {
    console.log('❌ Failed to fetch problems');
    return;
  }

  console.log(`🔍 Found ${problemsWithoutTestCases.length} problems without test cases:`);
  problemsWithoutTestCases.forEach((problem, index) => {
    console.log(`${index + 1}. ${problem.title} (${problem.id})`);
  });

  console.log('\n🚀 Starting to add test cases...\n');

  let successCount = 0;
  let totalCount = 0;

  for (const problem of problemsWithoutTestCases) {
    const testCases = additionalProblemTestCases[problem.id];
    
    if (testCases) {
      totalCount++;
      const success = await addTestCasesToProblem(problem.id, testCases);
      if (success) successCount++;
    } else {
      console.log(`⚠️  No test cases defined for "${problem.title}" (${problem.id})`);
    }
  }

  console.log(`\n✅ Added test cases to ${successCount}/${totalCount} problems`);

  // Final verification
  console.log('\n🔍 Final verification...');
  
  const { data: allProblems, error } = await supabase
    .from('problems')
    .select('id, title, testCases')
    .order('order_num');

  if (!error && allProblems) {
    const problemsWithTestCases = allProblems.filter(p => p.testCases && p.testCases.length > 0);
    console.log(`\n📊 Final Summary: ${problemsWithTestCases.length}/${allProblems.length} problems now have test cases`);
    
    console.log('\n✅ Problems ready for Judge0 code execution:');
    problemsWithTestCases.forEach((problem, index) => {
      const testCaseCount = problem.testCases.length;
      console.log(`${index + 1}. ${problem.title} - ${testCaseCount} test cases`);
    });
  }

  console.log('\n🎉 All done! Your LeetCode clone is now fully equipped with Judge0 integration!');
}

main().catch(console.error);