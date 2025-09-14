import React, { useMemo } from 'react';
import { DBProblem } from '@/utils/types/problem';
import { BsCheckCircle } from 'react-icons/bs';
import { HiTrendingUp } from 'react-icons/hi';

type ProblemStatsProps = {
  problems: DBProblem[];
  solvedProblems: string[];
};

const ProblemStats: React.FC<ProblemStatsProps> = ({ problems, solvedProblems }) => {
  const stats = useMemo(() => {
    const totalProblems = problems.length;
    const solvedCount = solvedProblems.length;
    const solvedPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
    
    const difficultyStats = problems.reduce((acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryStats = problems.reduce((acc, problem) => {
      acc[problem.category] = (acc[problem.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4);

    return {
      totalProblems,
      solvedCount,
      solvedPercentage,
      difficultyStats,
      topCategories
    };
  }, [problems, solvedProblems]);

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Problems */}
      <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-blue-400 text-sm font-medium">Total Problems</h3>
            <p className="text-2xl font-bold text-white mt-1">{stats.totalProblems}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <HiTrendingUp className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Solved Problems */}
      <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-green-400 text-sm font-medium">Solved</h3>
            <p className="text-2xl font-bold text-white mt-1">{stats.solvedCount}</p>
            <p className="text-xs text-green-300 mt-1">{stats.solvedPercentage}% complete</p>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <BsCheckCircle className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-dark-layer-1 border border-gray-600 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-medium mb-3">Difficulty</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-green-400 text-xs">Easy</span>
            <span className="text-white text-sm font-medium">{stats.difficultyStats.Easy || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-400 text-xs">Medium</span>
            <span className="text-white text-sm font-medium">{stats.difficultyStats.Medium || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-400 text-xs">Hard</span>
            <span className="text-white text-sm font-medium">{stats.difficultyStats.Hard || 0}</span>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-dark-layer-1 border border-gray-600 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-medium mb-3">Top Categories</h3>
        <div className="space-y-2">
          {stats.topCategories.map(([category, count]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-400 text-xs truncate flex-1 mr-2">{category}</span>
              <span className="text-white text-sm font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemStats;