import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
import { FaCode } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
	return (
		<div className='flex items-center justify-between sm:px-12 px-2 md:px-24 py-4'>
			<Link href='/' className='flex items-center space-x-3 group'>
				<div className='relative'>
					<div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200'></div>
					<div className='relative bg-dark-layer-1 p-3 rounded-lg border border-gray-700'>
						<FaCode className='text-blue-400 w-8 h-8' />
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center space-x-2'>
						<span className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent'>
							CodeMaster
						</span>
						<HiSparkles className='text-yellow-400 w-5 h-5 animate-pulse' />
					</div>
					<span className='text-sm text-gray-400 font-medium tracking-wide'>
						Master Your Skills
					</span>
				</div>
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg'
					onClick={handleClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};
export default Navbar;
