import React from 'react';
import CodeMasterHeader from '@/components/Header/LeetCodeHeader';
import useHasMounted from '@/hooks/useHasMounted';
import Link from 'next/link';
import { 
  BsCode, 
  BsGraphUp as BsGraph,
  BsTree, 
  BsStack,
  BsSearch,
  BsSortDown,
  BsHash,
  BsCalculator,
  BsLightning,
  BsTrophy,
  BsBookmark,
  BsArrowRight,
  BsPlay,
  BsClipboardData
} from 'react-icons/bs';
import { FiDatabase, FiGrid } from 'react-icons/fi';
import { AiOutlineNodeIndex } from 'react-icons/ai';

export default function Explore() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const categories = [
    {
      id: 'arrays',
      title: 'Arrays',
      icon: FiGrid,
      description: 'Master array manipulation and algorithms',
      problems: 156,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      id: 'strings',
      title: 'Strings',
      icon: BsHash,
      description: 'String processing and pattern matching',
      problems: 89,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      icon: AiOutlineNodeIndex,
      description: 'Pointer manipulation and node operations',
      problems: 45,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    {
      id: 'trees',
      title: 'Trees',
      icon: BsTree,
      description: 'Binary trees, BST, and tree traversals',
      problems: 78,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600'
    },
    {
      id: 'graphs',
      title: 'Graphs',
      icon: BsGraph,
      description: 'Graph algorithms and traversals',
      problems: 67,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600'
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      icon: BsCalculator,
      description: 'Optimization and memoization techniques',
      problems: 92,
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600'
    },
    {
      id: 'sorting-searching',
      title: 'Sorting & Searching',
      icon: BsSearch,
      description: 'Search algorithms and sorting techniques',
      problems: 54,
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600'
    },
    {
      id: 'stack-queue',
      title: 'Stack & Queue',
      icon: BsStack,
      description: 'LIFO and FIFO data structure problems',
      problems: 38,
      color: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-600'
    }
  ];

  const studyPaths = [
    {
      title: 'Interview Preparation',
      description: 'Essential problems for coding interviews',
      problems: 75,
      duration: '4-6 weeks',
      difficulty: 'Beginner to Advanced',
      icon: BsTrophy
    },
    {
      title: 'Data Structures Fundamentals',
      description: 'Core data structures every programmer should know',
      problems: 50,
      duration: '3-4 weeks',
      difficulty: 'Beginner',
      icon: FiDatabase
    },
    {
      title: 'Algorithm Design Patterns',
      description: 'Common algorithmic patterns and techniques',
      problems: 60,
      duration: '5-7 weeks',
      difficulty: 'Intermediate',
      icon: BsCode
    },
    {
      title: 'Advanced Problem Solving',
      description: 'Complex problems for competitive programming',
      problems: 85,
      duration: '8-10 weeks',
      difficulty: 'Advanced',
      icon: BsLightning
    }
  ];

  const featuredCollections = [
    {
      title: 'Top Interview Questions',
      description: 'Most frequently asked questions in tech interviews',
      problems: 145,
      completion: 68
    },
    {
      title: 'Blind 75',
      description: 'Curated list of 75 must-do problems',
      problems: 75,
      completion: 23
    },
    {
      title: 'Grind 169',
      description: 'Extended collection for thorough preparation',
      problems: 169,
      completion: 45
    }
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CodeMasterHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover problems organized by topics, difficulty, and learning paths
          </p>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Problem Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/?category=${category.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FFA116] transition-colors">
                        {category.title}
                      </h3>
                      <p className={`text-sm ${category.textColor} font-medium`}>
                        {category.problems} problems
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  <div className="flex items-center mt-4 text-sm text-[#FFA116] font-medium group-hover:underline">
                    Start practicing <BsArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Study Paths */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Study Paths
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studyPaths.map((path, index) => {
              const IconComponent = path.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-[#FFA116]/10 rounded-lg mr-4">
                        <IconComponent className="w-6 h-6 text-[#FFA116]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {path.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {path.problems} problems • {path.duration}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
                      {path.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {path.description}
                  </p>
                  <button className="flex items-center px-4 py-2 bg-[#FFA116] text-white rounded-md hover:bg-[#FF9500] transition-colors text-sm font-medium">
                    <BsPlay className="mr-2 w-4 h-4" />
                    Start Path
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Collections */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.map((collection, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <BsBookmark className="w-5 h-5 text-[#FFA116] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {collection.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {collection.description}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{collection.completion}/{collection.problems}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#FFA116] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(collection.completion / collection.problems) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button className="flex items-center px-4 py-2 border border-[#FFA116] text-[#FFA116] rounded-md hover:bg-[#FFA116] hover:text-white transition-colors text-sm font-medium w-full justify-center">
                  <BsClipboardData className="mr-2 w-4 h-4" />
                  View Collection
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}