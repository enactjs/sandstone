import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import WizardPanels from '@enact/sandstone/WizardPanels';
import {useCallback, useState} from 'react';

const WizardPanelsView = () => {
	const [noAnimation, setNoAnimation] = useState(false);
	const [noAriaLabel, setNoAriaLabel] = useState(false);
	const [noSteps, setNoSteps] = useState(false);

	const handleToggleNoAnimation = useCallback(() => setNoAnimation(!noAnimation),[noAnimation]);
	const handleToggleNoAriaLabel = useCallback(() => setNoAriaLabel(!noAriaLabel),[noAriaLabel]);
	const handleToggleNoSteps = useCallback(() => setNoSteps(!noSteps),[noSteps]);

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
					onClick={handleToggleNoAnimation}
					selected={noAnimation}
				>
					noAnimation
				</CheckboxItem>
				<CheckboxItem
					onClick={handleToggleNoAriaLabel}
					selected={noAriaLabel}
				>
					noAriaLabel
				</CheckboxItem>
				<CheckboxItem
					onClick={handleToggleNoSteps}
					selected={noSteps}
				>
					noSteps
				</CheckboxItem>
			</WizardPanels.Panel>
			<WizardPanels.Panel
				subtitle="A subtitle for View 1 that is really, really way too long for its own good.  In fact, it's so long that it probably goes to multiple lines, unless your screen is so large that it somehow fits.  That seems unlikely, though, unless you're in the year 2030 or something."
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


};

export default WizardPanelsView;
