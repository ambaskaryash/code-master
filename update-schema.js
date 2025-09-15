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

async function checkCurrentSchema() {
  console.log('🔍 Checking current problems table schema...');
  
  try {
    // Check if testCases column exists by trying to select it
    const { data, error } = await supabase
      .from('problems')
      .select('testCases')
      .limit(1);

    if (error && error.message.includes('testCases does not exist')) {
      console.log('❌ testCases column does not exist');
      return false;
    } else if (error) {
      console.error('Error checking schema:', error.message);
      return null;
    } else {
      console.log('✅ testCases column already exists');
      return true;
    }
  } catch (err) {
    console.error('Error checking schema:', err.message);
    return null;
  }
}

async function addTestCasesColumn() {
  console.log('🔧 Adding testCases column to problems table...');
  
  try {
    // Add the testCases column as JSONB type
    const { error } = await supabase.rpc('exec_sql', {
      query: `
        ALTER TABLE problems 
        ADD COLUMN IF NOT EXISTS testCases JSONB DEFAULT '[]'::jsonb;
        
        COMMENT ON COLUMN problems.testCases IS 'Test cases for Judge0 code execution';
      `
    });

    if (error) {
      console.error('❌ Error adding testCases column:', error.message);
      console.log('\n💡 Manual SQL needed:');
      console.log('Please run this SQL in your Supabase SQL Editor:');
      console.log('');
      console.log('ALTER TABLE problems ADD COLUMN IF NOT EXISTS testCases JSONB DEFAULT \'[]\'::jsonb;');
      console.log('COMMENT ON COLUMN problems.testCases IS \'Test cases for Judge0 code execution\';');
      console.log('');
      return false;
    }

    console.log('✅ testCases column added successfully');
    return true;
  } catch (err) {
    console.error('❌ Error adding testCases column:', err.message);
    console.log('\n💡 Manual approach needed:');
    console.log('Please add the testCases column manually in Supabase:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to Table Editor > problems table');
    console.log('3. Add a new column:');
    console.log('   - Name: testCases');
    console.log('   - Type: jsonb');
    console.log('   - Default value: []');
    console.log('   - Nullable: true');
    return false;
  }
}

async function verifySchema() {
  console.log('🔍 Verifying schema update...');
  
  try {
    // Try to select testCases column
    const { data, error } = await supabase
      .from('problems')
      .select('id, title, testCases')
      .limit(1);

    if (error) {
      console.error('❌ Schema verification failed:', error.message);
      return false;
    }

    console.log('✅ Schema verification successful');
    
    if (data && data.length > 0) {
      const problem = data[0];
      console.log(`📊 Sample: ${problem.title} - testCases: ${JSON.stringify(problem.testCases)}`);
    }
    
    return true;
  } catch (err) {
    console.error('❌ Schema verification failed:', err.message);
    return false;
  }
}

async function main() {
  console.log('🏗️  Database Schema Update for Judge0 Integration\n');
  
  // Check current schema
  const hasTestCases = await checkCurrentSchema();
  
  if (hasTestCases === null) {
    console.log('❌ Unable to check current schema');
    process.exit(1);
  }
  
  if (hasTestCases) {
    console.log('✅ Database already has testCases column. No update needed.');
    return;
  }
  
  // Add testCases column
  console.log('');
  const updateSuccess = await addTestCasesColumn();
  
  if (!updateSuccess) {
    console.log('\n❌ Schema update failed');
    process.exit(1);
  }
  
  // Verify the update
  console.log('');
  const verifySuccess = await verifySchema();
  
  if (!verifySuccess) {
    console.log('\n❌ Schema verification failed');
    process.exit(1);
  }
  
  console.log('\n🎉 Schema update completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Run: node migrate-add-testcases.js (to add test cases to existing problems)');
  console.log('   2. Run: node import-problems.js (to import new problems with test cases)');
  console.log('   3. Test Judge0 code execution in your app');
}

main().catch(console.error);