/* eslint-disable max-depth */
import type {TrakBox} from './boxes/iso-base-media/trak/trak';
import {trakBoxContainsVideo} from './get-fps';
import type {KnownVideoCodecs} from './options';
import type {AnySegment} from './parse-result';
import {getMoovBox, getStsdBox, getTraks} from './traversal';

export const hasVideoCodec = (boxes: AnySegment[]): boolean => {
	try {
		return getVideoCodec(boxes) !== null;
	} catch (e) {
		return false;
	}
};

export const getVideoCodecString = (trakBox: TrakBox): string | null => {
	const stsdBox = getStsdBox(trakBox);
	if (stsdBox && stsdBox.type === 'stsd-box') {
		const videoSample = stsdBox.samples.find((s) => s.type === 'video');
		if (videoSample && videoSample.type === 'video') {
			const avccBox = videoSample.descriptors.find(
				(c) => c.type === 'avcc-box',
			);
			if (avccBox && avccBox.type === 'avcc-box') {
				return `${videoSample.format}.${avccBox.configurationString}`;
			}

			const hvccBox = videoSample.descriptors.find(
				(c) => c.type === 'hvcc-box',
			);
			if (hvccBox && hvccBox.type === 'hvcc-box') {
				return `${videoSample.format}.${hvccBox.configurationString}`;
			}
		}
	}

	return null;
};

export const getVideoCodec = (boxes: AnySegment[]): KnownVideoCodecs | null => {
	const moovBox = getMoovBox(boxes);
	if (moovBox) {
		const trakBox = getTraks(moovBox).filter((t) => trakBoxContainsVideo(t))[0];
		if (trakBox) {
			const stsdBox = getStsdBox(trakBox);
			if (stsdBox && stsdBox.type === 'stsd-box') {
				const videoSample = stsdBox.samples.find((s) => s.type === 'video');
				if (videoSample && videoSample.type === 'video') {
					if (videoSample.format === 'hvc1') {
						return 'h265';
					}

					if (videoSample.format === 'avc1') {
						return 'h264';
					}

					if (videoSample.format === 'ap4h') {
						return 'prores';
					}
				}
			}
		}
	}

	const mainSegment = boxes.find((b) => b.type === 'main-segment');
	if (!mainSegment || mainSegment.type !== 'main-segment') {
		return null;
	}

	const tracksSegment = mainSegment.children.find(
		(b) => b.type === 'tracks-segment',
	);
	if (!tracksSegment || tracksSegment.type !== 'tracks-segment') {
		return null;
	}

	for (const track of tracksSegment.children) {
		if (track.type === 'track-entry-segment') {
			const trackType = track.children.find((b) => b.type === 'codec-segment');
			if (trackType && trackType.type === 'codec-segment') {
				if (trackType.codec === 'V_VP8') {
					return 'vp8';
				}

				if (trackType.codec === 'V_VP9') {
					return 'vp9';
				}

				if (trackType.codec === 'V_AV1') {
					return 'av1';
				}

				if (trackType.codec === 'V_MPEG4/ISO/AVC') {
					return 'h264';
				}
			}
		}
	}

	return null;
};
