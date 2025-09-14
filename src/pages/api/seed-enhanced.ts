import type { NextApiRequest, NextApiResponse } from 'next';
import { seedAllEnhancedProblems } from '@/utils/seed-database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔥 Starting enhanced seeding from API...');
    await seedAllEnhancedProblems();
    
    return res.status(200).json({ 
      success: true, 
      message: 'All enhanced problems seeded successfully!' 
    });
  } catch (error: any) {
    console.error('❌ Error seeding enhanced problems:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Error seeding problems' 
    });
  }
}