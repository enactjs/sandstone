import DatePicker from '@enact/sandstone/DatePicker';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';

import React from 'react';


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
		console.log('onChange > ', e, e.value.getTime());	// eslint-disable-line no-console
		this.setState({
			timeObj: e.value,
			timeStamp: e.value.getTime()
		});
	};

	render () {
		return (
			<>
				<Header title="Date Picker" />
				<Scroller>
					<Heading>DatePicker</Heading>
					<DatePicker
						data-webos-voice-timestamp={this.state.timeStamp}
						onChange={this.changeHandler}
						title="Date"
					/>
				</Scroller>
			</>
		);
	}
}

export default UseCaseDatePicker;
