import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);

const DataWebosVoiceIntent = () => {
	const [result, setResult] = useState('');

	const updateResult = (msg) => () => setResult(msg);
	const handleVoice = useCallback((e) => {
		let {intent, value} = e.detail;
		updateResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	return (
		<CommonView title="data-webos-voice-intent" subtitle={result}>
			<Heading>default | Select</Heading>
			<Button onClick={updateResult('Selected > 안녕')}>안녕</Button>
			<Heading>{'override | Select -> Select PlayContent Delete'}</Heading>
			<VoiceButton
				data-webos-voice-intent="Select PlayContent Delete"
				onClick={updateResult('Selected > 필터')}
				onVoice={handleVoice}
			>
				필터
			</VoiceButton>
		</CommonView>
	);

};

export default DataWebosVoiceIntent;
