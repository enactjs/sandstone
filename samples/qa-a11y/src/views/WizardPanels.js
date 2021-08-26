import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import WizardPanels from '@enact/sandstone/WizardPanels';
import {Component} from 'react';

class WizardPanelsView extends Component {
	constructor (props) {
		super(props);

		this.state = {
			noAnimation: false,
			noAriaLabel: false,
			noSteps: false
		};
	}

	handleToggleNoAnimation = () => this.setState((state) => ({noAnimation: !state.noAnimation}));

	handleToggleNoAriaLabel = () => this.setState((state) => ({noAriaLabel: !state.noAriaLabel}));

	handleToggleNoSteps = () => this.setState((state) => ({noSteps: !state.noSteps}));

	render () {
		const {noAnimation, noAriaLabel, noSteps} = this.state;

		return (
			<WizardPanels key={noAnimation} noAnimation={noAnimation} noSteps={noSteps}>
				<WizardPanels.Panel
					{...(noAriaLabel ? {} : {['aria-label']: 'This is a Panel.'})}
					nextButton={<Button>Skip this Step</Button>}
					prevButton={<Button icon="closex" aria-label="This is Exit.">Exit</Button>}
					subtitle="A subtitle for View 0"
					title="WizardPanels View 0"
				>
					<div style={{textAlign: 'center', marginBottom: '10' + 'px'}}>
						<Button>Text 0</Button>
						<Button>Text 1</Button>
					</div>
					<CheckboxItem
						onClick={this.handleToggleNoAnimation}
						selected={noAnimation}
					>
						noAnimation
					</CheckboxItem>
					<CheckboxItem
						onClick={this.handleToggleNoAriaLabel}
						selected={noAriaLabel}
					>
						noAriaLabel
					</CheckboxItem>
					<CheckboxItem
						onClick={this.handleToggleNoSteps}
						selected={noSteps}
					>
						noSteps
					</CheckboxItem>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					title="WizardPanels View 1"
				>
					<BodyText>Several buttons!</BodyText>
					<Button icon="list">Button A</Button>
					<Button icon="gear">Button B</Button>
					<Button icon="search">Button C</Button>
					<Button icon="lock">Button D</Button>
					<footer>
						<Button>OK</Button>
					</footer>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					disabled
					subtitle="A subtitle for View 2"
					title="WizardPanels View 2"
				>
					<Item inline>
						<slotBefore>
							<Icon>notification</Icon>
						</slotBefore>
						Hello Item
					</Item>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					footer="Footer in View 3"
					nextButton={<Button icon="closex" aria-label="This is Quit.">Close</Button>}
					subtitle="A subtitle for View 3"
					title="WizardPanels View 3"
				>
					<Icon>support</Icon>
					<BodyText>A simple view</BodyText>
					<footer>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</footer>
				</WizardPanels.Panel>
			</WizardPanels>
		);
	}
}

export default WizardPanelsView;
