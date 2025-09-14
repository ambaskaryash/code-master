// Script to seed all enhanced problems to Firebase
const { seedAllEnhancedProblems } = require('./src/utils/seed-database.ts');

async function runSeeding() {
  try {
    console.log('🚀 Starting enhanced problem seeding...');
    await seedAllEnhancedProblems();
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

runSeeding();