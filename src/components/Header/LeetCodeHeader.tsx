import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CodeMasterLogo from '../Logo/CodeMasterLogo';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { 
  BsSearch, 
  BsBell, 
  BsGear,
  BsChevronDown,
  BsChevronUp,
  BsListUl,
  BsLightningCharge,
  BsTrophy,
  BsChatDots,
  BsBriefcase,
  BsShop,
  BsBookmark
} from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import Logout from '../Buttons/Logout';

interface CodeMasterHeaderProps {
  problemPage?: boolean;
}

const CodeMasterHeader: React.FC<CodeMasterHeaderProps> = ({ problemPage }) => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showPremiumDropdown, setShowPremiumDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (premiumRef.current && !premiumRef.current.contains(event.target as Node)) {
        setShowPremiumDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { label: 'Explore', href: '/explore', icon: BsListUl },
    { label: 'Problems', href: '/', icon: BsLightningCharge },
    { label: 'Contest', href: '/contest', icon: BsTrophy },
    { label: 'Discuss', href: '/discuss', icon: BsChatDots },
    { label: 'Interview', href: '/interview', icon: BsBriefcase },
    { label: 'Store', href: '/store', icon: BsShop },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2d2d2d] sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left section - Logo and Navigation */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="transform transition-transform group-hover:scale-110">
                  <CodeMasterLogo 
                    size={32} 
                    className="transition-all duration-200 group-hover:drop-shadow-lg" 
                  />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  CodeMaster
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {menuItems.map((item) => {
                  const isActive = router.pathname === item.href || 
                    (item.href === '/' && router.pathname === '/') ||
                    (item.href !== '/' && router.pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-[#FFA116] bg-[#FFA116]/10'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#FFA116] hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Center section - Search (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:border-transparent text-sm"
                />
              </form>
            </div>

            {/* Right section - Actions and User */}
            <div className="flex items-center space-x-3">
              {/* Premium Dropdown */}
              <div className="relative hidden md:block" ref={premiumRef}>
                <button
                  onClick={() => setShowPremiumDropdown(!showPremiumDropdown)}
                  className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-[#FF8C00] to-[#FFA116] text-white rounded-full text-sm font-semibold hover:from-[#FF7700] hover:to-[#FF9500] transition-all duration-200"
                >
                  <span>Premium</span>
                  {showPremiumDropdown ? <BsChevronUp className="w-3 h-3" /> : <BsChevronDown className="w-3 h-3" />}
                </button>

                {showPremiumDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">CodeMaster Premium</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Unlock all features</p>
                    </div>
                    <div className="py-2">
                      <a href="/premium" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        View Plans
                      </a>
                      <a href="/premium/benefits" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Benefits
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                <BsBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Section */}
              {!user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => router.push('/auth')}
                    className="px-4 py-2 text-sm font-medium text-[#FFA116] hover:bg-[#FFA116]/10 rounded-md transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('/auth')}
                    className="px-4 py-2 text-sm font-medium bg-[#FFA116] text-white rounded-md hover:bg-[#FF9500] transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#FFA116] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    {showUserDropdown ? <BsChevronUp className="w-3 h-3 text-gray-600 dark:text-gray-400" /> : <BsChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />}
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.user_metadata?.display_name || user.email}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="w-4 h-4 mr-3">👤</div>
                          Profile
                        </Link>
                        <Link href="/submissions" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="w-4 h-4 mr-3">📝</div>
                          Submissions
                        </Link>
                        <Link href="/favorites" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <BsBookmark className="w-4 h-4 mr-3" />
                          Favorites
                        </Link>
                        <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <BsGear className="w-4 h-4 mr-3" />
                          Settings
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                        <div className="px-4 py-2">
                          <Logout />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                {showMobileMenu ? <IoClose className="w-5 h-5" /> : <RxHamburgerMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
              {/* Mobile Search */}
              <div className="px-2 pb-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:border-transparent text-sm"
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={`block px-4 py-2 text-base font-medium ${
                        isActive
                          ? 'text-[#FFA116] bg-[#FFA116]/10'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#FFA116] hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Premium */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Link
                  href="/premium"
                  className="block px-4 py-2 text-base font-medium text-[#FF8C00] hover:bg-[#FFA116]/10"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Get Premium
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Problem Navigation Bar (only on problem pages) */}
      {problemPage && (
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2d2d2d]">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#FFA116] transition-colors"
                >
                  <span>←</span>
                  <span>Back to List</span>
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Problem {router.query.pid}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#FFA116] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                  ←
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#FFA116] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeMasterHeader;
