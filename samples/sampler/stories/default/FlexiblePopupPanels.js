/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';

import {FlexiblePopupPanels, Panel, PanelBase, Header} from '@enact/sandstone/FlexiblePopupPanels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';

const props = {
	buttonVisibility: ['auto', 'always', 'never'],
	size: ['auto', 'small', 'large']
};

const Config = mergeComponentMetadata('FlexiblePopupPanels', FlexiblePopupPanels);
const PanelConfig = mergeComponentMetadata('Panel', PanelBase, Panel);

storiesOf('Sandstone', module)
	.add(
		'FlexiblePopupPanels',
		() => {
			const defaultOpen = false;
			const [open, setOpenState] = React.useState(defaultOpen);
			const toggleOpen = () => setOpenState(!open);
			const handleClose = compose(toggleOpen, action('onClose'));

			const defaultIndex = 0;
			const [index, setPanelIndexState] = React.useState(defaultIndex);

			const nextPanel = () => setPanelIndexState(Math.min(index + 1, 1));
			const handleNavigation = (type) => (ev) => {
				setPanelIndexState(ev.index);
				action(type)(ev);
			};

			const knobs = {
				fullHeight: boolean('fullHeight', Config),
				nextButtonVisibility: select('nextButtonVisibility', props.buttonVisibility, Config),
				noAnimation: boolean('noAnimation', Config),
				noAutoDismiss: boolean('noAutoDismiss', Config),
				noCloseButton: boolean('noCloseButton', Config),
				prevButtonVisibility: select('prevButtonVisibility', props.buttonVisibility, Config),
				scrimType: select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent'),
				spotlightRestrict: select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')
			};

			// Knobs are ordered this way so "Panel" comes after the main component
			const size = select('size', props.size, PanelConfig);

			return (<div>
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
					{...knobs}
				>
					<Panel
						size={size}
						prevButton={boolean('custom first Panel prevButton', PanelConfig) ?  <Button icon="arrowhookright" aria-label="go to last" /> : void 0}
					>
						<Header title="First List" />
						<Scroller style={{width: (size === 'auto' ? ri.scaleToRem(900) : null)}}>
							<Item onClick={nextPanel}>Item 1</Item>
							<Item onClick={nextPanel}>Item 2</Item>
							<Item onClick={nextPanel}>Item 3</Item>
							<Item onClick={nextPanel}>Item 4</Item>
						</Scroller>
					</Panel>
					<Panel
						size={size}
					>
						<Header title="Second Vertical Slider" />
						<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
					</Panel>
					<Panel
						size={size}
						nextButton={boolean('custom last Panel nextButton', PanelConfig) ? <Button icon="arrowhookleft" aria-label="go back to first" /> : void 0}
					>
						<Header title="Third panel" />
						<Scroller style={{width: (size === 'auto' ? ri.scaleToRem(900) : null)}}>
							<Item onClick={nextPanel}>Item 1</Item>
						</Scroller>
					</Panel>
				</FlexiblePopupPanels>
				<Button onClick={toggleOpen}>Open FlexiblePopupPanels</Button>
			</div>);
		},
		{
			info: {
				text: 'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
			}
		}
	);
