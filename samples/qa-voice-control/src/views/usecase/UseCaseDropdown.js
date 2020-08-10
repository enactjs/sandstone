import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {Panel, Header} from '@enact/sandstone/Panels';

import React from 'react';

const list1 = [];
const list2 = [];

for (let i = 0; i < 100; i++) list1.push('a' + i);
for (let i = 0; i < 100; i++) list2.push('b' + i);

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
			<Panel>
				<Header title="Use Case Dropdown" />
				<Button onFocus={this.handleFocus}>dummy</Button>
				<Dropdown title="title" onKeyDown={this.handleKeyDown} data-webos-voice-grop-label="custom group" data-webos-voice-label="ggg">
					{this.state.list}
				</Dropdown>
			</Panel>
		);
	}
}

export default UseCaseDropdown;
