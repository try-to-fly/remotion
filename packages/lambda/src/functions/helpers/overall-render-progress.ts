import type {AwsRegion} from '../../client';
import {overallProgressKey} from '../../shared/constants';
import {lambdaWriteFile} from './io';

export type OverallRenderProgress = {
	chunks: number[];
	framesRendered: number;
	framesEncoded: number;
};

export type OverallProgressHelper = {
	upload: () => Promise<void>;
	finishUploading: () => void;
	setFrames: ({
		encoded,
		rendered,
		index,
	}: {
		rendered: number;
		encoded: number;
		index: number;
	}) => void;
	addChunkCompleted: (chunkIndex: number) => void;
};

export const makeOverallRenderProgress = ({
	renderId,
	bucketName,
	expectedBucketOwner,
	region,
	expectedChunks,
}: {
	renderId: string;
	bucketName: string;
	expectedBucketOwner: string;
	region: AwsRegion;
	expectedChunks: number;
}): OverallProgressHelper => {
	const framesRendered = new Array(expectedChunks).fill(0);
	const framesEncoded = new Array(expectedChunks).fill(0);

	const renderProgress: OverallRenderProgress = {
		chunks: [],
		framesRendered: 0,
		framesEncoded: 0,
	};

	let currentUploadPromise: Promise<void> | null = null;

	let lastUpload: string | null = null;
	let stopUploading = false;
	const finishUploading = () => {
		stopUploading = true;
	};

	const upload = async () => {
		if (stopUploading) {
			return;
		}

		if (lastUpload === JSON.stringify(renderProgress)) {
			return;
		}

		if (currentUploadPromise) {
			currentUploadPromise = currentUploadPromise.then(() => {
				currentUploadPromise = null;
				return upload();
			});
			return;
		}

		currentUploadPromise = lambdaWriteFile({
			body: JSON.stringify(renderProgress),
			bucketName,
			customCredentials: null,
			downloadBehavior: null,
			expectedBucketOwner,
			key: overallProgressKey(renderId),
			privacy: 'private',
			region,
		});
		await currentUploadPromise;
		lastUpload = JSON.stringify(renderProgress);
		currentUploadPromise = null;
	};

	return {
		upload,
		finishUploading,
		setFrames: ({
			encoded,
			rendered,
			index,
		}: {
			rendered: number;
			encoded: number;
			index: number;
		}) => {
			framesRendered[index] = rendered;
			framesEncoded[index] = encoded;

			renderProgress.framesRendered = framesRendered.reduce((a, b) => a + b, 0);
			renderProgress.framesEncoded = framesEncoded.reduce((a, b) => a + b, 0);
			upload();
		},
		addChunkCompleted: (chunkIndex) => {
			renderProgress.chunks.push(chunkIndex);
			upload();
		},
	};
};
