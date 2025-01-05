import type {GenericRenderProgress} from '@remotion/serverless';
import {type Privacy} from '@remotion/serverless/client';
import {NoReactInternals} from 'remotion/no-react';
import type {AwsProvider} from '../functions/aws-implementation';
import type {AwsRegion} from '../regions';

export const MIN_MEMORY = 512;
export const MAX_MEMORY = 10240;
export const DEFAULT_MEMORY_SIZE = 2048;

export const DEFAULT_TIMEOUT = 120;
export const MIN_TIMEOUT = 15;
export const MAX_TIMEOUT = 900;

export const MINIMUM_FRAMES_PER_LAMBDA = 4;
export const DEFAULT_FRAMES_PER_LAMBDA = 20;

export const BINARY_NAME = 'remotion lambda';
export const COMMAND_NOT_FOUND = 'Command not found';
export const DEFAULT_REGION: AwsRegion = 'us-east-1';
export const DEFAULT_MAX_RETRIES = 1;

export const MAX_FUNCTIONS_PER_RENDER = 200;

export const MAX_EPHEMERAL_STORAGE_IN_MB = 10240;
export const DEFAULT_EPHEMERAL_STORAGE_IN_MB =
	NoReactInternals.ENABLE_V5_BREAKING_CHANGES
		? MAX_EPHEMERAL_STORAGE_IN_MB
		: 2048;
export const MIN_EPHEMERAL_STORAGE_IN_MB = 512;

export const DEFAULT_OUTPUT_PRIVACY: Privacy = 'public';

export const DEFAULT_CLOUDWATCH_RETENTION_PERIOD = 14;

export const RENDER_FN_PREFIX = 'remotion-render-';
export const LOG_GROUP_PREFIX = '/aws/lambda/';
export const LAMBDA_INSIGHTS_PREFIX = '/aws/lambda-insights';

export const getSitesKey = (siteId: string) => `sites/${siteId}`;

export const RENDERER_PATH_TOKEN = 'remotion-bucket';
export const CONCAT_FOLDER_TOKEN = 'remotion-concat';
export const REMOTION_CONCATED_TOKEN = 'remotion-concated-token';
export const REMOTION_FILELIST_TOKEN = 'remotion-filelist';

export type RenderProgress = GenericRenderProgress<AwsProvider>;

export const LAMBDA_CONCURRENCY_LIMIT_QUOTA = 'L-B99A9384';
