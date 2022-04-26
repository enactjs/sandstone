import Item from '@enact/sandstone/Item';
import Repeater from '@enact/ui/Repeater';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceItem = VoiceControlDecorator(Item);

const itemList = ['사진', '노래', '라디오 스타'];

const IntentDelete = () => {
	const [result, setResult] = useState('');

	const showResult = (msg) => setResult(msg);

	const handleVoice = useCallback((e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		showResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	return (
		<CommonView title="Intent to delete" subtitle={result}>
			<VoiceItem
				data-webos-voice-intent="Delete"
				data-webos-voice-label="비디오 스타"
				onVoice={handleVoice}
			>
				비디오 스타
			</VoiceItem>
			<Repeater
				childComponent={VoiceItem}
				itemProps={{
					'data-webos-voice-intent': 'Select Delete',
					onVoice: handleVoice
				}}
			>
				{itemList}
			</Repeater>
		</CommonView>
	);
};

export default IntentDelete;
