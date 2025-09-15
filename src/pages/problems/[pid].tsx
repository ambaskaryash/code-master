import LeetCodeProblemPage from '@/components/ProblemPage/LeetCodeProblemPage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DBProblem } from '@/utils/types/problem';
import { GetServerSideProps } from 'next';

interface ProblemPageWrapperProps {
	problemId: string;
}

const ProblemPageWrapper: React.FC<ProblemPageWrapperProps> = ({ problemId }) => {
	return <LeetCodeProblemPage problemId={problemId} />;
};

export default ProblemPageWrapper;

// Use getServerSideProps to get dynamic problemId
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const problemId = params?.pid as string;
	
	if (!problemId) {
		return {
			notFound: true,
		};
	}
	
	return {
		props: {
			problemId,
		},
	};
};
