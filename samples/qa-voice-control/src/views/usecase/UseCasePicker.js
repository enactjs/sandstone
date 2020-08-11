import DayPicker from '@enact/sandstone/DayPicker';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import Picker from '@enact/sandstone/Picker';
import Scroller from '@enact/sandstone/Scroller';
import RangePicker from '@enact/sandstone/RangePicker';
import React from 'react';


class UseCasePicker extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0,
			animals: ['고양이', '강아지', '기린', '호랑이'],
			rangeValue: 0
		};
	}

	handleVoice = (e) => {
		console.log('handleVoice > ', e);	// eslint-disable-line no-console

		let {value} = e.detail;
		let index = this.state.animals.indexOf(value);

		if (index > -1) {
			this.setState({
				index: index
			});
		}
	};

	handleChange = (e) => {
		console.log('handleChange > ', e);	// eslint-disable-line no-console
		let {value} = e;
		this.setState이({
			index: value
		});
	};

	handleRangeChange = (e) => {
		console.log('handleRangeChange > ', e);	// eslint-disable-line no-console
		let {value} = e;
		this.setState({
			rangeValue: value
		});
	};

	render () {
		return (
			<>
				<Header title="Picker" subtitle={this.state.result} />
				<Scroller>
					<Heading>동물원</Heading>
					<Picker
						data-webos-voice-group-label="동물원"
					>
						{this.state.animals}
					</Picker>
					<Heading>우리집</Heading>
					<Picker
						data-webos-voice-group-label="우리집"
					>
						{this.state.animals}
					</Picker>
					<Heading>RangePicker</Heading>
					<RangePicker
						data-webos-voice-group-label="범위"
						max={10}
						min={0}
						onChange={this.handleRangeChange}
						value={this.state.rangeValue}
					/>
					<Heading>DayPicker</Heading>
					<DayPicker />
				</Scroller>
			</>
		);
	}
}

export default UseCasePicker;
