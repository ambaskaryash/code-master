import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  updated_at: string;
  liked_problems: string[];
  disliked_problems: string[];
  solved_problems: string[];
  starred_problems: string[];
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  backup_codes?: string[];
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  order_num: number;
  video_id?: string;
  likes: number;
  dislikes: number;
  acceptance_rate: number;
  frequency: number;
  problem_statement: string;
  examples: any;
  constraints: string;
  starter_code: any;
  handler_function: string;
  starter_function_name: string;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  language: string;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtime?: number;
  memory?: number;
  test_cases_passed?: number;
  total_test_cases?: number;
  error_message?: string;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  problem_id: string;
  is_solved: boolean;
  is_liked: boolean;
  is_disliked: boolean;
  is_starred: boolean;
  attempts: number;
  last_attempt_at?: string;
  solved_at?: string;
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  });
  
  if (error) throw error;
  
  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email: data.user.email!,
          display_name: displayName,
          liked_problems: [],
          disliked_problems: [],
          solved_problems: [],
          starred_problems: [],
          two_factor_enabled: false
        }
      ]);
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
      throw profileError;
    }
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

export const getSession = () => {
  return supabase.auth.getSession();
};

// Problem queries
export const getProblems = async () => {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .order('order_num');
  
  if (error) throw error;
  return data as Problem[];
};

export const getProblem = async (problemId: string) => {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', problemId)
    .single();
  
  if (error) throw error;
  return data as Problem;
};

// User progress queries
export const getUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*, problems(*)')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

export const updateUserProgress = async (
  userId: string,
  problemId: string,
  progress: Partial<UserProgress>
) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert([
      {
        user_id: userId,
        problem_id: problemId,
        ...progress,
        updated_at: new Date().toISOString()
      }
    ])
    .select();
  
  if (error) throw error;
  return data;
};

// Submission queries
export const createSubmission = async (submission: Omit<Submission, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('submissions')
    .insert([submission])
    .select()
    .single();
  
  if (error) throw error;
  return data as Submission;
};

export const getUserSubmissions = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, problems(title, difficulty)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as User;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
};

// Real user activity tracking functions
export const recordProblemAttempt = async (
  userId: string,
  problemId: string,
  language: string,
  code: string,
  status: string,
  runtime?: number,
  memory?: number,
  errorMessage?: string
) => {
  // Get current attempt number for this user and problem
  const { data: existingAttempts } = await supabase
    .from('user_problem_attempts')
    .select('attempt_number')
    .eq('user_id', userId)
    .eq('problem_id', problemId)
    .order('attempt_number', { ascending: false })
    .limit(1);
  
  const attemptNumber = existingAttempts && existingAttempts.length > 0 
    ? existingAttempts[0].attempt_number + 1 
    : 1;
  
  const { data, error } = await supabase
    .from('user_problem_attempts')
    .insert({
      user_id: userId,
      problem_id: problemId,
      attempt_number: attemptNumber,
      language,
      code,
      status,
      runtime,
      memory,
      error_message: errorMessage
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // If this is an accepted solution, update user progress
  if (status === 'Accepted') {
    await markProblemAsSolved(userId, problemId);
  }
  
  return data;
};

// Mark problem as solved and update user progress
export const markProblemAsSolved = async (userId: string, problemId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      problem_id: problemId,
      is_solved: true,
      solved_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Get real user statistics
export const getUserStats = async (userId: string) => {
  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select(`
      problems_solved,
      easy_solved,
      medium_solved,
      hard_solved,
      total_submissions,
      current_streak,
      max_streak,
      contest_rating,
      global_ranking,
      last_solved_at,
      created_at
    `)
    .eq('id', userId)
    .single();
  
  if (profileError) throw profileError;
  
  // Calculate acceptance rate
  const acceptanceRate = userProfile.total_submissions > 0 
    ? Math.round((userProfile.problems_solved / userProfile.total_submissions) * 100) 
    : 0;
  
  return {
    ...userProfile,
    acceptanceRate
  };
};

// Get user's daily activity for heatmap
export const getUserDailyActivity = async (userId: string, days: number = 365) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('daily_activity')
    .select('date, problems_solved, submissions_made')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// Get user badges
export const getUserBadges = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// Get user's recent attempts (for submissions tab)
export const getUserRecentAttempts = async (userId: string, limit: number = 10) => {
  const { data, error } = await supabase
    .from('user_problem_attempts')
    .select(`
      *,
      problems (
        title,
        difficulty
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
};

// Get user's solved problems with details
export const getUserSolvedProblems = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      problems (
        id,
        title,
        difficulty,
        category
      )
    `)
    .eq('user_id', userId)
    .eq('is_solved', true)
    .order('solved_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};
