import { authModalState } from "@/atoms/authModalAtom";
import { signUpUser } from "@/lib/auth-helpers";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SecurityValidator } from "@/utils/security-validation";
import { IoShieldCheckmark } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		// Basic validation
		if (!inputs.email || !inputs.password || !inputs.displayName) {
			toast.error("Please fill all fields", { position: "top-center" });
			return;
		}
		
		if (inputs.password.length < 8) {
			toast.error("Password must be at least 8 characters", { position: "top-center" });
			return;
		}
		
		setLoading(true);
		toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
		
		try {
			const result = await signUpUser(inputs.email, inputs.password, inputs.displayName);
			
			if (!result.success) {
				throw new Error(result.error || "Failed to create account");
			}
			
			if (result.needsEmailVerification) {
				toast.dismiss("loadingToast");
				toast.info("Please check your email to verify your account", { position: "top-center", autoClose: 5000 });
				return;
			}
			
			toast.dismiss("loadingToast");
			toast.success("Account created successfully!", { position: "top-center" });
			
			// Redirect to home page
			router.push("/");
			
		} catch (error: any) {
			console.error('Registration error:', error);
			toast.error(error.message, { position: "top-center" });
		} finally {
			setLoading(false);
			toast.dismiss("loadingToast");
		}
	};


	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/`,
				}
			});
			
			if (error) {
				throw error;
			}
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
			setLoading(false);
		}
	};
	

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
				disabled={loading}
			>
				{loading ? "Registering..." : "Register"}
			</button>

			<div className="flex items-center justify-center py-2">
				<div className="flex-grow border-t border-gray-600"></div>
				<span className="mx-4 text-gray-400 text-sm">or</span>
				<div className="flex-grow border-t border-gray-600"></div>
			</div>

			<button
				type='button'
				onClick={handleGoogleSignIn}
				disabled={loading}
				className='w-full flex items-center justify-center gap-3 text-white border border-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-700 hover:bg-gray-600 transition-colors'
			>
				<FcGoogle className="w-5 h-5" />
				{loading ? "Loading..." : "Continue with Google"}
			</button>

				<div className='text-sm font-medium text-gray-300'>
					Already have an account?{" "}
					<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
						Log In
					</a>
				</div>
			</form>
		</>
	);
};
export default Signup;
