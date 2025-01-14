import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {Panel, WizardPanels} from '@enact/sandstone/WizardPanels';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

const MainPanel = () => {
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [removed, setRemove] = useState(false);

	const handleOpen1 = useCallback(() => setOpen1(true), []);
	const handleClose1 = useCallback(() => setOpen1(false), []);

	const handleOpen2 = useCallback(() => {
		setOpen2(true);

		setTimeout(() => {
			setRemove(true);
		}, 2000);
	}, []);
	const handleClose2 = useCallback(() => setOpen2(false), []);

	return (
		<WizardPanels>
			<Panel title="QA Sample - Dropdown">
				<Dropdown onClose={handleClose1} onOpen={handleOpen1} open={open1} size="large" title="language">
					{['English', 'Korean', 'Spanish', 'Amharic', 'Thai', 'Arabic', 'Urdu', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese']}
				</Dropdown>
				<Button size="large">
					Enter
				</Button>
			</Panel>
			<Panel>
				{!removed && (
					<div style={{margin: ri.scaleToRem(20)}}>
						<BodyText>This line will be removed after opening the dropdown.</BodyText>
					</div>
				)}
				<Dropdown onClose={handleClose2} onOpen={handleOpen2} open={open2}>{['a', 'b', 'c']}</Dropdown>
			</Panel>
		</WizardPanels>
	);
};

export default MainPanel;
