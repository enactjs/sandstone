import ImageItem from '@enact/sandstone/ImageItem';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Spottable from '@enact/spotlight/Spottable';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import css from './App.module.less';

const maxDataSize = 50;
const items = [];

for (let i = 0; i < maxDataSize; i++) {
	const count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count
	});
}

const SpottableDiv = Spottable('div');

const VirtualGridListNativeSample = (props) => {
	const scrollToRef = useRef(null);
	const [testStep, setTestStep] = useState({step: 0, length: items.length});

	const getScrollTo = useCallback((scrollTo) => {
		scrollToRef.current = scrollTo;
	}, []);

	useLayoutEffect(() => {
		setTimeout(() => {
			scrollToRef.current({index: items.length - 1, animate: false, focus: true});
		}, 100);
	}, []);

	useEffect(() => {
		const dataSizeDiff = 10;
		const {step, length} = testStep;
		const next = {
			step: (step + 1) % 4,
			length: step < 2 ? length - dataSizeDiff : length + dataSizeDiff
		};

		setTimeout(() => {
			setTestStep(next);
		}, 5000);
	}, [testStep, setTestStep]);

	const renderItem = useCallback(({index, ...rest}) => {
		return (
			<ImageItem {...rest}>
				{items[index].text}
			</ImageItem>
		);
	}, []);

	return (
		<div className={css.app}>
			<SpottableDiv className={css.side} />
			<VirtualGridList
				{...props}
				cbScrollTo={getScrollTo}
				className={css.list}
				dataSize={testStep.length}
				itemRenderer={renderItem}
				itemSize={{minWidth: ri.scale(900), minHeight: ri.scale(780)}}
				spacing={0}
			/>
			<SpottableDiv className={css.side} />
		</div>
	);
};

export default ThemeDecorator(VirtualGridListNativeSample);
