import React from 'react';
import CodeMasterHeader from '@/components/Header/LeetCodeHeader';
import useHasMounted from '@/hooks/useHasMounted';
import { 
  BsBriefcase, 
  BsPlayFill,
  BsClock,
  BsCheckCircle,
  BsStarFill,
  BsLightning,
  BsTrophy,
  BsBullseye,
  BsChatDots,
  BsMic,
  BsGraphUp,
  BsShield,
  BsPeople
} from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';

export default function Interview() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const features = [
    {
      icon: BsChatDots,
      title: 'Real-Time AI Conversations',
      description: 'Practice with an AI interviewer that responds naturally and asks follow-up questions based on your answers.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BsMic,
      title: 'Voice-Enabled Practice',
      description: 'Speak your answers naturally with advanced speech recognition and real-time feedback on your communication.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BsBullseye,
      title: 'Personalized Feedback',
      description: 'Get detailed analysis of your performance, communication skills, and areas for improvement.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BsGraphUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed analytics and performance metrics.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: BsShield,
      title: 'Industry-Specific Questions',
      description: 'Practice with questions tailored to your target role and industry, powered by real interview data.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BsPeople,
      title: 'Multiple Interview Types',
      description: 'Technical, behavioral, system design, and case study interviews all in one platform.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const benefits = [
    {
      title: '10x Faster Learning',
      description: 'Advanced AI adapts to your skill level and focuses on your weak areas',
      stat: '10x',
      icon: BsLightning
    },
    {
      title: '95% Success Rate',
      description: 'Users who practice regularly see significant improvement in interview performance',
      stat: '95%',
      icon: BsTrophy
    },
    {
      title: '24/7 Availability',
      description: 'Practice anytime, anywhere with our AI interviewer that never sleeps',
      stat: '24/7',
      icon: BsClock
    },
    {
      title: '50+ Companies',
      description: 'Questions and scenarios from top tech companies and startups',
      stat: '50+',
      icon: BsBriefcase
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'EvoInterview helped me practice behavioral questions with realistic AI responses. The feedback was incredibly detailed and helped me land my dream job!',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Data Scientist at Meta',
      content: 'The AI interviewer feels so real! It asked follow-up questions just like a human would. This platform gave me the confidence I needed.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager at Amazon',
      content: 'Amazing platform! The industry-specific questions and real-time feedback made all the difference in my interview preparation.',
      rating: 5
    }
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CodeMasterHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <BsLightning className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  EvoInterview
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                AI-Powered Interview Practice Platform
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your interview preparation with the most advanced AI interviewer. 
            Practice real conversations, get instant feedback, and land your dream job faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://evointerview.com/', '_blank')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <BsPlayFill className="mr-2 w-5 h-5" />
              Start Free AI Interview
            </button>
            <button 
              onClick={() => window.open('https://evointerview.com/', '_blank')}
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <FiVideo className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {benefit.stat}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {benefit.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose EvoInterview?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of interview preparation with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of professionals who landed their dream jobs with EvoInterview
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <BsStarFill key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of successful candidates who used EvoInterview to land their dream jobs.
              Start practicing with AI today - completely free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://evointerview.com/', '_blank')}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <BsPlayFill className="mr-2 w-5 h-5" />
                Start Your Free AI Interview
              </button>
              <button 
                onClick={() => window.open('https://evointerview.com/', '_blank')}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                <FiVideo className="mr-2 w-5 h-5" />
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>

        {/* Final Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BsChatDots className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Natural Conversations</h3>
                <p className="text-gray-600 dark:text-gray-400">Practice with an AI that responds like a real interviewer, complete with follow-up questions and realistic reactions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BsMic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Voice Recognition</h3>
                <p className="text-gray-600 dark:text-gray-400">Speak naturally during your practice sessions with advanced speech recognition technology.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BsBullseye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detailed Feedback</h3>
                <p className="text-gray-600 dark:text-gray-400">Receive comprehensive analysis of your communication style, content quality, and areas for improvement.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BsGraphUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">Monitor your improvement with detailed analytics and performance metrics over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
