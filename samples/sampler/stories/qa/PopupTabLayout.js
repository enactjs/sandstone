/* eslint-disable react/jsx-no-bind */

import {is} from '@enact/core/keymap';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {action} from '@enact/storybook-utils/addons/actions';
import {useState} from 'react';
import compose from 'ramda/src/compose';

PopupTabLayout.displayName = 'PopupTabLayout';

const isRight = is('right');

const navPrev = (callback, value, actionName) => () => {
	const index = Math.max(value - 1, 0);
	action(actionName)({index});
	callback(index);
};
const navNext = (callback, value) => () => {
	const index = Math.min(value + 1, 1);
	// action(actionName)({index});
	callback(index);
};

export default {
	title: 'Sandstone/PopupTabLayout',
	component: 'PopupTabLayout'
};

export const WithButton = () => {
	return (
		<Panel>
			<PopupTabLayout open>
				<Tab icon="picture" title="Display">
					<TabPanels index={0}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<SwitchItem>Picture Modes</SwitchItem>
							<Button size="small">button button button</Button>
							<Heading>heading</Heading>
							<Item>Color Adjust</Item>
							<Button>button</Button>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab icon="sound" title="Sound">
					<TabPanels index={0}>
						<TabPanel>
							<Header title="Sound Settings" type="compact" />
							<Item>Advanced Audio</Item>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Panel>
	);
};

WithButton.storyName = 'with button';

export const WithBodyText = () => {
	return (
		<Panel>
			<PopupTabLayout open>
				<Tab icon="picture" title="Display">
					<TabPanels index={0}>
						<TabPanel>
							<Scroller focusableScrollbar="byEnter">
								<BodyText>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula turpis vel
									accumsan sollicitudin. Vivamus id tellus non arcu congue bibendum. Mauris cursus
									sed libero nec finibus. Sed faucibus pulvinar hendrerit. Etiam efficitur feugiat
									lectus, sit amet egestas arcu bibendum nec. Ut dignissim neque vel nisl porttitor
									lobortis. Aenean accumsan, nibh in maximus cursus, ipsum lectus porttitor dolor,
									quis bibendum est nunc eget lorem. Vivamus sit amet convallis odio. Nam luctus
									lacus vitae leo molestie, dapibus elementum ligula auctor. Phasellus ultrices nisi
									ut dolor feugiat ullamcorper. Etiam pharetra vestibulum vestibulum. Ut finibus
									sapien ut diam mattis, non condimentum urna gravida. Nulla pulvinar sagittis
									tellus pharetra vulputate. Phasellus sodales leo vitae sem scelerisque, ac posuere
									elit vehicula. Nullam vitae urna at dui hendrerit gravida. Suspendisse molestie ex
									et tincidunt dictum. Curabitur eu lectus risus. Duis viverra cursus dolor,
									elementum ornare tortor vulputate ac. Praesent facilisis egestas dui, eu posuere
									nunc ultrices in. Orci varius natoque penatibus et magnis dis parturient montes,
									nascetur ridiculus mus. Vivamus a bibendum mi, id blandit lectus. Aenean nec
									consectetur nisl. Aliquam gravida libero nunc, nec dapibus velit ultricies quis.
								</BodyText>
							</Scroller>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Panel>
	);
};

WithBodyText.storyName = 'with bodyText';

export const WithInput = () => {
	return (
		<Panel>
			<PopupTabLayout open>
				<Tab icon="picture" title="Display">
					<TabPanels index={0}>
						<TabPanel>
							<Header title="Display" type="compact" />
							<Input value="Input" />
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Panel>
	);
};

WithInput.storyName = 'with input';

export const WithoutIcon = () => {
	return (
		<Panel>
			<PopupTabLayout
				open
			>
				<Tab title="First">
					<TabPanels index={0}>
						<TabPanel>
							<Header title="First" type="compact" />
							<Button>First Tab</Button>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab title="Second">
					<TabPanels index={0}>
						<TabPanel>
							<Header title="Second" type="compact" />
							<Button>Second Tab</Button>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Panel>
	);
};

WithoutIcon.storyName = 'without icon';

export const WithVariousItems = () => {
	const defaultOpen = true;
	const [open, setOpenState] = useState(defaultOpen);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const [indexDisplay, setIndexDisplay] = useState(0);
	const [indexSound, setIndexSound] = useState(0);

	const handleDisplayNext = navNext(setIndexDisplay, indexDisplay, 'onNext');
	const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay, 'onBack');
	const handleSoundNext = navNext(setIndexSound, indexSound, 'onNext');
	const handleSoundPrev = navPrev(setIndexSound, indexSound, 'onBack');

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (setState, state) => (ev) => {
		const {keyCode} = ev;

		if (isRight(keyCode) && ev.target && !ev.target.hasAttribute('disabled')) {
			navNext(setState, state, 'onNext')();
		}
	};

	return (
		<div>
			<PopupTabLayout
				open={open}
				onClose={handleClose}
			>
				<Tab icon="picture" title="Display">
					<TabPanels index={indexDisplay} onBack={handleDisplayPrev}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<SwitchItem>Picture Modes</SwitchItem>
							<Button size="small" onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>button1</Button>
							<Button size="small" onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)} disabled>button2</Button>
							<Heading>heading</Heading>
							<Item onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)} slotAfter={<Icon>arrowsmallright</Icon>}>Color Adjust</Item>
							<Button>button</Button>
						</TabPanel>
						<TabPanel>
							<Header title="Color Adjust" type="compact" />
							<SwitchItem>Picture Modes</SwitchItem>
							<Button size="small" disabled>button1</Button>
							<Button size="small">button2</Button>
							<Heading>heading</Heading>
							<Item>Color Adjust</Item>
							<Button>button</Button>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab icon="sound" title="Sound">
					<TabPanels index={indexSound} onBack={handleSoundPrev}>
						<TabPanel>
							<Header title="Sound Settings" type="compact" />
							<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Advanced Audio</Item>
						</TabPanel>
						<TabPanel>
							<Header title="Advanced Audio" type="compact" />
							<Item>Balance</Item>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</div>
	);
};

WithVariousItems.storyName = 'with various items';

