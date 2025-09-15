import React, { useState } from 'react';
import CodeMasterHeader from '@/components/Header/LeetCodeHeader';
import useHasMounted from '@/hooks/useHasMounted';
import { 
  BsChatDots, 
  BsHeart, 
  BsHeartFill,
  BsReply,
  BsEye,
  BsPin,
  BsFire,
  BsStarFill,
  BsArrowUp,
  BsArrowDown,
  BsClock,
  BsPerson,
  BsTag,
  BsPlus,
  BsSearch,
  BsFilter
} from 'react-icons/bs';
import { FiMessageCircle, FiTrendingUp } from 'react-icons/fi';

export default function Discuss() {
  const hasMounted = useHasMounted();
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'problems' | 'interview' | 'career'>('all');

  if (!hasMounted) {
    return null;
  }

  const categories = [
    { id: 'all', label: 'All Posts', count: 1234 },
    { id: 'general', label: 'General Discussion', count: 456 },
    { id: 'problems', label: 'Problem Discussion', count: 789 },
    { id: 'interview', label: 'Interview Questions', count: 234 },
    { id: 'career', label: 'Career Advice', count: 123 }
  ];

  const discussions = [
    {
      id: 1,
      title: 'How to approach Dynamic Programming problems systematically?',
      author: 'coding_enthusiast_2024',
      avatar: '💡',
      content: 'I\'ve been struggling with DP problems. Can someone share a systematic approach to tackle them?',
      category: 'general',
      tags: ['dynamic-programming', 'algorithms', 'learning'],
      upvotes: 142,
      downvotes: 3,
      replies: 28,
      views: 1456,
      timeAgo: '2 hours ago',
      isPinned: true,
      isHot: true,
      solved: false
    },
    {
      id: 2,
      title: 'Two Sum - Alternative O(n) solution without HashMap',
      author: 'algorithm_master',
      avatar: '🧠',
      content: 'Found an interesting approach to solve Two Sum without using extra space. Thoughts?',
      category: 'problems',
      tags: ['arrays', 'two-pointers', 'optimization'],
      upvotes: 89,
      downvotes: 12,
      replies: 15,
      views: 892,
      timeAgo: '4 hours ago',
      isPinned: false,
      isHot: true,
      solved: true
    },
    {
      id: 3,
      title: 'FAANG Interview Experience - Google L4 SWE',
      author: 'new_googler_2024',
      avatar: '🎯',
      content: 'Just got an offer from Google! Sharing my complete interview experience and preparation journey.',
      category: 'interview',
      tags: ['google', 'interview', 'experience'],
      upvotes: 234,
      downvotes: 5,
      replies: 47,
      views: 3241,
      timeAgo: '6 hours ago',
      isPinned: false,
      isHot: true,
      solved: false
    },
    {
      id: 4,
      title: 'Should I switch from Backend to Machine Learning?',
      author: 'career_confused',
      avatar: '🤔',
      content: 'Have 3 YOE in backend development. Considering ML transition. Need advice on career path.',
      category: 'career',
      tags: ['career-switch', 'machine-learning', 'backend'],
      upvotes: 67,
      downvotes: 8,
      replies: 23,
      views: 567,
      timeAgo: '8 hours ago',
      isPinned: false,
      isHot: false,
      solved: false
    },
    {
      id: 5,
      title: 'Binary Tree Inorder Traversal - Recursive vs Iterative',
      author: 'tree_explorer',
      avatar: '🌳',
      content: 'Comparing different approaches for binary tree traversal. Which one do you prefer and why?',
      category: 'problems',
      tags: ['binary-tree', 'traversal', 'recursion'],
      upvotes: 45,
      downvotes: 2,
      replies: 12,
      views: 234,
      timeAgo: '12 hours ago',
      isPinned: false,
      isHot: false,
      solved: true
    },
    {
      id: 6,
      title: 'CodeMaster Weekly Challenge Discussion',
      author: 'challenge_moderator',
      avatar: '⚡',
      content: 'Discuss this week\'s challenge problem and share your solutions!',
      category: 'general',
      tags: ['weekly-challenge', 'community'],
      upvotes: 156,
      downvotes: 1,
      replies: 89,
      views: 2134,
      timeAgo: '1 day ago',
      isPinned: true,
      isHot: false,
      solved: false
    }
  ];

  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === activeCategory);

  const popularTags = [
    { name: 'dynamic-programming', count: 234 },
    { name: 'arrays', count: 189 },
    { name: 'binary-tree', count: 156 },
    { name: 'interview', count: 145 },
    { name: 'algorithms', count: 134 },
    { name: 'leetcode', count: 123 },
    { name: 'career-advice', count: 98 },
    { name: 'system-design', count: 87 }
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CodeMasterHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center mb-3">
              <BsChatDots className="w-8 h-8 text-[#FFA116] mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Discuss
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Connect with the community, share knowledge, and get help
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-[#FFA116] text-white rounded-md hover:bg-[#FF9500] transition-colors text-sm font-medium">
            <BsPlus className="mr-2 w-4 h-4" />
            New Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <BsFilter className="mr-2 w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-[#FFA116] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-lg">{discussion.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {discussion.author}
                          </h3>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {discussion.timeAgo}
                          </span>
                          {discussion.isPinned && (
                            <BsPin className="w-4 h-4 text-[#FFA116]" />
                          )}
                          {discussion.isHot && (
                            <BsFire className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {discussion.solved && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs font-medium rounded">
                          Solved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title and Content */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-[#FFA116] cursor-pointer transition-colors">
                      {discussion.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {discussion.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-[#FFA116] hover:text-white cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <BsArrowUp className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-green-600" />
                          </button>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {discussion.upvotes - discussion.downvotes}
                          </span>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <BsArrowDown className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <BsReply className="w-4 h-4 mr-1" />
                        {discussion.replies}
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <BsEye className="w-4 h-4 mr-1" />
                        {discussion.views}
                      </div>
                    </div>

                    <button className="flex items-center px-3 py-1.5 text-sm text-[#FFA116] hover:bg-[#FFA116] hover:text-white border border-[#FFA116] rounded transition-colors">
                      Join Discussion
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Load More Discussions
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                  <span className="font-medium text-gray-900 dark:text-white">12,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                  <span className="font-medium text-gray-900 dark:text-white">3,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Solutions Shared</span>
                  <span className="font-medium text-gray-900 dark:text-white">8,734</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-medium text-green-600">+234</span>
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag.name}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-[#FFA116] hover:text-white transition-colors"
                  >
                    #{tag.name}
                    <span className="ml-1 text-xs opacity-75">({tag.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Contributors */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Contributors
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'coding_guru_2024', points: 456, avatar: '🏆' },
                  { name: 'algorithm_expert', points: 389, avatar: '⭐' },
                  { name: 'helpful_coder', points: 312, avatar: '💡' },
                  { name: 'problem_solver', points: 267, avatar: '🎯' }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm">{contributor.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {contributor.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#FFA116]">
                      {contributor.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}