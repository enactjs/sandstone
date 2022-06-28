/* eslint-disable react/jsx-no-bind */

import {add, is} from '@enact/core/keymap';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import Dropdown from '@enact/sandstone/Dropdown';
import Icon from '@enact/sandstone/Icon';
import Input, {InputField} from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import {VirtualList} from '@enact/sandstone/VirtualList';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component, useCallback, useState} from 'react';
import compose from 'ramda/src/compose';

const Config = mergeComponentMetadata('FixedPopupPanels', FixedPopupPanels);
Config.defaultProps.position = 'right';
Config.defaultProps.scrimType = 'translucent';
Config.defaultProps.spotlightRestrict = 'self-only';
Config.defaultProps.width = 'narrow';

add('cancel', 27);
const isCancel = is('cancel');
const isRight = is('right');

class FixedPopupPanelsWithPause extends Component {
	constructor () {
		super();
		this.state = {
			index: 0
		};
		this.pause = new Pause('SampleApp');
		this.pause.pause();
	}

	componentDidMount () {
		this.deferFocus();
	}

	deferFocus () {
		// simulate a service call to defer focusing
		setTimeout(() => {
			// ensure we're in 5-way mode for the purposes of this sample
			Spotlight.setPointerMode(false);
			this.pause.resume();
			Spotlight.focus('#panel1');
		}, 5000);
	}

	render () {
		return (
			<div {...this.props}>
				<FixedPopupPanels open index={this.state.index}>
					<Panel id="panel1" autoFocus="none">
						<Header title="First Panel" noCloseButton />
						<Item>Item 1 in Panel 2</Item>
						<Item>Item 1 in Panel 2</Item>
						<Item>Item 1 in Panel 2</Item>
					</Panel>
				</FixedPopupPanels>
			</div>
		);
	}
}

// eslint-disable-next-line enact/prop-types
const itemRenderer = ({index, ...rest}) => {
	return <Item {...rest}>Item {index + 1}</Item>;
};

export default {
	title: 'Sandstone/FixedPopupPanels',
	component: 'FixedPopupPanels'
};

const WithVirtualListSamplesBase = ({args, rtl}) => {
	const defaultOpen = true;
	const [open, setOpenState] = useState(defaultOpen);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const defaultIndex = 0;
	const [index, setPanelIndexState] = useState(defaultIndex);

	const nextPanel = () => setPanelIndexState(Math.min(index + 1, 3));
	const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));
	const handleBack = compose(prevPanel, action('onBack'));

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (ev) => {
		const {keyCode} = ev;

		if (!rtl && isRight(keyCode)) {
			nextPanel();
		}
	};

	const itemHeight = 156;
	const itemSize = ri.scale(itemHeight);

	return (
		<div>
			<FixedPopupPanels
				index={index}
				open={open}
				position={args['position']}
				fullHeight={args['fullHeight']}
				width={args['width']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onBack={handleBack}
				onClose={handleClose}
				onHide={action('onHide')}
				onShow={action('onShow')}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				<Panel>
					<Header>
						<title>Panel 1</title>
						<subtitle>20-Item VirtualList in a `Layout`</subtitle>
						<slotAfter>
							<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
						</slotAfter>
					</Header>
					<Column>
						<Cell shrink component={BodyText}>
							A 3-Cell Layout with 4 visible items in a VirtualList
						</Cell>
						<Cell
							size={itemHeight * 4}
							component={VirtualList}
							childProps={{onClick: nextPanel, onKeyDown: handleKeyDown}}
							itemSize={itemSize}
							itemRenderer={itemRenderer}
							dataSize={20}
						/>
						<Cell shrink component={BodyText}>
							This text should be visible.
						</Cell>
					</Column>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 2</title>
						<subtitle>3-Item VirtualList in a `Layout`</subtitle>
						<slotAfter>
							<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
						</slotAfter>
					</Header>
					<Column>
						<Cell shrink>
							<BodyText>A 3-Cell Layout with fixed height VirtualList</BodyText>
						</Cell>
						<Cell size={itemHeight * 3}>
							<VirtualList
								childProps={{onClick: nextPanel, onKeyDown: handleKeyDown}}
								itemSize={itemSize}
								itemRenderer={itemRenderer}
								dataSize={3}
							/>
						</Cell>
						<Cell shrink component={BodyText}>
							This text should be visible.
						</Cell>
					</Column>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 3</title>
						<subtitle>VirtualList filling the height of the panel</subtitle>
						<slotAfter>
							<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
						</slotAfter>
					</Header>
					<VirtualList
						childProps={{onClick: nextPanel, onKeyDown: handleKeyDown}}
						itemSize={itemSize}
						itemRenderer={itemRenderer}
						dataSize={20}
					/>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 4</title>
						<subtitle>2-Item VirtualList filling just the space it needs</subtitle>
					</Header>
					<VirtualList itemSize={itemSize} itemRenderer={itemRenderer} dataSize={2} />
				</Panel>
			</FixedPopupPanels>
			<Button onClick={toggleOpen}>Open FixedPopupPanels</Button>
		</div>
	);
};

WithVirtualListSamplesBase.propTypes = {
	args: PropTypes.object,
	rtl: PropTypes.bool
};

const WithVirtualListSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	WithVirtualListSamplesBase
);
export const WithVirtualList = (args) => <WithVirtualListSamples args={args} />;

select('position', WithVirtualList, ['left', 'right'], Config);
boolean('fullHeight', WithVirtualList, Config);
select('width', WithVirtualList, ['narrow', 'half'], Config);
boolean('noAnimation', WithVirtualList, Config);
boolean('noAutoDismiss', WithVirtualList, Config);
select('scrimType', WithVirtualList, ['none', 'translucent', 'transparent'], Config);
select('spotlightRestrict', WithVirtualList, ['self-first', 'self-only'], Config);

WithVirtualList.storyName = 'with VirtualList';
WithVirtualList.parameters = {
	info: {
		text: 'QA -  Basic usage of FixedPopupPanels'
	}
};

export const WithPauseAndAutoFocusNone = () => {
	return <FixedPopupPanelsWithPause />;
};

WithPauseAndAutoFocusNone.storyName = 'with Pause and autoFocus="none"';
WithPauseAndAutoFocusNone.parameters = {
	info: {
		text: 'QA -  Manage focus with Pause in FixedPopupPanels'
	},
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithDropdown = (args) => {
	const [open, setOpen] = useState(false);

	const handleOpenDropdown = useCallback(() => {
		setTimeout(() => {
			setOpen(true);
		}, 1000);
	}, []);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<>
			<Dropdown
				title="Dropdown"
				onOpen={handleOpenDropdown}
			>
				{['a', 'b', 'c', 'd']}
			</Dropdown>
			<Button onClick={handleOpen}>Open</Button>
			<FixedPopupPanels
				open={open}
				position={args['position']}
				fullHeight={args['fullHeight']}
				width={args['width']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				<Panel>
					<Header>
						<title>Fixed Popup Panel</title>
					</Header>
					<Button onClick={handleClose}>Close</Button>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

select('position', WithDropdown, ['left', 'right'], Config);
boolean('fullHeight', WithDropdown, Config);
select('width', WithDropdown, ['narrow', 'half'], Config);
boolean('noAnimation', WithDropdown, Config);
boolean('noAutoDismiss', WithDropdown, Config);
select('scrimType', WithDropdown, ['none', 'translucent', 'transparent'], Config);
select('spotlightRestrict', WithDropdown, ['self-first', 'self-only'], Config);

WithDropdown.storyName = 'with Dropdown';

const scrollerChildren = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui cursus
tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna auctor tellus,
quis mattis mauris lectus vel metus. Maecenas tempus quam ac dignissim gravida. Integer
ut posuere sapien. Duis consequat vitae libero nec posuere. Curabitur sagittis mauris
vel massa cursus, et mollis est malesuada. Vestibulum ante libero, gravida id purus
eget, varius porttitor ipsum. Suspendisse quis consequat sem, eget gravida est. Morbi
pulvinar diam vel mattis lacinia. Integer eget est quis augue tincidunt tincidunt quis
at nisi. Duis at massa nunc. Cras malesuada, sem quis aliquet vulputate, ante ipsum
congue ante, eu volutpat ipsum sem posuere ante. Suspendisse potenti. Nullam in laciniami.`;

const scrollerConfig = mergeComponentMetadata('Scroller', Scroller);
const focusableScrollbarOption = {
	false: false,
	true: true,
	byEnter: 'byEnter'
};
const scrollerStyle = {height: ri.scaleToRem(333)};

export const WithScroller = (args) => {
	const [index, setPanelIndexState] = useState(0);
	const [open, setOpenState] = useState(false);

	const nextPanel = () => setPanelIndexState(Math.min(index + 1, 3));
	const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));
	const toggleOpen = () => setOpenState(!open);

	return (
		<>
			<Button onClick={toggleOpen}>Open</Button>
			<FixedPopupPanels
				index={index}
				open={open}
				fullHeight={args['fullHeight']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onBack={prevPanel}
				onClose={toggleOpen}
				position={args['position']}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
				width={args['width']}
			>
				<Panel>
					<Header>
						<title>Panel 1</title>
					</Header>
					<Cell>
						<Scroller focusableScrollbar={args['focusableScrollbar']} style={scrollerStyle}>
							{args['scrollerChildren']}
						</Scroller>
						<Button onClick={nextPanel}>A</Button>
						<Button onClick={nextPanel}>B</Button>
					</Cell>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 2</title>
					</Header>
					<Cell>
						<Scroller focusableScrollbar={args['focusableScrollbar']} style={scrollerStyle}>
							{args['scrollerChildren']}
						</Scroller>
						<Button onClick={nextPanel}>A</Button>
						<Button onClick={nextPanel}>B</Button>
					</Cell>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 3</title>
					</Header>
					<Cell>
						<Button onClick={nextPanel}>A</Button>
						<Scroller focusableScrollbar={args['focusableScrollbar']} style={scrollerStyle}>
							{args['scrollerChildren']}
						</Scroller>
						<Button onClick={nextPanel}>B</Button>
					</Cell>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 4</title>
					</Header>
					<Cell>
						<Scroller focusableScrollbar={args['focusableScrollbar']} style={scrollerStyle}>
							{args['scrollerChildren']}
						</Scroller>
					</Cell>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

select('position', WithScroller, ['left', 'right'], Config);
boolean('fullHeight', WithScroller, Config);
select('width', WithScroller, ['narrow', 'half'], Config);
boolean('noAnimation', WithScroller, Config);
boolean('noAutoDismiss', WithScroller, Config);
select('scrimType', WithScroller, ['none', 'translucent', 'transparent'], Config);
select('spotlightRestrict', WithScroller, ['self-first', 'self-only'], Config);

select('focusableScrollbar', WithScroller, focusableScrollbarOption, scrollerConfig, 'byEnter');
text('scrollerChildren', WithScroller, scrollerConfig, scrollerChildren);

WithScroller.storyName = 'with Scroller';
WithScroller.parameters = {
	info: {
		text: 'QA -  Scroller with text inside FixedPopupPanels'
	}
};

const WithVariousItemsSamplesBase = ({args, rtl}) => {
	const defaultOpen = true;
	const [open, setOpenState] = useState(defaultOpen);
	const [popupOpen, setPopupOpenState] = useState(false);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const defaultIndex = 0;
	const [index, setPanelIndexState] = useState(defaultIndex);

	const nextPanel = () => setPanelIndexState(Math.min(index + 1, 3));
	const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));
	const handleBack = compose(prevPanel, action('onBack'));
	const handleOpenPopup = useCallback(() => {
		setPopupOpenState(true);
	}, [setPopupOpenState]);
	const handleClosePopup = useCallback(() => {
		setPopupOpenState(false);
	}, [setPopupOpenState]);

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (ev) => {
		const {keyCode} = ev;
		if (!rtl && isRight(keyCode) && ev.target && !ev.target.hasAttribute('disabled')) {
			nextPanel();
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
			<FixedPopupPanels
				index={index}
				open={open}
				position={args['position']}
				fullHeight={args['fullHeight']}
				width={args['width']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onBack={handleBack}
				onClose={handleClose}
				onHide={action('onHide')}
				onShow={action('onShow')}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				<Panel>
					<Header>
						<title>Panel 1</title>
						<subtitle>This is the subtitle</subtitle>
						<slotAfter>
							<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
						</slotAfter>
					</Header>
					<Column>
						<Cell shrink component={BodyText}>
							A 3-Cell Layout with various items
						</Cell>
						<Cell>
							<span>This is the first panel.</span>
							<Button size="small" disabled onClick={nextPanel} onKeyDown={handleKeyDown}>Button1</Button>
							<br />
							<br />
							<Button size="small" onClick={handleClose}>Button2</Button>
							<Button size="small" onClick={nextPanel} onKeyDown={handleKeyDown}>Button3</Button>
							<br />
							<br />
							<Slider />
							<br />
							<Button size="small" disabled>Button4</Button>
							<Dropdown width={100} style={{margin: 0}} title="A dropdown">
								{['a', 'b', 'c', 'd', 'e', 'f']}
							</Dropdown>
							<br />
							<br />
						</Cell>
						<Cell shrink component={BodyText}>
							This text should be visible.
						</Cell>
					</Column>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 2</title>
						<subtitle>This is the subtitle</subtitle>
						<slotAfter>
							<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
						</slotAfter>
					</Header>
					<Column>
						<Cell shrink component={BodyText}>
							A 3-Cell Layout with various items
						</Cell>
						<Cell>
							<span>This is the second panel.</span>
							<Item onClick={nextPanel} onKeyDown={handleKeyDown} slotAfter={<Icon>arrowlargeright</Icon>}>Go to the next</Item>
							<Button size="small" disabled>Button1</Button>
							<Dropdown width={100} style={{margin: 0}} title="A dropdown">
								{['a', 'b', 'c', 'd', 'e', 'f']}
							</Dropdown>
							<br />
							<br />
							<Button size="small">Button2</Button>
							<Button size="small" onClick={nextPanel} onKeyDown={handleKeyDown}>Button3</Button>
							<br />
							<br />
							<Button size="small">Slider</Button><Slider style={{display: 'inline-block', width: '30%'}} />
							<br />
							<br />
						</Cell>
						<Cell shrink component={BodyText}>
							This text should be visible.
						</Cell>
					</Column>
				</Panel>
				<Panel>
					<Header>
						<title>Panel 3</title>
						<subtitle>This is the subtitle</subtitle>
					</Header>
					<Column>
						<Cell shrink component={BodyText}>
							A 3-Cell Layout with various items
						</Cell>
						<Cell>
							<span>This is the last panel.</span>
							<Button>Button1</Button>
							<br />
							<br />
							<Button size="small" disabled>Button2</Button>
							<br />
							<Input size="small" value="Input" noBackButton />
							<Button onClick={handleOpenPopup} size="small">Open</Button>
							<InputField />
							<Popup open={popupOpen} onKeyUp={handleKeyUpOnPopup}>
								<Button onClick={handleClosePopup}>Close</Button>
								<Button>Dummy</Button>
							</Popup>
							<br />
							<br />
						</Cell>
						<Cell shrink component={BodyText}>
							This text should be visible.
						</Cell>
					</Column>
				</Panel>
			</FixedPopupPanels>
			<Button onClick={toggleOpen}>Open FixedPopupPanels</Button>
		</div>
	);
};

WithVariousItemsSamplesBase.propTypes = {
	args: PropTypes.object,
	rtl: PropTypes.bool
};

const WithVariousItemsSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	WithVariousItemsSamplesBase
);
export const WithVariousItems = (args) => <WithVariousItemsSamples args={args} />;

select('position', WithVariousItems, ['left', 'right'], Config);
boolean('fullHeight', WithVariousItems, Config);
select('width', WithVariousItems, ['narrow', 'half'], Config);
boolean('noAnimation', WithVariousItems, Config);
boolean('noAutoDismiss', WithVariousItems, Config);
select('scrimType', WithVariousItems, ['none', 'translucent', 'transparent'], Config);
select('spotlightRestrict', WithVariousItems, ['self-first', 'self-only'], Config);

WithVariousItems.storyName = 'with various items';
WithVariousItems.parameters = {
	info: {
		text: 'QA - Various items inside FixedPopupPanels'
	}
};
