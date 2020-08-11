import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Repeater from '@enact/ui/Repeater';
import React from 'react';

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
			<>
				<Header title="Intent to scroll" />
				<Scroller
					cbScrollTo={this.cbScrollTo}
					data-webos-voice-focused
					focusableScrollbar
				>
					<Repeater
						childComponent={CustomItem}
						itemProps={{onClick: this.handleClick}}
					>
						{itemList}
					</Repeater>
				</Scroller>
			</>
		);
	}
}

export default IntentScroller;
