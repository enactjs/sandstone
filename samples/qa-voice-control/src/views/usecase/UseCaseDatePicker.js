import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Heading from '@enact/sandstone/Heading';
import DatePicker from '@enact/sandstone/DatePicker';
import Scroller from '@enact/sandstone/Scroller';


class UseCaseDatePicker extends React.Component {
	constructor (props) {
		super(props);
		let obj = new Date();
		obj.setHours(9);
		this.state = {
			timeObj: obj,
			timeStamp: obj.getTime()
		};
	}

	changeHandler = (e) => {
		console.log('onChange>', e, e.value.getTime());	// eslint-disable-line no-console
		this.setState({
			timeObj: e.value,
			timeStamp: e.value.getTime()
		});
	};

	render () {
		return (
			<Panel>
				<Header title="Use Case Date Picker" />
				<Scroller>
					<Heading>DatePicker</Heading>
					<DatePicker
						title="Date"
						onChange={this.changeHandler}
						data-webos-voice-timestamp={this.state.timeStamp}
					/>
				</Scroller>
			</Panel>
		);
	}
}

export default UseCaseDatePicker;
