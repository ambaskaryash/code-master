import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { BsCheckCircle, BsSearch, BsFunnel, BsSortUp, BsSortDown } from "react-icons/bs";
import { AiFillYoutube, AiFillStar, AiFillHeart } from "react-icons/ai";
import { IoClose, IoChevronDown, IoFilter } from "react-icons/io5";
import { HiCode, HiDatabase, HiCube, HiOutlineExternalLink } from "react-icons/hi";
import { MdDevices } from "react-icons/md";
import YouTube from "react-youtube";
import { getProblems, getUserProfile } from "@/lib/supabase";
import { DBProblem } from "@/utils/types/problem";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

type SortField = 'status' | 'title' | 'acceptance' | 'difficulty' | 'frequency';
type SortOrder = 'asc' | 'desc';

type LeetCodeProblemsTableProps = {
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeetCodeProblemsTable: React.FC<LeetCodeProblemsTableProps> = ({ setLoadingProblems }) => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [difficultyFilter, setDifficultyFilter] = useState("All");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [showFilters, setShowFilters] = useState(false);
	const [sortField, setSortField] = useState<SortField>('title');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	
	const problems = useGetProblems(setLoadingProblems);
	const solvedProblems = useGetSolvedProblems();

	// Get unique categories for filters
	const categories = useMemo(() => {
		const uniqueCategories = Array.from(new Set(problems.map(p => p.category)));
		return ["All", ...uniqueCategories];
	}, [problems]);

	const difficulties = ["All", "Easy", "Medium", "Hard"];

	// Filter and sort problems
	const filteredAndSortedProblems = useMemo(() => {
		let filtered = problems.filter(problem => {
			const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(problem.tags && problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
			
			const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
			const matchesCategory = categoryFilter === "All" || problem.category === categoryFilter;
			
			let matchesStatus = true;
			if (statusFilter === "Solved") {
				matchesStatus = solvedProblems.includes(problem.id);
			} else if (statusFilter === "Unsolved") {
				matchesStatus = !solvedProblems.includes(problem.id);
			}
			
			return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
		});

		// Sort problems
		filtered.sort((a, b) => {
			let aValue, bValue;
			
			switch (sortField) {
				case 'status':
					aValue = solvedProblems.includes(a.id) ? 1 : 0;
					bValue = solvedProblems.includes(b.id) ? 1 : 0;
					break;
				case 'title':
					aValue = a.title.toLowerCase();
					bValue = b.title.toLowerCase();
					break;
				case 'acceptance':
					aValue = a.acceptanceRate || 0;
					bValue = b.acceptanceRate || 0;
					break;
				case 'difficulty':
					const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
					aValue = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
					bValue = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
					break;
				case 'frequency':
					aValue = a.frequency || 0;
					bValue = b.frequency || 0;
					break;
				default:
					return 0;
			}

			if (sortOrder === 'asc') {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});

		return filtered;
	}, [problems, searchTerm, difficultyFilter, categoryFilter, statusFilter, solvedProblems, sortField, sortOrder]);

	// Helper functions
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy": return "text-leetcode-easy";
			case "Medium": return "text-leetcode-medium";
			case "Hard": return "text-leetcode-hard";
			default: return "text-gray-400";
		}
	};

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortOrder('asc');
		}
	};

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) return null;
		return sortOrder === 'asc' ? 
			<BsSortUp className="w-4 h-4 ml-1" /> : 
			<BsSortDown className="w-4 h-4 ml-1" />;
	};

	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 py-6">
				{/* Header Section */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Problems</h1>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{filteredAndSortedProblems.length} problems
							</span>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<BsCheckCircle className="w-4 h-4 text-leetcode-easy" />
								<span>{solvedProblems.length} solved</span>
							</div>
						</div>
						<button className="flex items-center space-x-2 px-4 py-2 bg-leetcode-orange hover:bg-leetcode-orange-hover text-white rounded-lg text-sm font-medium transition-colors">
							<span>Pick One</span>
						</button>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="mb-6">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<BsSearch className="h-4 w-4 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Search questions..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-leetcode-orange focus:border-transparent text-sm"
							/>
						</div>

						{/* Filter Button */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
						>
							<IoFilter className="w-4 h-4" />
							<span>Filters</span>
							<IoChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
						</button>
					</div>

					{/* Filter Options */}
					{showFilters && (
						<div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
									<select
										value={difficultyFilter}
										onChange={(e) => setDifficultyFilter(e.target.value)}
										className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-leetcode-orange text-sm"
									>
										{difficulties.map(diff => (
											<option key={diff} value={diff}>{diff}</option>
										))}
									</select>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
									<select
										value={categoryFilter}
										onChange={(e) => setCategoryFilter(e.target.value)}
										className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-leetcode-orange text-sm"
									>
										{categories.map(cat => (
											<option key={cat} value={cat}>{cat}</option>
										))}
									</select>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
									<select
										value={statusFilter}
										onChange={(e) => setStatusFilter(e.target.value)}
										className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-leetcode-orange text-sm"
									>
										<option value="All">All</option>
										<option value="Solved">Solved</option>
										<option value="Unsolved">Unsolved</option>
									</select>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Problems Table */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
					{/* Table Header */}
					<div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
						<div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
							<div 
								className="col-span-1 cursor-pointer hover:text-leetcode-orange flex items-center"
								onClick={() => handleSort('status')}
							>
								Status
								{getSortIcon('status')}
							</div>
							<div 
								className="col-span-4 cursor-pointer hover:text-leetcode-orange flex items-center"
								onClick={() => handleSort('title')}
							>
								Title
								{getSortIcon('title')}
							</div>
							<div 
								className="col-span-2 cursor-pointer hover:text-leetcode-orange flex items-center"
								onClick={() => handleSort('acceptance')}
							>
								Acceptance
								{getSortIcon('acceptance')}
							</div>
							<div 
								className="col-span-2 cursor-pointer hover:text-leetcode-orange flex items-center"
								onClick={() => handleSort('difficulty')}
							>
								Difficulty
								{getSortIcon('difficulty')}
							</div>
							<div 
								className="col-span-2 cursor-pointer hover:text-leetcode-orange flex items-center"
								onClick={() => handleSort('frequency')}
							>
								Frequency
								{getSortIcon('frequency')}
							</div>
							<div className="col-span-1">
								Solution
							</div>
						</div>
					</div>

					{/* Table Body */}
					<div className="divide-y divide-gray-200 dark:divide-gray-600">
						{filteredAndSortedProblems.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-gray-400 text-lg mb-2">No problems found</div>
								<div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
							</div>
						) : (
							filteredAndSortedProblems.map((problem, idx) => {
								const isSolved = solvedProblems.includes(problem.id);
								return (
									<div
										key={problem.id}
										className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
										onClick={() => window.open(problem.link || `/problems/${problem.id}`, problem.link ? '_blank' : '_self')}
									>
										<div className="grid grid-cols-12 gap-4 items-center text-sm">
											{/* Status */}
											<div className="col-span-1">
												{isSolved ? (
													<BsCheckCircle className="w-5 h-5 text-leetcode-easy" />
												) : (
													<div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
												)}
											</div>

											{/* Title */}
											<div className="col-span-4">
												<div className="flex items-center space-x-2">
													<Link
														href={problem.link || `/problems/${problem.id}`}
														target={problem.link ? '_blank' : '_self'}
														className="font-medium text-gray-900 dark:text-white hover:text-leetcode-orange transition-colors"
														onClick={(e) => e.stopPropagation()}
													>
														{problem.title}
													</Link>
													{problem.link && (
														<HiOutlineExternalLink className="w-4 h-4 text-gray-400" />
													)}
												</div>
												{/* Tags */}
												{problem.tags && problem.tags.length > 0 && (
													<div className="flex flex-wrap gap-1 mt-1">
														{problem.tags.slice(0, 3).map((tag, tagIdx) => (
															<span
																key={tagIdx}
																className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-xs"
															>
																{tag}
															</span>
														))}
														{problem.tags.length > 3 && (
															<span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-xs">
																+{problem.tags.length - 3}
															</span>
														)}
													</div>
												)}
											</div>

											{/* Acceptance */}
											<div className="col-span-2 text-gray-600 dark:text-gray-400">
												{problem.acceptanceRate ? `${problem.acceptanceRate.toFixed(1)}%` : 'N/A'}
											</div>

											{/* Difficulty */}
											<div className="col-span-2">
												<span className={`font-medium ${getDifficultyColor(problem.difficulty)}`}>
													{problem.difficulty}
												</span>
											</div>

											{/* Frequency */}
											<div className="col-span-2">
												{problem.frequency ? (
													<div className="flex items-center space-x-1">
														{[...Array(5)].map((_, i) => (
															<div
																key={i}
																className={`w-2 h-2 rounded-full ${
																	i < (problem.frequency || 0) 
																		? 'bg-leetcode-orange' 
																		: 'bg-gray-200 dark:bg-gray-600'
																}`}
															/>
														))}
													</div>
												) : (
													<span className="text-gray-400">N/A</span>
												)}
											</div>

											{/* Solution */}
											<div className="col-span-1">
												{problem.videoId && (
													<button
														onClick={(e) => {
															e.stopPropagation();
															setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string });
														}}
														className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
														title="Watch solution video"
													>
														<AiFillYoutube className="w-5 h-5 text-red-500" />
													</button>
												)}
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>

			{/* YouTube Modal */}
			{youtubePlayer.isOpen && (
				<div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50'>
					<div
						className='bg-black bg-opacity-75 absolute inset-0'
						onClick={closeModal}
					></div>
					<div className='relative w-full max-w-4xl mx-6'>
						<button
							onClick={closeModal}
							className='absolute -top-12 right-0 text-white hover:text-gray-300 z-10'
						>
							<IoClose className="w-8 h-8" />
						</button>
						<div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
							<YouTube
								videoId={youtubePlayer.videoId}
								loading='lazy'
								iframeClassName='w-full min-h-[400px] md:min-h-[500px]'
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default LeetCodeProblemsTable;

// Custom hooks (updated for Supabase)
function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const fetchProblems = async () => {
			try {
				setLoadingProblems(true);
				const supabaseProblems = await getProblems();
				
				// Transform Supabase data to match DBProblem interface
				const transformedProblems: DBProblem[] = supabaseProblems.map(problem => ({
					id: problem.id,
					title: problem.title,
					difficulty: problem.difficulty,
					category: problem.category,
					order: problem.order_num,
					videoId: problem.video_id,
					likes: problem.likes,
					dislikes: problem.dislikes,
					acceptanceRate: problem.acceptance_rate,
					frequency: problem.frequency,
					description: problem.problem_statement,
					examples: problem.examples,
					constraints: Array.isArray(problem.constraints) ? problem.constraints : problem.constraints ? [problem.constraints] : [],
					starterCode: problem.starter_code,
					tags: [] // Default empty array for tags
				}));
				
				setProblems(transformedProblems);
				setLoadingProblems(false);
			} catch (error) {
				console.error('Error fetching problems:', error);
				setLoadingProblems(false);
			}
		};

		fetchProblems();
	}, [setLoadingProblems]);
	return problems;
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const { user } = useSupabaseAuth();

	useEffect(() => {
		const getSolvedProblems = async () => {
			if (!user) {
				setSolvedProblems([]);
				return;
			}
			
			try {
				const userProfile = await getUserProfile(user.id);
				setSolvedProblems(userProfile.solved_problems || []);
			} catch (error) {
				console.error('Error fetching solved problems:', error);
				setSolvedProblems([]);
			}
		};

		getSolvedProblems();
	}, [user]);

	return solvedProblems;
}
