import spotlight from '@enact/spotlight';
import {Component} from 'react';

import DayPicker, {getSelectedDayString} from '../../../../DayPicker';
import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';

spotlight.setPointerMode(false);

class app extends Component {
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
				<Item id="selectedString" label={selectedDayString}>{'Selected Day'}</Item>
				<DayPicker id="dayPickerGetDayString" onSelect={this.handleSelect} />
			</Scroller>
		);
	}
}
export default ThemeDecorator(app);
