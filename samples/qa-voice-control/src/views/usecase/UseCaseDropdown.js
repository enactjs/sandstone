import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {Header} from '@enact/sandstone/Panels';
import React from 'react';

const list1 = [];
const list2 = [];

for (let i = 0; i < 100; i++) list1.push('A' + i);
for (let i = 0; i < 100; i++) list2.push('B' + i);

class UseCaseDropdown extends React.Component {
	constructor () {
		super();
		this.state = {
			list: list1
		};
	}

	handleKeyDown = (e) => {
		const keyCode = e.keyCode;

		if (keyCode === 49) {
			this.setState({list: list1});
		} else if (keyCode === 50) {
			this.setState({list: list2});
		}
	};

	handleFocus = () => {
		console.log(new Error().stack);	// eslint-disable-line no-console
	};

	render () {
		return (
			<>
				<Header title="Dropdown" />
				<Button onFocus={this.handleFocus}>Hello</Button>
				<Dropdown
					data-webos-voice-grop-label="customized group"
					data-webos-voice-label="this is label"
					onKeyDown={this.handleKeyDown}
					title="title">
					{this.state.list}
				</Dropdown>
			</>
		);
	}
}

export default UseCaseDropdown;
