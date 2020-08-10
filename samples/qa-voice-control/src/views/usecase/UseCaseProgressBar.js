import Button from '@enact/sandstone/Button';
import {Panel, Header} from '@enact/sandstone/Panels';
import ProgressBar from '@enact/sandstone/ProgressBar';

import React from 'react';

class UseCaseProgressBar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			value: 0.5
		};
	}

	handleDecrease = () => {
		this.setState(prevState => ({value: prevState.value + 0.1}));
	};

	handleIncrease = () => {
		this.setState(prevState => ({value: prevState.value + 0.1}));
	};

	render () {
		return (
			<Panel>
				<Header title="Use Case ProgressBar" />
				<ProgressBar progress={this.state.value} />
				<Button onClick={this.handleDecrease}>decrease</Button>
				<Button onClick={this.handleIncrease}>increase</Button>
			</Panel>
		);
	}
}

export default UseCaseProgressBar;
