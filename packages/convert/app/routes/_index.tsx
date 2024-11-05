import type {MetaFunction} from '@remix-run/node';
import {useState} from 'react';
import {FileAvailable} from '~/components/FileAvailable';
import {PickFile} from '~/components/PickFile';
import {SAMPLE_FILE, TEST_FAST} from '~/lib/config';

export const meta: MetaFunction = () => {
	return [
		{title: 'Remotion Convert'},
		{name: 'description', content: 'Fast video conersion in the browser.'},
	];
};

const Index = () => {
	const [src, setSrc] = useState<string | null>(TEST_FAST ? SAMPLE_FILE : null);

	return (
		<div className="font-sans p-4 flex justify-center items-center h-screen bg-slate-50 ">
			{src ? (
				<FileAvailable src={src} setSrc={setSrc} />
			) : (
				<PickFile setSrc={setSrc} />
			)}
		</div>
	);
};

export default Index;
