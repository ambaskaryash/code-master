import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { BsCheckCircle, BsSearch, BsFunnel } from "react-icons/bs";
import { AiFillYoutube, AiFillStar, AiFillHeart } from "react-icons/ai";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { HiCode, HiDatabase, HiCube } from "react-icons/hi";
import { MdDevices } from "react-icons/md";
import YouTube from "react-youtube";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import ProblemStats from "./ProblemStats";

type ProblemsTableProps = {
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [difficultyFilter, setDifficultyFilter] = useState("All");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [showFilters, setShowFilters] = useState(false);
	
	const problems = useGetProblems(setLoadingProblems);
	const solvedProblems = useGetSolvedProblems();
	
	// Debug logging
	useEffect(() => {
		console.log('🏠 ProblemsTable component updated:');
		console.log('  - Problems loaded:', problems.length);
		console.log('  - Solved problems:', solvedProblems.length);
		console.log('  - Problems data:', problems.slice(0, 2)); // Show first 2 problems
	}, [problems, solvedProblems]);
	
	// Get unique categories and difficulties for filters
	const categories = useMemo(() => {
		const uniqueCategories = Array.from(new Set(problems.map(p => p.category)));
		return ["All", ...uniqueCategories];
	}, [problems]);
	
	const difficulties = ["All", "Easy", "Medium", "Hard"];
	
	// Filter problems based on search and filters
	const filteredProblems = useMemo(() => {
		return problems.filter(problem => {
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
	}, [problems, searchTerm, difficultyFilter, categoryFilter, statusFilter, solvedProblems]);
	
	// Helper functions
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy": return "text-green-400 bg-green-400/10";
			case "Medium": return "text-yellow-400 bg-yellow-400/10";
			case "Hard": return "text-red-400 bg-red-400/10";
			default: return "text-gray-400 bg-gray-400/10";
		}
	};
	
	const getCategoryIcon = (category: string) => {
		if (category.includes("Database")) return <HiDatabase className="w-4 h-4" />;
		if (category.includes("Container") || category.includes("Docker")) return <HiCube className="w-4 h-4" />;
		if (category.includes("DevOps")) return <MdDevices className="w-4 h-4" />;
		return <HiCode className="w-4 h-4" />;
	};
	
	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<>
			{/* Problem Statistics */}
			<ProblemStats problems={problems} solvedProblems={solvedProblems} />
			
			{/* Search and Filter Bar */}
			<div className="mb-6 space-y-4">
				{/* Search Bar */}
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<BsSearch className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Search problems or tags..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-dark-layer-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
					/>
				</div>
				
				{/* Filter Toggle Button */}
				<div className="flex justify-between items-center">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center space-x-2 px-4 py-2 bg-dark-layer-1 border border-gray-600 rounded-lg hover:bg-dark-layer-2 transition-colors text-white"
					>
						<BsFunnel className="w-4 h-4" />
						<span>Filters</span>
						<IoChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
					</button>
					
					<div className="text-sm text-gray-400">
						Showing {filteredProblems.length} of {problems.length} problems
					</div>
				</div>
				
				{/* Filter Options */}
				{showFilters && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-dark-layer-1 rounded-lg border border-gray-600">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
							<select
								value={difficultyFilter}
								onChange={(e) => setDifficultyFilter(e.target.value)}
								className="w-full px-3 py-2 bg-dark-layer-2 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{difficulties.map(diff => (
									<option key={diff} value={diff}>{diff}</option>
								))}
							</select>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
							<select
								value={categoryFilter}
								onChange={(e) => setCategoryFilter(e.target.value)}
								className="w-full px-3 py-2 bg-dark-layer-2 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{categories.map(cat => (
									<option key={cat} value={cat}>{cat}</option>
								))}
							</select>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="w-full px-3 py-2 bg-dark-layer-2 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="All">All</option>
								<option value="Solved">Solved</option>
								<option value="Unsolved">Unsolved</option>
							</select>
						</div>
					</div>
				)}
			</div>
			
			{/* Problems Cards/Table */}
			<div className="space-y-3">
				{filteredProblems.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-gray-400 text-lg mb-2">No problems found</div>
						<div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
					</div>
				) : (
					filteredProblems.map((problem, idx) => {
						const isSolved = solvedProblems.includes(problem.id);
						return (
							<div
								key={problem.id}
								className="bg-dark-layer-1 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-all duration-200 hover:shadow-lg"
							>
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
									{/* Left side - Status, Title, Tags */}
									<div className="flex items-start sm:items-center space-x-4 flex-1">
										{/* Status Icon */}
										<div className="flex-shrink-0">
											{isSolved ? (
												<BsCheckCircle className="w-6 h-6 text-green-400" />
											) : (
												<div className="w-6 h-6 rounded-full border-2 border-gray-500"></div>
											)}
										</div>
										
										{/* Problem Info */}
										<div className="flex-1 min-w-0">
											<div className="flex items-center space-x-3 mb-2">
												<h3 className="text-lg font-medium text-white truncate">
													<Link
														href={problem.link || `/problems/${problem.id}`}
														className="hover:text-blue-400 transition-colors"
														target={problem.link ? '_blank' : '_self'}
													>
														{problem.title}
													</Link>
												</h3>
												
												{/* Difficulty Badge */}
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
													{problem.difficulty}
												</span>
											</div>
											
											{/* Category and Tags */}
											<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
												<div className="flex items-center space-x-2">
													{getCategoryIcon(problem.category)}
													<span>{problem.category}</span>
												</div>
												
												{/* Tags */}
												{problem.tags && problem.tags.length > 0 && (
													<div className="flex flex-wrap gap-1">
														{problem.tags.slice(0, 3).map((tag, tagIdx) => (
															<span
																key={tagIdx}
																className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300"
															>
																{tag}
															</span>
														))}
														{problem.tags.length > 3 && (
															<span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
																+{problem.tags.length - 3}
															</span>
														)}
													</div>
												)}
											</div>
										</div>
									</div>
									
									{/* Right side - Actions */}
									<div className="flex items-center space-x-3">
										{problem.videoId && (
											<button
												onClick={() => setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })}
												className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition-colors group"
												title="Watch solution video"
											>
												<AiFillYoutube className="w-5 h-5 text-red-400 group-hover:text-red-300" />
											</button>
										)}
										
										<Link
											href={problem.link || `/problems/${problem.id}`}
											target={problem.link ? '_blank' : '_self'}
											className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
										>
											Solve
										</Link>
									</div>
								</div>
							</div>
						);
					})
				)}
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
						<div className='bg-dark-layer-1 rounded-lg overflow-hidden'>
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
export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			try {
				console.log('🔄 Starting to fetch problems...');
				setLoadingProblems(true);
				const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
				console.log('📋 Firestore query created, fetching docs...');
				const querySnapshot = await getDocs(q);
				console.log(`📊 Query completed, found ${querySnapshot.size} documents`);
				const tmp: DBProblem[] = [];
				querySnapshot.forEach((doc) => {
					console.log(`📄 Processing document: ${doc.id}`, doc.data());
					tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
				});
				console.log('✅ Problems loaded successfully:', tmp.length);
				setProblems(tmp);
				setLoadingProblems(false);
			} catch (error) {
				console.error('❌ Error fetching problems:', error);
				setLoadingProblems(false);
			}
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}
