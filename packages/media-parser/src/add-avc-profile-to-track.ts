import {getCodecPrivate} from './boxes/avc/codec-private';
import {getCodecStringFromSpsAndPps} from './boxes/avc/codec-string';
import type {VideoTrack} from './get-tracks';
import type {SpsAndPps} from './state/parser-state';

export const addAvcProfileToTrack = (
	track: VideoTrack,
	avc1Profile: SpsAndPps | null,
): VideoTrack => {
	if (avc1Profile === null) {
		return track;
	}

	return {
		...track,
		codec: getCodecStringFromSpsAndPps(avc1Profile.sps),
		codecPrivate: getCodecPrivate(avc1Profile),
	};
};
