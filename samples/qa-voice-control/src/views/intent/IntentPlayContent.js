import Item from '@enact/sandstone/Item';
import Repeater from '@enact/ui/Repeater';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceItem = VoiceControlDecorator(Item);

const itemList = ['스파이더맨', '영화', '사진'];

const IntentPlayContent = () => {
	const [result, setResult] = useState('');

	const showResult = (msg) => setResult(msg);

	const handleVoice = useCallback((e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		showResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	return (
		<CommonView title="Intent to play content" subtitle={result}>
			<Repeater
				childComponent={VoiceItem}
				itemProps={{
					'data-webos-voice-intent': 'Select PlayContent',
					onVoice: handleVoice
				}}
			>
				{itemList}
			</Repeater>
		</CommonView>
	);
};

export default IntentPlayContent;
