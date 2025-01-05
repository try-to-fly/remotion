import {ServerlessRoutines} from '@remotion/serverless/client';
import {expect, test} from 'vitest';
import {mockImplementation} from '../mock-implementation';

test('Info handler should return version', async () => {
	const response = await mockImplementation.callFunctionSync({
		type: ServerlessRoutines.info,
		payload: {
			logLevel: 'info',
			type: ServerlessRoutines.info,
		},
		functionName: 'remotion-dev-lambda',
		region: 'us-east-1',
		timeoutInTest: 120000,
	});

	expect(typeof response.version === 'string').toBe(true);
});
