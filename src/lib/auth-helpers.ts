// Browser-compatible auth helpers with better error handling
import { supabase } from './supabase';

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
  needsEmailVerification?: boolean;
}

export const signUpUser = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<AuthResult> => {
  try {
    console.log('🚀 Starting signup process...');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        },
        // Disable email verification for development
        emailRedirectTo: undefined
      }
    });
    
    if (error) {
      console.error('❌ Signup error:', error);
      
      // Handle specific error types
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Connection failed. Please check your internet connection and try again.'
        };
      } else if (error.message.includes('already registered')) {
        return {
          success: false,
          error: 'This email is already registered. Please try signing in instead.'
        };
      } else if (error.message.includes('rate limit')) {
        return {
          success: false,
          error: 'Too many signup attempts. Please wait an hour and try again.'
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
    
    console.log('✅ Signup successful:', data);
    
    return {
      success: true,
      user: data.user,
      needsEmailVerification: !data.session // If no session, email verification might be required
    };
    
  } catch (err: any) {
    console.error('❌ Signup exception:', err);
    
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your Supabase configuration.'
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const signInUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    console.log('🔐 Starting signin process...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('❌ Signin error:', error);
      return {
        success: false,
        error: error.message
      };
    }
    
    console.log('✅ Signin successful:', data);
    
    return {
      success: true,
      user: data.user
    };
    
  } catch (err: any) {
    console.error('❌ Signin exception:', err);
    return {
      success: false,
      error: 'An unexpected error occurred during signin.'
    };
  }
};