import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {Panel, WizardPanels} from '@enact/sandstone/WizardPanels';
import {useCallback, useState} from 'react';

const MainPanel = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<WizardPanels>
			<Panel title="QA Sample - Dropdown">
				<Dropdown onClose={handleClose} onOpen={handleOpen} open={open} size="large" title="language">
					{['English', 'Korean', 'Spanish', 'Amharic', 'Thai', 'Arabic', 'Urdu', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese']}
				</Dropdown>
				<Button size="large">
					Enter
				</Button>
			</Panel>
		</WizardPanels>
	);
};

export default MainPanel;
