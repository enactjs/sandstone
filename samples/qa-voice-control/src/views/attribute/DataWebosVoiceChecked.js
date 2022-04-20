import Heading from '@enact/sandstone/Heading';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const DataWebosVoiceChecked = () => {
	const [isChecked, setIsChecked] = useState(false);

	const handleClick = useCallback(() => {
		let checked = document.getElementById('myCheckbox').checked;
		setIsChecked(checked);
	}, []);

	return (
		<CommonView title="data-webos-voice-checked">
			<Heading>Customized Checkbox</Heading>
			<input
				data-webos-voice-checked={isChecked}
				data-webos-voice-intent="SelectCheckItem"
				data-webos-voice-label="고양이"
				id="myCheckbox"
				onClick={handleClick}
				type="checkbox"
			/>
			고양이
		</CommonView>
	);
};

export default DataWebosVoiceChecked;
