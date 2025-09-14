import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { SecurityValidator } from "@/utils/security-validation";
import TwoFactorSetupModal from "./TwoFactorSetup";
import { IoShieldCheckmark } from "react-icons/io5";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
	const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
	const [newUserId, setNewUserId] = useState<string | null>(null);
	const router = useRouter();
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		// Validate and sanitize inputs
		const validation = SecurityValidator.validateRegistration(inputs);
		if (!validation.isValid) {
			toast.error(validation.errors.join('; '), { position: "top-center" });
			return;
		}
		
		try {
			toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
			
			const newUser = await createUserWithEmailAndPassword(
				validation.sanitizedData!.email, 
				validation.sanitizedData!.password
			);
			
			if (!newUser) return;
			
			const userData = {
				uid: newUser.user.uid,
				email: validation.sanitizedData!.email,
				displayName: validation.sanitizedData!.displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
				twoFactor: {
					isEnabled: false,
					secret: null,
					backupCodes: []
				}
			};
			
			await setDoc(doc(firestore, "users", newUser.user.uid), userData);
			
			// Store user ID and show 2FA setup option
			setNewUserId(newUser.user.uid);
			toast.dismiss("loadingToast");
			toast.success("Account created successfully!", { position: "top-center" });
			
			// Show 2FA setup modal
			setShowTwoFactorSetup(true);
			
		} catch (error: any) {
			console.error('Registration error:', error);
			toast.error(error.message, { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	const handle2FASetupComplete = () => {
		setShowTwoFactorSetup(false);
		router.push("/");
	};
	
	const handle2FASetupSkip = () => {
		setShowTwoFactorSetup(false);
		router.push("/");
	};
	
	useEffect(() => {
		if (error) alert(error.message);
	}, [error]);

	return (
		<>
			<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
				<div className='text-center'>
					<h3 className='text-xl font-medium text-white mb-2'>Register to CodeMaster</h3>
					<div className='flex items-center justify-center space-x-2 text-sm text-blue-400'>
						<IoShieldCheckmark className='w-4 h-4' />
						<span>Secure registration with 2FA support</span>
					</div>
				</div>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email
				</label>
				<input
					onChange={handleChangeInput}
					type='email'
					name='email'
					id='email'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
					Display Name
				</label>
				<input
					onChange={handleChangeInput}
					type='displayName'
					name='displayName'
					id='displayName'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='John Doe'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password
				</label>
				<input
					onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='Strong password required'
				/>
				<p className='text-xs text-gray-400 mt-1'>
					Must contain 8+ characters with uppercase, lowercase, number & special character
				</p>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '
			>
				{loading ? "Registering..." : "Register"}
			</button>

				<div className='text-sm font-medium text-gray-300'>
					Already have an account?{" "}
					<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
						Log In
					</a>
				</div>
			</form>
			
			{/* 2FA Setup Modal */}
			{showTwoFactorSetup && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
					<div className="bg-dark-layer-1 p-6 rounded-lg max-w-md w-full mx-4">
						<h3 className="text-xl font-medium text-white mb-4">Secure Your Account</h3>
						<p className="text-gray-400 mb-6">
							Would you like to enable Two-Factor Authentication for enhanced security?
						</p>
						<div className="flex space-x-3">
							<button
								onClick={() => setShowTwoFactorSetup(false)}
								className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
							>
								Set Up Later
							</button>
							<button
								onClick={() => {
									setShowTwoFactorSetup(false);
									// This will be handled by the parent component or a separate 2FA setup flow
								}}
								className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
							>
								Enable 2FA
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Signup;
