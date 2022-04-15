import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useCallback, useEffect, useReducer, useRef, useState} from 'react';

import CommonView from '../../components/CommonView';

const VoiceItem = VoiceControlDecorator(Item);

let itemList = [];
for (let i = 0; i < 30; i++) {
	itemList.push('item' + i);
}

const itemSize = ri.scale(96);

const DataWebosVoiceLabelIndex = () => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	const [result, setResult] = useState('');
	const firstVisibleRef = useRef(0);
	const lastVisibleRef = useRef(0);
	const scrollToRef = useRef(null);


	useEffect(() => {
		scrollToRef.current({index: 0});
	}, []);

	const getScrollTo = useCallback((fn) => {
		scrollToRef.current = fn;
	}, []);

	const updateResult = (msg) => setResult(msg);

	const handleClick = useCallback((e) => {
		let {index} = e.currentTarget.dataset;
		updateResult(`Selected > ${index}`);
	}, []);

	const handleVoice = useCallback((e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		updateResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	}, []);

	const renderItem = useCallback(({index, ...rest}) => {
		let screenIndex = (index >= firstVisibleRef.current && index <= lastVisibleRef.current) ? index - firstVisibleRef.current + 1 : null;
		return (
			<VoiceItem
				key={index}
				data-webos-voice-intent="Select PlayContent Delete"
				onClick={handleClick}
				onVoice={handleVoice}
				data-webos-voice-label-index={screenIndex}
				style={{height: itemSize + 'px'}}
				{...rest}
			>
				{itemList[index]}
			</VoiceItem>
		);
	}, [handleClick, handleVoice]);

	const handleScrollStop = useCallback(({moreInfo: {firstVisibleIndex, lastVisibleIndex}}) => {
		firstVisibleRef.current = firstVisibleIndex;
		lastVisibleRef.current = lastVisibleIndex;

		setTimeout(() => {
			forceUpdate();
		}, 1);
	}, []);

	return (
		<CommonView noScroller title="data-webos-voice-label-index" subtitle={result}>
			<VirtualList
				cbScrollTo={getScrollTo}
				dataSize={itemList.length}
				direction="vertical"
				itemRenderer={renderItem}
				itemSize={itemSize}
				onScrollStop={handleScrollStop}
				spacing={0}
			/>
		</CommonView>
	);
};

export default DataWebosVoiceLabelIndex;
