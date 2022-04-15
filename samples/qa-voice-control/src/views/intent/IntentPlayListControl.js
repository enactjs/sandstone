import {Panel} from '@enact/sandstone/Panels';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useState, useCallback} from 'react';

import CommonView from '../../components/CommonView';

const VoicePanel = VoiceControlDecorator(Panel);

const IntentPlayListControl = () => {
	const [result, setResult] = useState('');

	const showResult = (msg) => setResult(msg);

	const handleVoice = useCallback((e) => {
		let direction = e.detail.control;
		showResult('handleVoice > ' + direction);
		e.preventDefault();
	}, []);

	return (
		<VoicePanel noCloseButton data-webos-voice-intent="PlayListControl" onVoice={handleVoice}>
			<CommonView noScroller title="Intent to play list control" subtitle={result}>
				<div>{'이전 컨텐츠 재생'}</div>
				<div>{'다음 컨텐츠 재생'}</div>
			</CommonView>
		</VoicePanel>
	);
};

export default IntentPlayListControl;
