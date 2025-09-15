import React, { useState } from 'react';
import CodeMasterHeader from '@/components/Header/LeetCodeHeader';
import useHasMounted from '@/hooks/useHasMounted';
import { 
  BsTrophy, 
  BsClock, 
  BsPeople, 
  BsCalendarEvent,
  BsPlay,
  BsAward,
  BsAward as BsMedal,
  BsStar,
  BsChevronRight,
  BsBarChart,
  BsGlobe,
  BsLightning,
  BsCup
} from 'react-icons/bs';
import { FiUsers, FiTrendingUp, FiClock } from 'react-icons/fi';

export default function Contest() {
  const hasMounted = useHasMounted();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'leaderboard'>('upcoming');

  if (!hasMounted) {
    return null;
  }

  const upcomingContests = [
    {
      id: 1,
      title: 'Weekly Contest 372',
      startTime: '2024-01-28 10:30 AM EST',
      duration: '1h 30m',
      participants: 0,
      status: 'upcoming',
      difficulty: 'Mixed',
      problems: 4,
      prize: '$500'
    },
    {
      id: 2,
      title: 'Biweekly Contest 120',
      startTime: '2024-02-03 8:00 PM EST',
      duration: '1h 30m',
      participants: 0,
      status: 'upcoming',
      difficulty: 'Mixed',
      problems: 4,
      prize: '$1000'
    },
    {
      id: 3,
      title: 'Monthly Challenge February',
      startTime: '2024-02-01 12:00 AM EST',
      duration: '30 days',
      participants: 0,
      status: 'upcoming',
      difficulty: 'All Levels',
      problems: 28,
      prize: 'Certificates'
    }
  ];

  const pastContests = [
    {
      id: 4,
      title: 'Weekly Contest 371',
      startTime: '2024-01-21 10:30 AM EST',
      duration: '1h 30m',
      participants: 23847,
      status: 'completed',
      difficulty: 'Mixed',
      problems: 4,
      winner: 'coding_master_99',
      score: '16/16'
    },
    {
      id: 5,
      title: 'Biweekly Contest 119',
      startTime: '2024-01-20 8:00 PM EST',
      duration: '1h 30m',
      participants: 18432,
      status: 'completed',
      difficulty: 'Mixed',
      problems: 4,
      winner: 'algorithm_ace',
      score: '15/16'
    },
    {
      id: 6,
      title: 'January Challenge 2024',
      startTime: '2024-01-01 12:00 AM EST',
      duration: '31 days',
      participants: 156780,
      status: 'completed',
      difficulty: 'All Levels',
      problems: 31,
      winner: 'daily_coder_2024',
      score: '31/31'
    }
  ];

  const leaderboard = [
    { rank: 1, user: 'coding_master_99', score: 3247, contests: 156, avatar: '🏆' },
    { rank: 2, user: 'algorithm_ace', score: 3198, contests: 142, avatar: '🥈' },
    { rank: 3, user: 'data_structure_pro', score: 3089, contests: 138, avatar: '🥉' },
    { rank: 4, user: 'binary_search_king', score: 2956, contests: 134, avatar: '👑' },
    { rank: 5, user: 'dp_master', score: 2834, contests: 128, avatar: '⭐' },
    { rank: 6, user: 'graph_guru', score: 2789, contests: 125, avatar: '💫' },
    { rank: 7, user: 'tree_traverser', score: 2745, contests: 121, avatar: '🌟' },
    { rank: 8, user: 'sorting_specialist', score: 2698, contests: 118, avatar: '✨' },
    { rank: 9, user: 'greedy_optimizer', score: 2656, contests: 115, avatar: '⚡' },
    { rank: 10, user: 'recursive_rebel', score: 2612, contests: 112, avatar: '🔥' }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: BsClock },
    { id: 'past', label: 'Past Contests', icon: BsTrophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: BsMedal }
  ] as const;

  const getTimeUntilContest = (startTime: string) => {
    // Mock time calculation - in real app would be dynamic
    return '2d 15h 30m';
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CodeMasterHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <BsTrophy className="w-8 h-8 text-[#FFA116] mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Contests
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Compete with programmers worldwide and test your skills
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                <BsCalendarEvent className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
                <BsPeople className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45.2K</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Participants</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-4">
                <BsLightning className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contests Held</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg mr-4">
                <BsCup className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$15K</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prize Pool</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-[#FFA116] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Upcoming Contests */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">
                        {contest.title}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                        {contest.difficulty}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsClock className="w-4 h-4 mr-2" />
                        {contest.startTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FiClock className="w-4 h-4 mr-2" />
                        {contest.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsBarChart className="w-4 h-4 mr-2" />
                        {contest.problems} problems
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsAward className="w-4 h-4 mr-2" />
                        {contest.prize}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Starts in: </span>
                        <span className="font-semibold text-[#FFA116]">
                          {getTimeUntilContest(contest.startTime)}
                        </span>
                      </div>
                      <button className="flex items-center px-4 py-2 bg-[#FFA116] text-white rounded-md hover:bg-[#FF9500] transition-colors text-sm font-medium">
                        <BsPlay className="mr-2 w-4 h-4" />
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Contests */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">
                        {contest.title}
                      </h3>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                        Completed
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FiUsers className="w-4 h-4 mr-2" />
                        {contest.participants.toLocaleString()} participants
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsBarChart className="w-4 h-4 mr-2" />
                        {contest.problems} problems
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsTrophy className="w-4 h-4 mr-2" />
                        Winner: {contest.winner}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BsStar className="w-4 h-4 mr-2" />
                        Score: {contest.score}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {contest.startTime} • {contest.duration}
                      </div>
                      <button className="flex items-center px-4 py-2 border border-[#FFA116] text-[#FFA116] rounded-md hover:bg-[#FFA116] hover:text-white transition-colors text-sm font-medium">
                        View Results
                        <BsChevronRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Global Contest Leaderboard
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Top performers across all contests
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboard.map((user) => (
                <div key={user.rank} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
                        <span className="text-lg">{user.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className={`text-lg font-bold mr-3 ${
                            user.rank <= 3 
                              ? 'text-[#FFA116]' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            #{user.rank}
                          </span>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {user.user}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.contests} contests participated
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {user.score}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        points
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}