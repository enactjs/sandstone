import {useState} from 'react';
import spotlight from '@enact/spotlight';

import {Header} from '../../../../Panels';
import Item from '../../../../Item';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

function App (props) {
	const [index, setIndex] = useState(0);
	const [open, setOpen] = useState(true);

	return (
		<PopupTabLayout
			{...props}
			id="tabLayout"
			open={open}
			onClose={() => setOpen(false)}
		>
			<Tab icon="picture" title="Display">
				<TabPanels id="display" index={index} onBack={() => setIndex(0)}>
					<TabPanel autoFocus="#colorAdjust">
						<Header title="Display Settings" type="compact" />
						<Item>Picture Modes</Item>
						<Item id="colorAdjust" onClick={() => setIndex(1)}>Color Adjust</Item>
					</TabPanel>
					<TabPanel>
						<Header title="Color Adjust" type="compact" />
						{/* This blur-on-click logic helps test suppressing 5-way select during transition */}
						<Item id="brightness" onClick={({currentTarget}) => currentTarget.blur()}>Brightness</Item>
					</TabPanel>
				</TabPanels>
			</Tab>
			<Tab title="Sound">
				<TabPanels id="sound" index={index} noCloseButton onBack={() => setIndex(0)} >
					<TabPanel>
						<Header title="Sound Settings" type="compact" />
						<Item id="advancedAudio" onClick={() => setIndex(1)}>Advanced Audio</Item>
					</TabPanel>
					<TabPanel>
						<Header title="Advanced Audio Settings" type="compact" />
						<Item>Balance</Item>
						<Item>Fade</Item>
					</TabPanel>
				</TabPanels>
			</Tab>
		</PopupTabLayout>
	);
}

export default UrlPropsDecorator(ThemeDecorator(App));
