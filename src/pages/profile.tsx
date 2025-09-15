import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { 
  getUserProfile, 
  getUserStats, 
  getUserDailyActivity, 
  getUserBadges, 
  getUserRecentAttempts 
} from '@/lib/supabase';
import LeetCodeHeader from '@/components/Header/LeetCodeHeader';
import { useRouter } from 'next/router';
import { 
  IoCalendarOutline,
  IoTrophyOutline,
  IoFlashOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCodeSlashOutline,
  IoStatsChartOutline,
  IoBookmarkOutline,
  IoSettingsOutline
} from 'react-icons/io5';
import { BsCheck2Circle, BsLightningCharge, BsFire } from 'react-icons/bs';

interface UserStats {
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  total_submissions: number;
  acceptanceRate: number;
  current_streak: number;
  max_streak: number;
  global_ranking?: number;
  contest_rating: number;
  created_at: string;
  last_solved_at?: string;
}

interface RecentSubmission {
  problem_id: string;
  attempt_number: number;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtime?: number;
  memory?: number;
  created_at: string;
  problems: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
}

interface HeatmapData {
  [date: string]: number; // date -> number of problems solved
}

const ProfilePage: React.FC = () => {
  const { user, loading: authLoading } = useSupabaseAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData>({});
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'achievements' | 'notes'>('overview');
  const router = useRouter();

  useEffect(() => {
    console.log('Profile page useEffect - Auth state:', { user, authLoading });
    
    // Don't redirect while authentication is still loading
    if (authLoading) {
      console.log('Auth is still loading, waiting...');
      return;
    }
    
    if (!user) {
      console.log('No user found, redirecting to auth...');
      router.push('/auth');
      return;
    }

    console.log('User found, fetching profile...');
    fetchUserProfile();
  }, [user, router, authLoading]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch all user data in parallel
      const [stats, dailyActivity, userBadges, recentAttempts] = await Promise.all([
        getUserStats(user.id),
        getUserDailyActivity(user.id, 365),
        getUserBadges(user.id),
        getUserRecentAttempts(user.id, 20)
      ]);
      
      setUserStats(stats);
      setBadges(userBadges);
      setRecentSubmissions(recentAttempts as RecentSubmission[]);
      
      // Build heatmap from daily activity
      const heatmap: HeatmapData = {};
      const today = new Date();
      
      // Initialize all days in the past year with 0
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        heatmap[dateString] = 0;
      }
      
      // Fill in actual activity data
      dailyActivity.forEach(activity => {
        heatmap[activity.date] = activity.problems_solved;
      });
      
      setHeatmapData(heatmap);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-leetcode-easy';
      case 'Medium': return 'text-leetcode-medium'; 
      case 'Hard': return 'text-leetcode-hard';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'text-leetcode-easy';
      case 'Wrong Answer': return 'text-red-500';
      case 'Time Limit Exceeded': return 'text-yellow-500';
      case 'Runtime Error': return 'text-orange-500';
      default: return 'text-gray-400';
    }
  };

  const renderHeatmap = () => {
    const today = new Date();
    const weeks = [];
    
    // Generate 52 weeks of heatmap
    for (let week = 0; week < 52; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));
        const dateString = date.toISOString().split('T')[0];
        const count = heatmapData[dateString] || 0;
        
        const intensity = count === 0 ? 0 : count <= 1 ? 1 : count <= 2 ? 2 : count <= 3 ? 3 : 4;
        const colors = [
          'bg-gray-100 dark:bg-gray-800',
          'bg-green-200 dark:bg-green-900',
          'bg-green-300 dark:bg-green-700', 
          'bg-green-400 dark:bg-green-600',
          'bg-green-500 dark:bg-green-500'
        ];
        
        days.push(
          <div
            key={`${week}-${day}`}
            className={`w-3 h-3 rounded-sm ${colors[intensity]} border border-gray-200 dark:border-gray-700`}
            title={`${dateString}: ${count} problems solved`}
          />
        );
      }
      weeks.push(
        <div key={week} className="flex flex-col gap-1">
          {days}
        </div>
      );
    }
    
    return (
      <div className="flex gap-1 overflow-x-auto">
        {weeks.reverse()}
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LeetCodeHeader />
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leetcode-orange"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading authentication...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LeetCodeHeader />
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leetcode-orange"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LeetCodeHeader />
      
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-10">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-leetcode-orange rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.user_metadata?.display_name || user.email?.split('@')[0]}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Ranking: #{userStats?.global_ranking?.toLocaleString() || 'Unranked'}</span>
                  <span>•</span>
                  <span>Contest Rating: {userStats?.contest_rating}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/settings')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <IoSettingsOutline className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.problems_solved || 0}</p>
              </div>
              <BsCheck2Circle className="w-8 h-8 text-leetcode-easy" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.acceptanceRate}%</p>
              </div>
              <IoStatsChartOutline className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.current_streak || 0}</p>
              </div>
              <BsFire className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.total_submissions || 0}</p>
              </div>
              <IoCodeSlashOutline className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: IoStatsChartOutline },
                { key: 'submissions', label: 'Submissions', icon: IoCodeSlashOutline },
                { key: 'achievements', label: 'Achievements', icon: IoTrophyOutline },
                { key: 'notes', label: 'Notes', icon: IoBookmarkOutline }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-leetcode-orange text-leetcode-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Problem Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Problem Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-leetcode-easy">{userStats?.easy_solved || 0}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-leetcode-medium">{userStats?.medium_solved || 0}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-leetcode-hard">{userStats?.hard_solved || 0}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
                    </div>
                  </div>
                </div>

                {/* Activity Heatmap */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {Object.values(heatmapData).reduce((sum, count) => sum + count, 0)} problems solved in the last year
                      </p>
                    </div>
                    {renderHeatmap()}
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Less</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
                        <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></div>
                        <div className="w-3 h-3 bg-green-300 dark:bg-green-700 rounded-sm"></div>
                        <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm"></div>
                        <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-sm"></div>
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Submissions</h3>
                <div className="space-y-3">
                  {recentSubmissions.map((submission, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${submission.status === 'Accepted' ? 'bg-leetcode-easy' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{submission.problems.title}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className={getDifficultyColor(submission.problems.difficulty)}>{submission.problems.difficulty}</span>
                            <span>•</span>
                            <span>{submission.language}</span>
                            <span>•</span>
                            <span className={getStatusColor(submission.status)}>{submission.status}</span>
                            <span>•</span>
                            <span>Attempt #{submission.attempt_number}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                        <div>{submission.runtime}ms</div>
                        <div>{submission.memory}MB</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badges & Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.length > 0 ? badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-leetcode-orange/10 to-yellow-400/10 rounded-lg border border-leetcode-orange/20">
                      <IoTrophyOutline className="w-8 h-8 text-leetcode-orange" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{badge.badge_name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Earned {new Date(badge.earned_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <IoTrophyOutline className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No badges earned yet!</p>
                      <p className="text-sm text-gray-400 mt-2">Start solving problems to earn your first badge.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Notes</h3>
                <div className="text-center py-12">
                  <IoBookmarkOutline className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Personal notes feature coming soon!</p>
                  <p className="text-sm text-gray-400 mt-2">Keep track of your problem-solving strategies and insights.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;