import Item from '@enact/sandstone/Item';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback} from 'react';

import CommonView from '../../components/CommonView';

const VoiceDiv = VoiceControlDecorator('div');
const VoiceItem = VoiceControlDecorator(Item);

const UseCaseVoiceControlDecorator = () => {
	const handlePlayListControl = useCallback((e) => {
		const {intent, control} = e.detail;
		console.log('handlePlayControl > ', intent, control);	// eslint-disable-line no-console
		e.preventDefault();
	}, []);

	const handlePlayContent = useCallback((e) => {
		const {intent, value} = e.detail;
		console.log('handlePlayContent > ', intent, value);	// eslint-disable-line no-console
		e.preventDefault();
	}, []);

	return (
		<CommonView title="Voice Control Decorator">
			<VoiceDiv
				data-webos-voice-intent="PlayListControl"
				onVoice={handlePlayListControl}
			/>
			<VoiceItem
				data-webos-voice-intent="Select PlayContent"
				onVoice={handlePlayContent}
			>
				The Dark Knight
			</VoiceItem>
		</CommonView>
	);
};

export default UseCaseVoiceControlDecorator;
