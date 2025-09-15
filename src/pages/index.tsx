import CodeMasterProblemsTable from "@/components/ProblemsTable/LeetCodeProblemsTable";
import CodeMasterHeader from "@/components/Header/LeetCodeHeader";
import useHasMounted from "@/hooks/useHasMounted";

import { useState, useEffect } from "react";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const hasMounted = useHasMounted();
	
	// Debug logging for component mount and loading state
	useEffect(() => {
		console.log('🚀 Home component mounted');
	}, []);
	
	useEffect(() => {
		console.log('🏠 Home component - loadingProblems state:', loadingProblems);
	}, [loadingProblems]);

	if (!hasMounted) {
		console.log('⏳ Waiting for client-side mount...');
		return null;
	}
	
	console.log('✅ Component mounted, rendering main content. Loading:', loadingProblems);

	return (
		<>
			<main className='bg-gray-50 dark:bg-gray-900 min-h-screen w-full'>
				<CodeMasterHeader />
				{/* Always render LeetCodeProblemsTable so hooks can run, but show loading skeleton when loading */}
				{loadingProblems && (
					<div className='w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-6'>
						<div className='space-y-4 animate-pulse'>
							{[...Array(8)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					</div>
				)}
				<div style={{ display: loadingProblems ? 'none' : 'block' }}>
					<CodeMasterProblemsTable setLoadingProblems={setLoadingProblems} />
				</div>
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6'>
			{/* Mobile Layout */}
			<div className='md:hidden space-y-3'>
				<div className='flex items-center space-x-3'>
					<div className='w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse'></div>
					<div className='flex-1 space-y-2'>
						<div className='h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
						<div className='flex space-x-1'>
							<div className='h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
							<div className='h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
						</div>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<div className='h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
					<div className='flex space-x-1'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse'></div>
						))}
					</div>
				</div>
			</div>
			
			{/* Desktop Layout */}
			<div className='hidden md:grid grid-cols-12 gap-2 lg:gap-4 items-center'>
				{/* Status */}
				<div className='col-span-1'>
					<div className='w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse'></div>
				</div>
				
				{/* Title */}
				<div className='col-span-3 lg:col-span-4 space-y-2'>
					<div className='h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
					<div className='flex space-x-1'>
						<div className='h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
						<div className='h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
						<div className='h-3 w-14 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
					</div>
				</div>
				
				{/* Acceptance */}
				<div className='col-span-2'>
					<div className='h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
				</div>
				
				{/* Difficulty */}
				<div className='col-span-2'>
					<div className='h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
				</div>
				
				{/* Frequency */}
				<div className='col-span-2 lg:col-span-2'>
					<div className='flex space-x-1'>
						{[...Array(5)].map((_, i) => (
							<div key={i} className='w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse'></div>
						))}
					</div>
				</div>
				
				{/* Solution */}
				<div className='col-span-1'>
					<div className='w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
				</div>
			</div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
