import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {useRef, useState} from 'react';

import CommonView from '../../components/CommonView';

const DataWebosVoiceGroupLabel = () => {
	const [result, setResult] = useState('');
	const voiceGroupLabels = useRef(JSON.stringify(['우리집', '외국']));

	const updateResult = (msg) => () => setResult(msg);

	return (
		<CommonView title="data-webos-voice-group-label" subtitle={result}>
			<Heading>Group Name | 동물원</Heading>
			<div>
				<Button data-webos-voice-group-label="동물원" onClick={updateResult('Selected > 동물원 | 고양이')}>고양이</Button>
				<Button data-webos-voice-group-label="동물원" onClick={updateResult('Selected > 동물원 | 강아지')}>강아지</Button>
			</div>
			<Heading>Group Name | 운동장</Heading>
			<div>
				<Button data-webos-voice-group-label="운동장" onClick={updateResult('Selected > 운동장 | 고양이')}>고양이</Button>
				<Button data-webos-voice-group-label="운동장" onClick={updateResult('Selected > 운동장 | 강아지')}>강아지</Button>
			</div>
			<Heading>Group Names | 우리집, 외국</Heading>
			<div>
				<Button data-webos-voice-group-labels={voiceGroupLabels.current} onClick={updateResult('Selected > 우리집, 외국 | 고양이')}>고양이</Button>
				<Button data-webos-voice-group-labels={voiceGroupLabels.current} onClick={updateResult('Selected > 우리집, 외국 | 강아지')}>강아지</Button>
			</div>
		</CommonView>
	);
};

export default DataWebosVoiceGroupLabel;
