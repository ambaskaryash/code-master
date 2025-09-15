import CodeMasterProblemPage from '@/components/ProblemPage/LeetCodeProblemPage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DBProblem } from '@/utils/types/problem';
import { GetServerSideProps } from 'next';
import { supabase } from '@/lib/supabase';

interface ProblemPageWrapperProps {
	problem: DBProblem;
}

const ProblemPageWrapper: React.FC<ProblemPageWrapperProps> = ({ problem }) => {
	return <CodeMasterProblemPage problem={problem} />;
};

export default ProblemPageWrapper;

// Use getServerSideProps to fetch problem data
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const problemId = params?.pid as string;
	
	if (!problemId) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: problem, error } = await supabase
			.from('problems')
			.select('*')
			.eq('id', problemId)
			.single();

		if (error || !problem) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				problem,
			},
		};
	} catch (error) {
		console.error('Error fetching problem:', error);
		return {
			notFound: true,
		};
	}
};
