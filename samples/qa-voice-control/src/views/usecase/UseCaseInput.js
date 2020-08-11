import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import React from 'react';


class UseCaseInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			text: e.value
		});
	};

	render () {
		return (
			<>
				<Header title="Input" />
				<Heading>주소</Heading>
				<Input
					data-webos-voice-group-label="국가"
					data-webos-voice-intent="Select"
					data-webos-voice-label="주소"
					onChange={this.handleChange}
					placeholder="empty"
					subtitle="subtitle"
					title="title"
					type="passwordnumber"
					value="this is value"
				/>
				<Item>dummy</Item>
			</>
		);
	}
}

export default UseCaseInput;
