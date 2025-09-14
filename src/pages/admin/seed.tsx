import { useState } from 'react';
import { seedAllProblems, addMonitoringSetupProblem, addNewDatabaseProblems, seedLeetCodeProblems, seedAllEnhancedProblems } from '@/utils/seed-database';
import { toast } from 'react-toastify';

const SeedPage = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isAddingMonitoring, setIsAddingMonitoring] = useState(false);
  const [isAddingNewProblems, setIsAddingNewProblems] = useState(false);
  const [isSeedingLeetCode, setIsSeedingLeetCode] = useState(false);
  const [isSeedingEnhanced, setIsSeedingEnhanced] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSeedAll = async () => {
    setIsSeeding(true);
    setResults([]);
    
    try {
      await seedAllProblems();
      toast.success('All problems seeded successfully!');
      setResults(prev => [...prev, '✅ All problems seeded to Firestore']);
    } catch (error: any) {
      toast.error(`Error seeding problems: ${error.message}`);
      setResults(prev => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleAddMonitoring = async () => {
    setIsAddingMonitoring(true);
    
    try {
      await addMonitoringSetupProblem();
      toast.success('Monitoring setup problem added successfully!');
      setResults(prev => [...prev, '✅ Monitoring setup problem added to Firestore']);
    } catch (error: any) {
      toast.error(`Error adding monitoring problem: ${error.message}`);
      setResults(prev => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsAddingMonitoring(false);
    }
  };

  const handleAddNewProblems = async () => {
    setIsAddingNewProblems(true);
    
    try {
      await addNewDatabaseProblems();
      toast.success('New SQL/Docker/Database problems added successfully!');
      setResults(prev => [...prev, '✅ New SQL/Docker/Database problems added to Firestore']);
    } catch (error: any) {
      toast.error(`Error adding new problems: ${error.message}`);
      setResults(prev => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsAddingNewProblems(false);
    }
  };

  const handleSeedLeetCode = async () => {
    setIsSeedingLeetCode(true);
    
    try {
      await seedLeetCodeProblems();
      toast.success('LeetCode-style problems seeded successfully!');
      setResults(prev => [...prev, '✅ LeetCode-style problems with enhanced features seeded to Firestore']);
    } catch (error: any) {
      toast.error(`Error seeding LeetCode problems: ${error.message}`);
      setResults(prev => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsSeedingLeetCode(false);
    }
  };

  const handleSeedAllEnhanced = async () => {
    setIsSeedingEnhanced(true);
    setResults([]);
    
    try {
      await seedAllEnhancedProblems();
      toast.success('🎉 All enhanced problems with comprehensive test cases seeded successfully!');
      setResults(prev => [...prev, '✅ All problems enhanced with comprehensive LeetCode-style data and test cases!']);
      setResults(prev => [...prev, '🚀 All problems are now Ready to Solve with working test cases!']);
    } catch (error: any) {
      toast.error(`Error seeding enhanced problems: ${error.message}`);
      setResults(prev => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsSeedingEnhanced(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-layer-2 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Firebase Database Seeding</h1>
        
        <div className="bg-dark-layer-1 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Seed Problems to Firebase</h2>
          <p className="text-gray-300 mb-4">
            This will add all problems from the mock data to your Firestore database.
            It will merge with existing data, so it&apos;s safe to run multiple times.
          </p>
          
          {/* RECOMMENDED: Enhanced All-in-One Seeding */}
          <div className="bg-green-900 border border-green-600 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2 text-green-100">🚀 RECOMMENDED: Enhanced All Problems</h3>
            <p className="text-green-200 text-sm mb-3">
              This seeds ALL problems with comprehensive LeetCode-style features including test cases, 
              making them all Ready to Solve! This includes existing problems + new LeetCode problems.
            </p>
            <button
              onClick={handleSeedAllEnhanced}
              disabled={isSeedingEnhanced}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 px-8 py-3 rounded-lg transition-colors font-semibold text-lg"
            >
              {isSeedingEnhanced ? '🔄 Seeding ALL Enhanced Problems...' : '🚀 Seed ALL Enhanced Problems (RECOMMENDED)'}
            </button>
          </div>
          
          <h4 className="text-md font-medium mb-3 text-gray-300">Individual Seeding Options:</h4>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleSeedAll}
              disabled={isSeeding}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 py-2 rounded-lg transition-colors"
            >
              {isSeeding ? 'Seeding All Problems...' : 'Seed All Problems'}
            </button>
            
            <button
              onClick={handleAddMonitoring}
              disabled={isAddingMonitoring}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 px-6 py-2 rounded-lg transition-colors"
            >
              {isAddingMonitoring ? 'Adding Monitoring Problem...' : 'Add Monitoring Problem Only'}
            </button>
            
            <button
              onClick={handleAddNewProblems}
              disabled={isAddingNewProblems}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 px-6 py-2 rounded-lg transition-colors"
            >
              {isAddingNewProblems ? 'Adding New Problems...' : 'Add New SQL/Docker/Database Problems'}
            </button>
            
            <button
              onClick={handleSeedLeetCode}
              disabled={isSeedingLeetCode}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 px-6 py-2 rounded-lg transition-colors"
            >
              {isSeedingLeetCode ? 'Seeding LeetCode Problems...' : 'Seed LeetCode-Style Problems'}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-dark-layer-1 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-900 border border-yellow-600 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">⚠️ Important Notes</h3>
          <ul className="text-sm space-y-1">
            <li>• Make sure you have proper Firebase configuration in .env.local</li>
            <li>• This requires write permissions to the Firestore &apos;problems&apos; collection</li>
            <li>• Check your browser console for detailed logs</li>
            <li>• After seeding, the new problems should appear in the main problems table</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedPage;