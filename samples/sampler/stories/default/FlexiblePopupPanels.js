/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import {FlexiblePopupPanelsBase, FlexiblePopupPanels, Panel, PanelBase, Header} from '@enact/sandstone/FlexiblePopupPanels';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {useState} from 'react';
import compose from 'ramda/src/compose';

const propOptions = {
	buttonVisibility: ['auto', 'always', 'never'],
	size: ['auto', 'small', 'large']
};

const Config = mergeComponentMetadata('FlexiblePopupPanels', FlexiblePopupPanelsBase, FlexiblePopupPanels);
const PanelConfig = mergeComponentMetadata('Panel', PanelBase, Panel);

export default {
	title: 'Sandstone/FlexiblePopupPanels',
	component: 'FlexiblePopupPanels'
};

export const _FlexiblePopupPanels = (args) => {
	const defaultOpen = false;
	const [open, setOpenState] = useState(defaultOpen);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const defaultIndex = 0;
	const [index, setPanelIndexState] = useState(defaultIndex);

	const nextPanel = () => setPanelIndexState(Math.min(index + 1, 1));
	const handleNavigation = (type) => (ev) => {
		setPanelIndexState(ev.index);
		action(type)(ev);
	};

	const controls = {
		fullHeight: args['fullHeight'],
		nextButtonVisibility: args['nextButtonVisibility'],
		noAnimation: args['noAnimation'],
		noAutoDismiss: args['noAutoDismiss'],
		noCloseButton: args['noCloseButton'],
		prevButtonVisibility: args['prevButtonVisibility'],
		scrimType: args['scrimType'],
		spotlightRestrict: args['spotlightRestrict']
	};
	const size = args['size'];

	return (
		<div>
			<FlexiblePopupPanels
				index={index}
				open={open}
				onBack={handleNavigation('onBack')}
				onChange={handleNavigation('onChange')}
				onClose={handleClose}
				onHide={action('onHide')}
				onNextClick={action('onNextClick')}
				onPrevClick={action('onPrevClick')}
				onShow={action('onShow')}
				{...controls}
			>
				<Panel
					size={size}
					prevButton={
						args['custom first Panel prevButton'] ? (
							<Button icon="jumpbackward" aria-label="go to last" />
						) : (
							void 0
						)
					}
				>
					<Header title="First List" />
					<Scroller style={{width: size === 'auto' ? ri.scaleToRem(900) : null}}>
						<Item onClick={nextPanel}>Item 1</Item>
						<Item onClick={nextPanel}>Item 2</Item>
						<Item onClick={nextPanel}>Item 3</Item>
						<Item onClick={nextPanel}>Item 4</Item>
					</Scroller>
				</Panel>
				<Panel size={size}>
					<Header title="Second Vertical Slider" />
					<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
				</Panel>
				<Panel
					size={size}
					nextButton={
						args['custom last Panel nextButton'] ? (
							<Button icon="jumpforward" aria-label="go back to first" />
						) : (
							void 0
						)
					}
				>
					<Header title="Third panel" />
					<Scroller style={{width: size === 'auto' ? ri.scaleToRem(900) : null}}>
						<Item onClick={nextPanel}>Item 1</Item>
					</Scroller>
				</Panel>
			</FlexiblePopupPanels>
			<Button onClick={toggleOpen}>Open FlexiblePopupPanels</Button>
		</div>
	);
};

boolean('fullHeight', _FlexiblePopupPanels, Config);
select('nextButtonVisibility', _FlexiblePopupPanels, propOptions.buttonVisibility, Config);
boolean('noAnimation', _FlexiblePopupPanels, Config);
boolean('noAutoDismiss', _FlexiblePopupPanels, Config);
boolean('noCloseButton', _FlexiblePopupPanels, Config);
select('prevButtonVisibility', _FlexiblePopupPanels, propOptions.buttonVisibility, Config);
select('scrimType', _FlexiblePopupPanels, ['none', 'translucent', 'transparent'], Config, 'translucent');
select(
	'spotlightRestrict',
	_FlexiblePopupPanels,
	['self-first', 'self-only'],
	Config,
	'self-only'
);
select('size', _FlexiblePopupPanels, propOptions.size, PanelConfig);
boolean('custom first Panel prevButton', _FlexiblePopupPanels, PanelConfig);
boolean('custom last Panel nextButton', _FlexiblePopupPanels, PanelConfig);

_FlexiblePopupPanels.storyName = 'FlexiblePopupPanels';
_FlexiblePopupPanels.parameters = {
	info: {
		text:
			'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
	}
};
