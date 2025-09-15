import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const setAuthModalState = useSetRecoilState(authModalState);
	const { user, loading } = useSupabaseAuth();
	const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) {
			setPageLoading(false);
			// Auto-open the auth modal when page loads
			setAuthModalState({ isOpen: true, type: 'login' });
		}
	}, [user, router, loading, setAuthModalState]);

	if (pageLoading) return null;

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image 
						src='/hero.png' 
						alt='Hero img' 
						width={700} 
						height={700} 
						priority 
						style={{
							width: 'auto',
							height: 'auto',
							maxWidth: '700px',
							maxHeight: '700px'
						}}
					/>
				</div>
				<AuthModal />
			</div>
		</div>
	);
};
export default AuthPage;
