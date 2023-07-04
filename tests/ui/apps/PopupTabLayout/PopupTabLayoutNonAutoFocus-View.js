import {is} from '@enact/core/keymap';
import ilib from '@enact/i18n';
import spotlight from '@enact/spotlight';
import Group from '@enact/ui/Group';
import {useState} from 'react';

import Item from '../../../../Item';
import {Header} from '../../../../Panels';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const isRight = is('right');

const rtl = () => {
	if (ilib.getLocale() === 'ar-SA' || ilib.getLocale() === 'he-IL' || ilib.getLocale() === 'ur-PK') {
		return true;
	} else {
		return false;
	}
};

function App (props) {
	const [index, setIndex] = useState(0);
	const [open, setOpen] = useState(true);
	const handleKeyDown = () => (ev) => {
		const {keyCode} = ev;

		if (!rtl() && isRight(keyCode)) {
			setIndex(1);
		}
	};

	return (
		<PopupTabLayout
			{...props}
			id="tabLayout"
			open={open}
			onClose={() => setOpen(false)}
		>
			<Tab title="Display">
				<TabPanels id="display" index={index} onBack={() => setIndex(0)}>
					<TabPanel>
						<Header title="Display Settings" type="compact" />
						<Item id="pictureModes" onClick={() => setIndex(1)} onKeyDown={handleKeyDown()}>Picture Modes</Item>
						<Item id="colorAdjust" onClick={() => setIndex(1)} onKeyDown={handleKeyDown()}>Color Adjust</Item>
					</TabPanel>
					<TabPanel>
						<Header title="Picture Modes" type="compact" />
						<Scroller>
							<Group childComponent={Item} component="div" select="radio" selectedProp="selected">
								{[
									'Vivid',
									'Standard',
									'Game',
									'HDR',
									'News',
									'Cinema',
									'APS',
									'Custom',
									'Custom 2',
									'Expert',
									'Expert 2'
								]}
							</Group>
						</Scroller>
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
