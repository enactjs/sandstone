import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {scaleToRem} from '@enact/ui/resolution';
import Repeater from '@enact/ui/Repeater';
import {useCallback, useRef} from 'react';

import CommonView from '../../components/CommonView';


let itemList = [];

for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

const CustomItem = ({...rest}) => {
	return (
		<Item {...rest} />
	);
};

const IntentScroller = () => {
	const scrollTo = useRef();

	const cbScrollTo = useCallback((ref) => {
		scrollTo.current = ref;
	}, []);

	const handleClick = useCallback(() => {
		scrollTo.current({align: 'bottom', focus: true});
	}, []);

	return (
		<CommonView noScroller title="Intent to scroll">
			<Scroller
				cbScrollTo={cbScrollTo}
				data-webos-voice-focused
				focusableScrollbar
				style={{height: scaleToRem(1200)}}
			>
				<Repeater
					childComponent={CustomItem}
					itemProps={{onClick: handleClick}}
				>
					{itemList}
				</Repeater>
			</Scroller>
		</CommonView>
	);
};

export default IntentScroller;
