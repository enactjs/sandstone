import React from 'react';
import Dropdown from '@enact/sandstone/Dropdown';
import {WizardPanels, Panel} from '@enact/sandstone/WizardPanels';

class MainPanel extends React.Component {
	constructor () {
		super();
		this.state = {
			open: false
		};
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	render () {
		return (
			<WizardPanels>
				<Panel title="QA Sample - Dropdown">
					<Dropdown title="language" open={this.state.open} onOpen={this.handleOpen} onClose={this.handleClose}>
						{['aaa', 'bbb', 'ccc', 'aaa', 'bbb', 'ccc', 'aaa', 'bbb', 'ccc', 'aaa', 'bbb', 'ccc']}
					</Dropdown>
					<Dropdown disabled size="large">
						{['ddd', 'eee', 'fff']}
					</Dropdown>
				</Panel>
			</WizardPanels>
		);
	}
}

export default MainPanel;
