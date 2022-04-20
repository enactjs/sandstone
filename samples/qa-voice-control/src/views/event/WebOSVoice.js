import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);

const Sample = () => {
	const [result, setResult] = useState('');

	const showResult = (msg) => setResult(msg);

	const handleClick = useCallback(() => {
		showResult('handleClick > Hello');
	}, []);

	const handleVoice = useCallback((e) => {
		let {intent, value} = e.detail;
		showResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	return (
		<CommonView title="webOSVoice" subtitle={result}>
			<Heading>Customized Intent | Select PlayContent Delete</Heading>
			<VoiceButton data-webos-voice-intent="Select PlayContent Delete" onVoice={handleVoice} onClick={handleClick}>Hello</VoiceButton>
		</CommonView>
	);
};

export default Sample;
