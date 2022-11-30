import {add, is} from '@enact/core/keymap';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Input, {InputField} from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {action} from '@enact/storybook-utils/addons/actions';
import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useState} from 'react';

PopupTabLayout.displayName = 'PopupTabLayout';

add('cancel', 27);
const isCancel = is('cancel');
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
WithButton.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

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
WithBodyText.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

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
WithInput.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

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
WithoutIcon.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

const WithVariousItemsSamplesBase = ({rtl}) => {
	const defaultOpen = true;
	const [open, setOpenState] = useState(defaultOpen);
	const [popupOpen, setPopupOpenState] = useState(false);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const [indexDisplay, setIndexDisplay] = useState(0);
	const [indexSound, setIndexSound] = useState(0);

	const handleDisplayNext = navNext(setIndexDisplay, indexDisplay, 'onNext');
	const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay, 'onBack');
	const handleSoundNext = navNext(setIndexSound, indexSound, 'onNext');
	const handleSoundPrev = navPrev(setIndexSound, indexSound, 'onBack');
	const handleOpenPopup = useCallback(() => {
		setPopupOpenState(true);
	}, [setPopupOpenState]);
	const handleClosePopup = useCallback(() => {
		setPopupOpenState(false);
	}, [setPopupOpenState]);

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (setState, state) => (ev) => {
		const {keyCode} = ev;

		if (!rtl && isRight(keyCode) && ev.target && !ev.target.hasAttribute('disabled')) {
			navNext(setState, state, 'onNext')();
		}
	};

	const handleKeyUpOnPopup = useCallback((ev) => {
		if ((isCancel(ev.keyCode)) && popupOpen) {
			setPopupOpenState(false);
			ev.preventDefault();
			ev.stopPropagation();
		}
	}, [popupOpen, setPopupOpenState]);

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
							<Cell>
								<span>This is the first panel.</span>
								<Button size="small" disabled onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Button1</Button>
								<br />
								<br />
								<Button size="small">Button2</Button>
								<Button size="small" onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Button3</Button>
								<br />
								<br />
								<Item onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)} slotAfter={<Icon>arrowlargeright</Icon>}>Color Adjust</Item>
								<Slider />
								<br />
								<Button size="small" disabled>Button4</Button>
								<Dropdown width={100} style={{margin: 0}} title="A dropdown">
									{['a', 'b', 'c', 'd', 'e', 'f']}
								</Dropdown>
								<br />
								<br />
							</Cell>
						</TabPanel>
						<TabPanel>
							<Header title="Color Adjust" type="compact" slotAfter={<Button iconOnly icon="help" />} />
							<Cell>
								<span>This is the second panel.</span>
								<Button size="small" disabled>Button1</Button>
								<Dropdown width={100} style={{margin: 0}} title="A dropdown">
									{['a', 'b', 'c', 'd', 'e', 'f']}
								</Dropdown>
								<br />
								<br />
								<Button size="small" disabled>Button2</Button>
								<Button size="small">Button3</Button>
								<br />
								<br />
								<Button size="small">Slider</Button><Slider style={{display: 'inline-block', width: '30%'}} />
								<br />
								<br />
							</Cell>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab icon="sound" title="Sound">
					<TabPanels index={indexSound} onBack={handleSoundPrev}>
						<TabPanel>
							<Header title="Sound Settings" type="compact" />
							<Scroller>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Advanced Audio</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Volume</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Select Mode</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Sound Out</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Balance</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Equalizer</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Apply to All inputs</Item>
								<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Reset</Item>
							</Scroller>
						</TabPanel>
						<TabPanel>
							<Header title="Advanced Audio" type="compact" />
							<Item>Balance</Item>
							<InputField defaultValue="value" />
							<Input size="small" value="Input" noBackButton />
							<Button onClick={handleOpenPopup} size="small" >Open</Button>
							<Popup open={popupOpen} onKeyUp={handleKeyUpOnPopup}>
								<Button onClick={handleClosePopup}>Close</Button>
								<Button>Dummy</Button>
							</Popup>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</div>
	);
};

WithVariousItemsSamplesBase.propTypes = {
	rtl: PropTypes.bool
};

const WithVariousItemsSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	WithVariousItemsSamplesBase
);
export const WithVariousItems = () => <WithVariousItemsSamples />;

WithVariousItems.storyName = 'with various items';
WithVariousItems.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

