import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {scaleToRem} from '@enact/ui/resolution';
import Repeater from '@enact/ui/Repeater';
import React from 'react';

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

class IntentScroller extends React.Component {
	cbScrollTo = (ref) => {
		this.scrollTo = ref;
	};

	handleClick = () => {
		this.scrollTo({align: 'bottom', focus: true});
	};

	render () {
		return (
			<CommonView noScroller title="Intent to scroll">
				<Scroller
					cbScrollTo={this.cbScrollTo}
					data-webos-voice-focused
					focusableScrollbar
					style={{height: scaleToRem(1200)}}
				>
					<Repeater
						childComponent={CustomItem}
						itemProps={{onClick: this.handleClick}}
					>
						{itemList}
					</Repeater>
				</Scroller>
			</CommonView>
		);
	}
}

export default IntentScroller;
