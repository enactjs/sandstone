import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {useRef, useState} from 'react';

import CommonView from '../../components/CommonView';

const DataWebosVoiceLabel = () => {
	const [result, setResult] = useState('');
	const voiceLabels = useRef(JSON.stringify(['호랑이', '고양이']));

	const updateResult = (msg) => () => setResult(msg);

	return (
		<CommonView title="data-webos-voice-label" subtitle={result}>
			<Heading>Default | innerHTML</Heading>
			<Button
				onClick={updateResult('Selected > 필터')}
			>
				필터
			</Button>
			<Heading>{'Override(label) | 사과 -> 바나나)'}</Heading>
			<Button
				data-webos-voice-label="바나나"
				onClick={updateResult('Selected > 사과 -> 바나나')}
			>
				사과
			</Button>
			<Heading>{'Override(labels) | 원숭이 -> 호랑이, 고양이'}</Heading>
			<Button
				data-webos-voice-labels={voiceLabels.current}
				onClick={updateResult('Selected > 원숭이 -> 호랑이, 고양이')}
			>
				원숭이
			</Button>
		</CommonView>
	);
};

export default DataWebosVoiceLabel;
