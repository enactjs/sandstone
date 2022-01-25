import Checkbox from '@enact/sandstone/Checkbox';
import Dropdown from '@enact/sandstone/Dropdown';
import {WizardPanels, Panel} from '@enact/sandstone/WizardPanels';
import {Component} from 'react';

class MainPanel extends Component {
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
					<Dropdown size="large" title="language" open={this.state.open} onOpen={this.handleOpen} onClose={this.handleClose}>
						{['English', 'Korean', 'Spanish', 'Amharic', 'Thai', 'Arabic', 'Urdu', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese']}
					</Dropdown>
					<Checkbox />
				</Panel>
			</WizardPanels>
		);
	}
}

export default MainPanel;
