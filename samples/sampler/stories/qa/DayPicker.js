import React from 'react';
import {storiesOf} from '@storybook/react';

import DayPicker, {getSelectedDayString} from '@enact/sandstone/DayPicker';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';

DayPicker.displayName = 'DayPicker';

class DayPickerWithItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectdDayString: 'None selected'
		};
	}

	handleSelect = (ev) => {
		this.setState({selectdDayString: getSelectedDayString(ev.selected, 'None selected')});
	}

	render () {
		const {selectdDayString} = this.state;

		return (
			<div>
				<Heading>Select several day, every day, every weekday and weekend.<br />
				Change locale to *es-ES* starting on Monday.
				</Heading>
				<DayPicker onSelect={this.handleSelect} />
				<Item label={selectdDayString}>{'Selected Day'}</Item>
			</div>
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
