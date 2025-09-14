import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import debug utility for browser console access
import "@/utils/debug-firebase";
import { useUserAuth } from "@/hooks/useUserAuth";
// Component to handle user authentication and initialization
function UserAuthWrapper({ children }: { children: React.ReactNode }) {
	// Initialize user authentication and ensure user document exists
	useUserAuth();
	return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>CodeMaster - Master Your Coding Skills</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.png' />
				<meta
					name='description'
					content='CodeMaster - The ultimate platform to master your coding skills with curated problems, real-time solutions, and comprehensive learning paths for software engineering interviews and professional development.'
				/>
				<meta name='keywords' content='coding, programming, algorithms, data structures, software engineering, technical interviews, leetcode, practice problems' />
				<meta name='author' content='CodeMaster Team' />
				<meta property='og:title' content='CodeMaster - Master Your Coding Skills' />
				<meta property='og:description' content='The ultimate platform to master your coding skills with curated problems and real-time solutions.' />
				<meta property='og:type' content='website' />
			</Head>
			<ToastContainer />
			<UserAuthWrapper>
				<Component {...pageProps} />
			</UserAuthWrapper>
		</RecoilRoot>
	);
}
