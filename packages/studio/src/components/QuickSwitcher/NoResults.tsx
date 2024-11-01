import React from 'react';
import {LIGHT_TEXT} from '../../helpers/colors';

const container: React.CSSProperties = {
	padding: 80,
	color: LIGHT_TEXT,
	textAlign: 'center',
	fontSize: 14,
};

export type QuickSwitcherMode = 'commands' | 'compositions' | 'docs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MODE_TO_STRING: {[key in QuickSwitcherMode]: string} = {
	commands: 'commands',
	compositions: 'compositions',
	docs: 'documentation',
};

export const QuickSwitcherNoResults: React.FC<{
	query: string;
	mode: QuickSwitcherMode;
}> = ({query, mode}) => {
	return (
		<div style={container}>
			No {MODE_TO_STRING[mode]} matching {'"'}
			{query}
			{'"'}
		</div>
	);
};
