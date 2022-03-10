import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import {useState} from 'react';

import CommonView from '../../components/CommonView';

// const petList = ['강아지', '고양이', '치킨'];
// const nameList = ['철수', '길동', '현수'];

const IntentSelect = () => {
	const [result, setResult] = useState('');

	const updateResult = (msg) => setResult(msg);

	const handleClick = (msg) => () => updateResult(msg);

	/* const handleExpandableList = (ev) => {
		updateResult('Selected > ' + petList[ev.selected]);
	};

	const handleExpandableItem = (value) => {
		updateResult('Selected > ' + value);
	};*/

	return (
		<CommonView title="Intent to select" subtitle={result}>
			<Heading showLine>Button</Heading>
			<Button onClick={handleClick('Button | 사진 필터')}>사진 필터</Button>
			<Heading showLine>IconButton</Heading>
			<Button data-webos-voice-label="별" tooltipText="별" onClick={handleClick('IconButton | 별')} icon="star" />
			<Heading showLine>Item</Heading>
			<Item onClick={handleClick('Item | 다크 나이트')}>다크 나이트</Item>
		</CommonView>
	);
};

export default IntentSelect;
