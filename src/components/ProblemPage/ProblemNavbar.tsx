import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FaCode, FaChevronLeft, FaGithub, FaStar } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import Timer from "../Timer/Timer";
import Image from "next/image";

interface ProblemNavbarProps {
  problemTitle?: string;
}

const ProblemNavbar: React.FC<ProblemNavbarProps> = ({ problemTitle }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <nav className='relative flex h-16 w-full shrink-0 items-center px-6 bg-gradient-to-r from-dark-layer-1 via-gray-900 to-dark-layer-1 border-b border-gray-700/50 backdrop-blur-sm shadow-lg'>
      <div className="flex w-full items-center justify-between">
        {/* Left Section - Logo and Brand */}
        <Link href='/' className='flex items-center space-x-3 group'>
          <div className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200'></div>
            <div className='relative bg-dark-layer-1 p-2 rounded-lg border border-gray-700'>
              <FaCode className='text-blue-400 w-6 h-6' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-2'>
              <span className='text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent'>
                CodeMaster
              </span>
              <HiSparkles className='text-yellow-400 w-4 h-4 animate-pulse' />
            </div>
            <span className='text-xs text-gray-400 font-medium tracking-wide'>
              Master Your Skills
            </span>
          </div>
        </Link>

        {/* Center Section - Problem Info and Navigation */}
        <div className='flex items-center gap-4'>
          {/* Back to Problems */}
          <Link
            href='/'
            className='flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 cursor-pointer transition-all duration-200'
          >
            <FaChevronLeft className='text-blue-400' />
            <span className='whitespace-nowrap'>Problem List</span>
          </Link>

          {/* Current Problem Title */}
          {problemTitle && (
            <div className='flex items-center gap-2 px-4 py-2 bg-dark-layer-2/50 rounded-lg border border-gray-700/30'>
              <span className='text-gray-300 font-medium truncate max-w-[300px]'>
                {problemTitle}
              </span>
            </div>
          )}
        </div>

        {/* Right Section - User Actions */}
        <div className='flex items-center space-x-3'>
          {/* GitHub Link */}
          <a
            href='https://github.com'
            target='_blank'
            rel='noreferrer'
            className='p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95'
            title='View on GitHub'
          >
            <FaGithub className='w-5 h-5' />
          </a>

          {/* Premium Badge */}
          <div className='relative'>
            <a
              href='#'
              className='flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg'
            >
              <FaStar className='w-4 h-4' />
              <span>Premium</span>
            </a>
          </div>

          {/* Timer */}
          {user && (
            <div className='bg-gray-800/50 rounded-lg border border-gray-700/30'>
              <Timer />
            </div>
          )}

          {/* Authentication */}
          {!user ? (
            <Link
              href='/auth'
              onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
            >
              <button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg'>
                Sign In
              </button>
            </Link>
          ) : (
            <div className='flex items-center space-x-3'>
              {/* User Avatar */}
              <div className='cursor-pointer group relative'>
                <div className='relative'>
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-200'></div>
                  <Image 
                    src='/avatar.png' 
                    alt='Avatar' 
                    width={36} 
                    height={36} 
                    className='relative rounded-full border-2 border-gray-600 group-hover:border-blue-400 transition-all duration-200' 
                  />
                  <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-layer-1'></div>
                </div>
                <div className='absolute top-12 right-0 mx-auto bg-dark-layer-1 border border-gray-700 text-white p-3 rounded-lg shadow-xl z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out min-w-[200px]'>
                  <p className='text-sm font-medium text-blue-400'>{user.email}</p>
                  <div className='h-px bg-gray-700 my-2'></div>
                  <div className='text-xs text-gray-400'>Click to view profile</div>
                </div>
              </div>

              {/* Logout Button */}
              <Logout />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ProblemNavbar;