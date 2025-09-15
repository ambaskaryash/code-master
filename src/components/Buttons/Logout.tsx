import { signOut } from "@/lib/supabase";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const Logout: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		setLoading(true);
		try {
			await signOut();
			toast.success("Successfully signed out!", { position: "top-center", autoClose: 2000, theme: "dark" });
			router.push("/auth");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		} finally {
			setLoading(false);
		}
	};
	return (
		<button 
			className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors' 
			onClick={handleLogout}
			disabled={loading}
		>
			<FiLogOut className="w-4 h-4" />
			<span>{loading ? "Signing out..." : "Sign Out"}</span>
		</button>
	);
};
export default Logout;
