import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
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
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				<div className='text-center mt-8 mb-8'>
					<h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-2'>
						🚀 Master Your Coding Journey
					</h1>
					<p className='text-gray-400 text-lg font-medium'>
						Quality problems • Real solutions • Professional growth
					</p>
				</div>
				<div className='max-w-6xl mx-auto px-6 pb-10'>
					{/* Always render ProblemsTable so hooks can run, but show loading skeleton when loading */}
					{loadingProblems && (
						<div className='space-y-4 animate-pulse'>
							{[...Array(8)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}
					<div style={{ display: loadingProblems ? 'none' : 'block' }}>
						<ProblemsTable setLoadingProblems={setLoadingProblems} />
					</div>
				</div>
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className='bg-dark-layer-1 border border-gray-600 rounded-lg p-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-4 flex-1'>
					{/* Status circle */}
					<div className='w-6 h-6 rounded-full bg-gray-600 animate-pulse'></div>
					
					{/* Content area */}
					<div className='flex-1 space-y-3'>
						{/* Title and difficulty */}
						<div className='flex items-center space-x-3'>
							<div className='h-5 w-48 bg-gray-600 rounded animate-pulse'></div>
							<div className='h-6 w-16 bg-gray-600 rounded-full animate-pulse'></div>
						</div>
						
						{/* Category and tags */}
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<div className='w-4 h-4 bg-gray-600 rounded animate-pulse'></div>
								<div className='h-4 w-24 bg-gray-600 rounded animate-pulse'></div>
							</div>
							<div className='flex space-x-2'>
								<div className='h-5 w-12 bg-gray-600 rounded animate-pulse'></div>
								<div className='h-5 w-16 bg-gray-600 rounded animate-pulse'></div>
								<div className='h-5 w-14 bg-gray-600 rounded animate-pulse'></div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Action buttons */}
				<div className='flex items-center space-x-3'>
					<div className='w-10 h-10 bg-gray-600 rounded-lg animate-pulse'></div>
					<div className='w-16 h-10 bg-gray-600 rounded-lg animate-pulse'></div>
				</div>
			</div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
