const admin = require('firebase-admin');
const { problems } = require('../src/mockProblems/problems');

// Initialize Firebase Admin (you'll need to set up service account)
// For now, this is a template script - you'll need to configure with your Firebase credentials

async function seedProblems() {
  try {
    // Initialize Firebase Admin with service account key
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   projectId: "leetcode-3ed2f"
    // });
    
    console.log('🔥 Firebase Admin initialized');
    const db = admin.firestore();
    
    console.log('📊 Starting to seed problems...');
    
    // Add each problem to Firestore
    for (const problem of problems) {
      const docRef = db.collection('problems').doc(problem.id);
      
      const problemData = {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        videoId: problem.videoId || '',
        tags: problem.tags || [],
        isImplemented: problem.isImplemented,
        likes: 0,
        dislikes: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await docRef.set(problemData, { merge: true });
      console.log(`✅ Added/Updated: ${problem.title} (${problem.id})`);
    }
    
    console.log('🎉 All problems seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
    process.exit(1);
  }
}

// Manual problem data for monitoring-setup if you want to add it directly
const monitoringSetupProblem = {
  id: "monitoring-setup",
  title: "Monitoring: Prometheus & Alerting",
  difficulty: "Medium",
  category: "DevOps",
  order: 12,
  videoId: "",
  tags: ["DevOps", "Monitoring", "Prometheus", "Alerting", "YAML"],
  isImplemented: true,
  likes: 0,
  dislikes: 0
};

async function addMonitoringProblem() {
  try {
    console.log('🔥 Adding monitoring setup problem to Firebase...');
    
    // For now, this will show you the data structure
    console.log('Problem data to add:', JSON.stringify(monitoringSetupProblem, null, 2));
    
    // Uncomment and configure when you have Firebase Admin set up:
    /*
    const db = admin.firestore();
    const docRef = db.collection('problems').doc(monitoringSetupProblem.id);
    
    const problemData = {
      ...monitoringSetupProblem,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await docRef.set(problemData, { merge: true });
    console.log('✅ Monitoring setup problem added successfully!');
    */
    
  } catch (error) {
    console.error('❌ Error adding monitoring problem:', error);
  }
}

// Run the function
if (require.main === module) {
  addMonitoringProblem();
}

module.exports = { seedProblems, addMonitoringProblem, monitoringSetupProblem };