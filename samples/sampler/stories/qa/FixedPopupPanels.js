/* eslint-disable react/jsx-no-bind */

import {is} from '@enact/core/keymap';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import Dropdown from '@enact/sandstone/Dropdown';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import {VirtualList} from '@enact/sandstone/VirtualList';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component, useState} from 'react';
import compose from 'ramda/src/compose';

const Config = mergeComponentMetadata('FixedPopupPanels', FixedPopupPanels);
Config.defaultProps.position = 'right';
Config.defaultProps.scrimType = 'translucent';
Config.defaultProps.spotlightRestrict = 'self-only';
Config.defaultProps.width = 'narrow';

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

const WithVirtualListSamplesBase = ({rtl}) => {
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
				position={select('position', ['left', 'right'], Config)}
				fullHeight={boolean('fullHeight', Config)}
				width={select('width', ['narrow', 'half'], Config)}
				noAnimation={boolean('noAnimation', Config)}
				noAutoDismiss={boolean('noAutoDismiss', Config)}
				onBack={handleBack}
				onClose={handleClose}
				onHide={action('onHide')}
				onShow={action('onShow')}
				scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config)}
				spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config)}
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
	rtl: PropTypes.bool
};

const WithVirtualListSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	WithVirtualListSamplesBase
);
export const WithVirtualList = () => <WithVirtualListSamples />;

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
	}
};

export const WithScroller = () => {
	return (
		<FixedPopupPanels
			open
			position={select('position', ['left', 'right'], Config)}
			fullHeight={boolean('fullHeight', Config)}
			width={select('width', ['narrow', 'half'], Config)}
			noAnimation={boolean('noAnimation', Config)}
			noAutoDismiss={boolean('noAutoDismiss', Config)}
			scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config)}
			spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config)}
		>
			<Panel>
				<Header>
					<title>Press Enter to scroll</title>
				</Header>
				<Cell>
					<Scroller focusableScrollbar="byEnter" style={{height: ri.scaleToRem(333)}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui cursus
						tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna auctor tellus,
						quis mattis mauris lectus vel metus. Maecenas tempus quam ac dignissim gravida. Integer
						ut posuere sapien. Duis consequat vitae libero nec posuere. Curabitur sagittis mauris
						vel massa cursus, et mollis est malesuada. Vestibulum ante libero, gravida id purus
						eget, varius porttitor ipsum. Suspendisse quis consequat sem, eget gravida est. Morbi
						pulvinar diam vel mattis lacinia. Integer eget est quis augue tincidunt tincidunt quis
						at nisi. Duis at massa nunc. Cras malesuada, sem quis aliquet vulputate, ante ipsum
						congue ante, eu volutpat ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia
						mi.
					</Scroller>
				</Cell>
			</Panel>
		</FixedPopupPanels>
	);
};

WithScroller.storyName = 'with Scroller';
WithScroller.parameters = {
	info: {
		text: 'QA -  Scroller with text inside FixedPopupPanels'
	}
};

const WithVariousItemsSamplesBase = ({rtl}) => {
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
		if (!rtl && isRight(keyCode) && ev.target && !ev.target.hasAttribute('disabled')) {
			nextPanel();
		}
	};

	return (
		<div>
			<FixedPopupPanels
				index={index}
				open={open}
				position={select('position', ['left', 'right'], Config)}
				fullHeight={boolean('fullHeight', Config)}
				width={select('width', ['narrow', 'half'], Config)}
				noAnimation={boolean('noAnimation', Config)}
				noAutoDismiss={boolean('noAutoDismiss', Config)}
				onBack={handleBack}
				onClose={handleClose}
				onHide={action('onHide')}
				onShow={action('onShow')}
				scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config)}
				spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config)}
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
							<br />
							<Slider />
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
	rtl: PropTypes.bool
};

const WithVariousItemsSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	WithVariousItemsSamplesBase
);
export const WithVariousItems = () => <WithVariousItemsSamples />;

WithVariousItems.storyName = 'with various items';
WithVariousItems.parameters = {
	info: {
		text: 'QA - Various items inside FixedPopupPanels'
	}
};
