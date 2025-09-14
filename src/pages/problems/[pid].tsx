import ProblemPage from '@/components/ProblemPage/ProblemPage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { DBProblem } from '@/utils/types/problem';
import { GetServerSideProps } from 'next';

interface ProblemPageWrapperProps {
	problemId: string;
}

const ProblemPageWrapper: React.FC<ProblemPageWrapperProps> = ({ problemId }) => {
	return <ProblemPage problemId={problemId} />;
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
