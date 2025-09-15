import React from 'react';
import CodeMasterHeader from '@/components/Header/LeetCodeHeader';
import useHasMounted from '@/hooks/useHasMounted';
import { 
  BsShop, 
  BsBell,
  BsEnvelope,
  BsGift,
  BsCode,
  BsCpu,
  BsBook,
  BsTrophy,
  BsStarFill,
  BsLightning,
  BsShield,
  BsClock
} from 'react-icons/bs';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';

export default function Store() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const comingSoonFeatures = [
    {
      icon: BsCode,
      title: 'Advanced Courses',
      description: 'In-depth coding courses taught by industry experts',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BsBook,
      title: 'Study Materials',
      description: 'Comprehensive guides, eBooks, and reference materials',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BsTrophy,
      title: 'Certification Programs',
      description: 'Get certified in various programming languages and frameworks',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BsCpu,
      title: 'Hardware & Accessories',
      description: 'Coding keyboards, monitors, and developer tools',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: BsGift,
      title: 'CodeMaster Merchandise',
      description: 'T-shirts, mugs, stickers, and branded items',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: BsShield,
      title: 'Enterprise Solutions',
      description: 'Team licenses and corporate training packages',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const upcomingProducts = [
    {
      id: 1,
      name: 'Algorithm Mastery Course',
      description: 'Complete course covering all major algorithms with hands-on practice',
      price: '$99',
      originalPrice: '$149',
      rating: 4.9,
      students: '2.5K+',
      duration: '40 hours',
      level: 'Intermediate',
      image: '📚'
    },
    {
      id: 2,
      name: 'CodeMaster Premium T-Shirt',
      description: 'High-quality cotton t-shirt with CodeMaster logo',
      price: '$29',
      originalPrice: '$39',
      rating: 4.8,
      students: 'New',
      duration: 'One Size',
      level: 'All',
      image: '👕'
    },
    {
      id: 3,
      name: 'System Design Masterclass',
      description: 'Learn to design scalable systems like top tech companies',
      price: '$149',
      originalPrice: '$199',
      rating: 4.9,
      students: '1.8K+',
      duration: '60 hours',
      level: 'Advanced',
      image: '🏗️'
    },
    {
      id: 4,
      name: 'Coding Interview Bootcamp',
      description: 'Intensive 8-week program to ace coding interviews',
      price: '$299',
      originalPrice: '$399',
      rating: 4.7,
      students: '950+',
      duration: '8 weeks',
      level: 'All Levels',
      image: '🚀'
    }
  ];

  const handleNotifyMe = () => {
    // In a real app, this would integrate with an email service
    alert('Thanks for your interest! We\'ll notify you when the store launches.');
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CodeMasterHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Coming Soon Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#FFA116] to-[#FF9500] rounded-full mb-8">
            <BsShop className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Store Coming Soon
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;re building something amazing! Get ready for advanced courses, study materials, 
            merchandise, and more to supercharge your coding journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 max-w-md">
              <BsEnvelope className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleNotifyMe}
              className="flex items-center px-6 py-3 bg-[#FFA116] text-white rounded-lg hover:bg-[#FF9500] transition-colors font-medium"
            >
              <BsBell className="w-5 h-5 mr-2" />
              Notify Me
            </button>
          </div>
        </div>

        {/* Launch Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Launch Timeline
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
            Here&apos;s what&apos;s coming and when you can expect it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phase 1 - Q2 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced courses and study materials launch
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phase 2 - Q3 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Merchandise and physical products available
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsShield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phase 3 - Q4 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enterprise solutions and team packages
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What&apos;s Coming to the Store
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Exciting products and services to enhance your coding experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Product Previews */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Product Previews
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get a sneak peek at some of our upcoming products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl mr-4">
                        {product.image}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            <BsStarFill className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.students} students
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#FFA116]/10 text-[#FFA116] text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                        {product.price}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.duration}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.level}</p>
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md cursor-not-allowed text-sm font-medium"
                  >
                    <FiShoppingBag className="inline-block w-4 h-4 mr-2" />
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Early Access CTA */}
        <div className="bg-gradient-to-r from-[#FFA116] to-[#FF9500] rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Early Access
          </h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Be among the first to access our advanced content and get exclusive discounts 
            when the store launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-none outline-none text-gray-900 w-full sm:w-auto"
            />
            <button
              onClick={handleNotifyMe}
              className="px-6 py-3 bg-white text-[#FFA116] rounded-lg hover:bg-gray-100 transition-colors font-medium w-full sm:w-auto"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
