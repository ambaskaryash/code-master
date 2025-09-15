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

// Test cases for existing problems
const problemTestCases = {
  'two-sum': [
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
  ],
  'reverse-linked-list': [
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
  ],
  'valid-parentheses': [
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
};

async function checkExistingProblems() {
  console.log('🔍 Checking existing problems in database...');
  
  try {
    const { data: problems, error } = await supabase
      .from('problems')
      .select('id, title, testCases')
      .order('order_num');

    if (error) {
      console.error('Error fetching problems:', error.message);
      return null;
    }

    console.log(`Found ${problems.length} problems in database:`);
    problems.forEach((problem, index) => {
      const hasTestCases = problem.testCases && problem.testCases.length > 0;
      console.log(`${index + 1}. ${problem.title} (${problem.id}) - Test Cases: ${hasTestCases ? '✅' : '❌'}`);
    });

    return problems;
  } catch (err) {
    console.error('Error checking existing problems:', err.message);
    return null;
  }
}

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

async function migrateTestCases(force = false) {
  console.log('🚀 Starting test cases migration...\n');
  
  const existingProblems = await checkExistingProblems();
  if (!existingProblems) {
    console.log('❌ Failed to fetch existing problems');
    return false;
  }

  console.log('\n📝 Migration plan:');
  let migrateCount = 0;
  
  for (const problem of existingProblems) {
    const hasTestCases = problem.testCases && problem.testCases.length > 0;
    const hasTestCasesInMigration = problemTestCases[problem.id];
    
    if (hasTestCasesInMigration) {
      if (!hasTestCases || force) {
        console.log(`   • ${problem.title} (${problem.id}) - Will add ${problemTestCases[problem.id].length} test cases`);
        migrateCount++;
      } else {
        console.log(`   • ${problem.title} (${problem.id}) - Already has test cases (use --force to overwrite)`);
      }
    } else {
      console.log(`   • ${problem.title} (${problem.id}) - No test cases defined in migration script`);
    }
  }

  if (migrateCount === 0) {
    console.log('\n✅ No problems need migration. All problems already have test cases or no test cases are defined.');
    return true;
  }

  console.log(`\n🎯 Ready to migrate ${migrateCount} problem(s)`);
  console.log('⚠️  This will modify your database. Make sure you have a backup!');
  
  // For automation, we'll proceed. In interactive mode, you'd want to prompt here
  console.log('\n🔧 Starting migration...');
  
  let successCount = 0;
  for (const problem of existingProblems) {
    const hasTestCases = problem.testCases && problem.testCases.length > 0;
    const testCasesToAdd = problemTestCases[problem.id];
    
    if (testCasesToAdd && (!hasTestCases || force)) {
      const success = await addTestCasesToProblem(problem.id, testCasesToAdd);
      if (success) successCount++;
    }
  }

  console.log(`\n✅ Migration completed! ${successCount}/${migrateCount} problems updated successfully.`);
  return true;
}

async function verifyMigration() {
  console.log('\n🔍 Verifying migration...');
  
  try {
    const { data: problems, error } = await supabase
      .from('problems')
      .select('id, title, testCases')
      .order('order_num');

    if (error) {
      console.error('Error verifying migration:', error.message);
      return false;
    }

    console.log('\n📊 Migration Results:');
    let problemsWithTestCases = 0;
    
    problems.forEach((problem, index) => {
      const testCaseCount = problem.testCases ? problem.testCases.length : 0;
      const status = testCaseCount > 0 ? '✅' : '❌';
      console.log(`${index + 1}. ${problem.title} - ${testCaseCount} test cases ${status}`);
      if (testCaseCount > 0) problemsWithTestCases++;
    });

    console.log(`\n📈 Summary: ${problemsWithTestCases}/${problems.length} problems have test cases`);
    return true;
  } catch (err) {
    console.error('Error verifying migration:', err.message);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');
  
  console.log('🎯 LeetCode Problems Test Cases Migration\n');
  
  if (force) {
    console.log('⚠️  Force mode enabled - will overwrite existing test cases\n');
  }

  // Run migration
  const migrationSuccess = await migrateTestCases(force);
  if (!migrationSuccess) {
    console.log('\n❌ Migration failed');
    process.exit(1);
  }

  // Verify results
  await verifyMigration();
  
  console.log('\n🎉 Migration completed successfully!');
  console.log('\n💡 Your problems now have test cases for Judge0 code execution!');
  console.log('\n📝 Next steps:');
  console.log('   1. Test code execution in your app');
  console.log('   2. Run: node import-problems.js (to add any new problems)');
  console.log('   3. Verify everything works as expected');
}

main().catch(console.error);