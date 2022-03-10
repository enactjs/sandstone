import {Panel} from '@enact/sandstone/Panels';
import {useCallback, useEffect, useRef, useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

const MainView = () => {
	const [horizontal, setHorizontal] = useState(false);
	const [nativeScroll, setNativeScroll] = useState(true);
	const scrollTo = useRef();

	useEffect( () => {
		scrollTo.current({index: 0, animate: false, focus: true});
	});

	const onChangeDirection = useCallback(() => {
		setHorizontal(!horizontal);
	}, [horizontal]);

	const onChangeScrollMode = useCallback(({selected: selNativeScroll}) => {
		setNativeScroll(selNativeScroll);
	}, []);

	const getScrollTo = useCallback((fn) => {
		scrollTo.current = fn;
	}, []);

	return (
		<Panel>
			<PanelHeader
				nativeScroll={nativeScroll}
				onChangeDirection={onChangeDirection}
				onChangeScrollMode={onChangeScrollMode}
				slot="header"
				title="VirtualGridList"
				type="mini"
			/>
			<ImageList
				cbScrollTo={getScrollTo}
				direction={horizontal ? 'horizontal' : 'vertical'}
				key={nativeScroll ? 'native' : 'translate'}
				scrollMode={nativeScroll ? 'native' : 'translate'}
			/>
		</Panel>
	);
};

export default MainView;
