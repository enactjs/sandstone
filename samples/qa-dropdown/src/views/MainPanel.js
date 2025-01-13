import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {Panel, WizardPanels} from '@enact/sandstone/WizardPanels';
import {useCallback, useState} from 'react';

const MainPanel = () => {
	const [openLanguage, setOpenLanguage] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(false);
	const [removed, setRemove] = useState(false);

	const handleOpen = useCallback(() => setOpenLanguage(true), []);
	const handleClose = useCallback(() => setOpenLanguage(false), []);
	const handleDropdown = useCallback(() => {
		setOpenDropdown(true);

		setTimeout(() => {
			setRemove(true);
		}, 2000);
	}, []);
	const handleDropdownClose = useCallback(() => setOpenDropdown(false), []);

	return (
		<WizardPanels>
			<Panel title="QA Sample - Dropdown">
				<Dropdown onClose={handleClose} onOpen={handleOpen} open={openLanguage} size="large" title="language">
					{['English', 'Korean', 'Spanish', 'Amharic', 'Thai', 'Arabic', 'Urdu', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese']}
				</Dropdown>
				<Button size="large">
					Enter
				</Button>
			</Panel>
			<Panel>
				{!removed && (
					<div style={{margin: '20px'}}>
						<BodyText>This is the line that will be removed.</BodyText>
					</div>
				)}
				<Dropdown onClose={handleDropdownClose} onOpen={handleDropdown} open={openDropdown}>{['a', 'b', 'c']}</Dropdown>
			</Panel>
		</WizardPanels>
	);
};

export default MainPanel;
