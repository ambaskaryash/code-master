import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import LeetCodeHeader from '@/components/Header/LeetCodeHeader';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase, getUserProfile, updateUserProfile } from '@/lib/supabase';
import { 
  BsPersonFill, 
  BsShieldLock, 
  BsBellFill, 
  BsEyeFill, 
  BsSave,
  BsTrash,
  BsCheckCircleFill
} from 'react-icons/bs';

const Settings: React.FC = () => {
  const { user, loading: authLoading } = useSupabaseAuth();
  const router = useRouter();
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    display_name: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });
  
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    problem_updates: true,
    contest_reminders: false,
    marketing_emails: false
  });
  
  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profile_visibility: 'public', // public, private, friends
    show_progress: true,
    show_submissions: true
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const loadUserProfile = useCallback(async () => {
    if (!user) return;
    
    setProfileLoading(true);
    try {
      // Try to load profile from database first
      const profile = await getUserProfile(user.id);
      
      // Use database as primary source, fallback to auth metadata
      setProfileData({
        display_name: profile.display_name || user.user_metadata?.display_name || '',
        email: profile.email || user.email || '',
        bio: profile.bio || user.user_metadata?.bio || '',
        location: profile.location || user.user_metadata?.location || '',
        website: profile.website || user.user_metadata?.website || ''
      });
      
      // Load preferences from user metadata (stored in auth metadata)
      const metadata = user.user_metadata;
      if (metadata?.notifications) {
        setNotifications(metadata.notifications);
      }
      if (metadata?.privacy) {
        setPrivacy(metadata.privacy);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback to auth metadata only
      setProfileData({
        display_name: user.user_metadata?.display_name || '',
        email: user.email || '',
        bio: user.user_metadata?.bio || '',
        location: user.user_metadata?.location || '',
        website: user.user_metadata?.website || ''
      });
      
      // Load preferences from user metadata
      const metadata = user.user_metadata;
      if (metadata?.notifications) {
        setNotifications(metadata.notifications);
      }
      if (metadata?.privacy) {
        setPrivacy(metadata.privacy);
      }
    } finally {
      setProfileLoading(false);
    }
  }, [user]);

  // Load user data from database on component mount
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user, loadUserProfile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaveMessage('');
    
    if (!user) {
      setSaveMessage('Error: User not found.');
      setLoading(false);
      return;
    }
    
    // Validate website URL format
    if (profileData.website && profileData.website.trim() && !profileData.website.match(/^https?:\/\//)) {
      setSaveMessage('Website must be a valid URL starting with http:// or https://');
      setLoading(false);
      return;
    }
    
    try {
      // Update profile in database (primary source of truth)
      await updateUserProfile(user.id, {
        display_name: profileData.display_name,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website
      });
      
      // Also update auth metadata for consistency
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          display_name: profileData.display_name,
          bio: profileData.bio,
          location: profileData.location,
          website: profileData.website
        }
      });
      
      if (authError) {
        console.warn('Warning: Could not update auth metadata:', authError);
        // Don't throw here as database update succeeded
      }
      
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    setSaveMessage('');
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          notifications: notifications
        }
      });
      
      if (error) throw error;
      
      setSaveMessage('Notification preferences updated!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating notifications:', error);
      setSaveMessage('Error updating preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setLoading(true);
    setSaveMessage('');
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          privacy: privacy
        }
      });
      
      if (error) throw error;
      
      setSaveMessage('Privacy settings updated!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      setSaveMessage('Error updating settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <LeetCodeHeader />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFA116] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: BsPersonFill },
    { id: 'notifications', label: 'Notifications', icon: BsBellFill },
    { id: 'privacy', label: 'Privacy', icon: BsEyeFill },
    { id: 'security', label: 'Security', icon: BsShieldLock }
  ];

  return (
    <>
      <LeetCodeHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              saveMessage.includes('Error') 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' 
                : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            }`}>
              <BsCheckCircleFill className="w-5 h-5" />
              <span>{saveMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#FFA116] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={profileData.display_name}
                            onChange={(e) => setProfileData({...profileData, display_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                            placeholder="Enter your display name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                            placeholder="Your location"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                            placeholder="https://yourwebsite.com"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Must start with http:// or https:// (leave empty if none)
                          </p>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-[#FFA116] text-white rounded-lg hover:bg-[#FF9500] transition-colors disabled:opacity-50"
                      >
                        <BsSave className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                    <div className="space-y-6">
                      {Object.entries({
                        email_notifications: 'Email Notifications',
                        problem_updates: 'Problem Updates',
                        contest_reminders: 'Contest Reminders',
                        marketing_emails: 'Marketing Emails'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Receive notifications about {label.toLowerCase()}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFA116]/25 dark:peer-focus:ring-[#FFA116]/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FFA116]"></div>
                          </label>
                        </div>
                      ))}
                      
                      <button
                        onClick={handleNotificationUpdate}
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-[#FFA116] text-white rounded-lg hover:bg-[#FF9500] transition-colors disabled:opacity-50"
                      >
                        <BsSave className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save Preferences'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={privacy.profile_visibility}
                          onChange={(e) => setPrivacy({...privacy, profile_visibility: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FFA116] focus:border-transparent"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Show Progress</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow others to see your coding progress and statistics
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.show_progress}
                            onChange={(e) => setPrivacy({...privacy, show_progress: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFA116]/25 dark:peer-focus:ring-[#FFA116]/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FFA116]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Show Submissions</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow others to see your problem submissions
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.show_submissions}
                            onChange={(e) => setPrivacy({...privacy, show_submissions: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFA116]/25 dark:peer-focus:ring-[#FFA116]/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FFA116]"></div>
                        </label>
                      </div>
                      
                      <button
                        onClick={handlePrivacyUpdate}
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-[#FFA116] text-white rounded-lg hover:bg-[#FF9500] transition-colors disabled:opacity-50"
                      >
                        <BsSave className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Security</h2>
                    <div className="space-y-6">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Password Management</h3>
                        <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                          For security reasons, password changes are handled through email verification.
                        </p>
                        <button
                          onClick={() => {
                            // Trigger password reset email
                            alert('Password reset email would be sent to your registered email address.');
                          }}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Reset Password
                        </button>
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Delete Account</h3>
                        <p className="text-red-700 dark:text-red-300 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                              // Handle account deletion
                              alert('Account deletion would be processed.');
                            }
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <BsTrash className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;