export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// Enhanced example type for LeetCode-style problems
export type LeetCodeExample = {
	input: string;
	output: string;
	explanation?: string;
};

// local problem data (keeping existing structure for compatibility)
export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
};

// Enhanced DBProblem type for LeetCode-style functionality
export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
	tags?: string[];
	isImplemented?: boolean;
	
	// Enhanced LeetCode-style fields
	description?: string;
	examples?: LeetCodeExample[];
	constraints?: string[];
	hints?: string[];
	companies?: string[];
	frequency?: number; // 1-5 scale
	acceptanceRate?: number;
	
	// Code templates for multiple languages
	starterCode?: {
		javascript: string;
		python: string;
		java: string;
		cpp: string;
	};
	
	// Test cases (hidden from users)
	testCases?: {
		input: any[];
		expectedOutput: any;
	}[];
	
	// Timestamps
	createdAt?: any;
	updatedAt?: any;
};

// Language support for code editor
export type SupportedLanguage = "javascript" | "python" | "java" | "cpp";

// Code submission interface
export interface CodeSubmission {
	problemId: string;
	userId: string;
	language: SupportedLanguage;
	code: string;
	status: "pending" | "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded";
	runtime?: number;
	memory?: number;
	submittedAt: any;
}

// Test result interface
export interface TestResult {
	passed: boolean;
	input: any[];
	expected: any;
	actual: any;
	error?: string;
	runtime?: number;
}

// User progress tracking
export interface UserProgress {
	userId: string;
	problemsSolved: string[];
	submissions: CodeSubmission[];
	category: string;
	difficulty: string;
	lastSolved?: any;
}
