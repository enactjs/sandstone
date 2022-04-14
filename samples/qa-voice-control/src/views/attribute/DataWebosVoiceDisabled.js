import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);

const DataWebosVoiceDisabled = () => {
	const [result, setResult] = useState('');

	const updateResult = (msg) => () => setResult(msg);

	const handleVoice = useCallback((e) => {
		let {intent, value} = e.detail;
		updateResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	return (
		<CommonView title="data-webos-voice-disabled" subtitle={result}>
			<Heading>Default</Heading>
			<Button onClick={updateResult('Selected > 사진')}>사진</Button>
			<Heading>data-webos-voice-disabled</Heading>
			<VoiceButton
				data-webos-voice-disabled
				data-webos-voice-intent="Select Delete"
				onClick={updateResult('Selected > 사과')}
				onVoice={handleVoice}
			>
				사과
			</VoiceButton>
			<Heading>Disabled Button</Heading>
			<Button disabled onClick={updateResult('Selected > 필터')}>필터</Button>
		</CommonView>
	);

};

export default DataWebosVoiceDisabled;
