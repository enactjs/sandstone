import React from 'react';
import {storiesOf} from '@storybook/react';

import DayPicker, {getSelectedDayString} from '@enact/sandstone/DayPicker';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';

DayPicker.displayName = 'DayPicker';

class DayPickerWithItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedDayString: 'None selected'
		};
	}

	handleSelect = (ev) => {
		this.setState({selectedDayString: getSelectedDayString(ev.selected, 'None selected')});
	};

	render () {
		const {selectedDayString} = this.state;

		return (
			<Scroller>
				<Heading size="small">Select several days, every day, every weekday and weekend.<br />
					Change locale to *es-ES* starting on Monday.
				</Heading>
				<Item label={selectedDayString}>{'Selected Day'}</Item>
				<DayPicker onSelect={this.handleSelect} />
			</Scroller>
		);
	}
}

storiesOf('DayPicker', module)
	.add(
		'to test getSelectedDayString()',
		() => (
			<DayPickerWithItem />
		)
	);
