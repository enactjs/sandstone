import spotlight from '@enact/spotlight';

import Button from '../../../../Button';
import Heading from '../../../../Heading';
import Item from '../../../../Item';
import {Header, Panel} from '../../../../Panels';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import SwitchItem from '../../../../SwitchItem';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

function App () {
	return (
		<Panel>
			<PopupTabLayout id="popuptablayout" open>
				<Tab icon="picture" title="Display">
					<TabPanels id="withButtonDisplay" index={0}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<SwitchItem>Picture Modes</SwitchItem>
							<Button size="small">button button button</Button>
							<Heading>heading</Heading>
							<Item>Color Adjust</Item>
							<Button id="button">button</Button>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Panel>
	);
}

export default UrlPropsDecorator(ThemeDecorator(App));
