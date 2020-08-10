import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';

import React from 'react';


class UseCasePanel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0,
			open: false
		};
	}

	showAlertPopup = () => {
		this.setState({open: true});
	};

	hideAlertPopup = () => {
		this.setState({open: false});
	};

	nextPanel = () => {
		this.setState({index: 1});
	};

	prevPanel = () => {
		this.setState({index: 0});
	};

	render () {
		return (
			<Panels index={this.state.index}>
				<Panel>
					<Header title="Panel 0" />
					<Button onClick={this.nextPanel}>next</Button>
					<Button onClick={this.showAlertPopup}>alert</Button>
					<Alert open={this.state.open}>
						<Button onClick={this.hideAlertPopup}>close</Button>
					</Alert>
				</Panel>
				<Panel>
					<Header title="Panel 1" />
					<Button onClick={this.prevPanel}>previous</Button>
					<Button>dummy</Button>
				</Panel>
			</Panels>
		);
	}
}

export default UseCasePanel;
