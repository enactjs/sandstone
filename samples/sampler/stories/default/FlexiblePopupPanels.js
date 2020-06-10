/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';

import {FlexiblePopupPanels, Panel, Header} from '@enact/sandstone/FlexiblePopupPanels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';

const props = {
	buttonVisibility: ['auto', 'always', 'never']
};

const Config = mergeComponentMetadata('FlexiblePopupPanels', FlexiblePopupPanels);

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

			return (<div>
				<FlexiblePopupPanels
					index={index}
					open={open}
					fullHeight={boolean('fullHeight', Config)}
					nextButtonVisibility={select('nextButtonVisibility', props.buttonVisibility, Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					noCloseButton={boolean('noCloseButton', Config)}
					onBack={handleNavigation('onBack')}
					onChange={handleNavigation('onChange')}
					onClose={handleClose}
					onHide={action('onHide')}
					onNextClick={action('onNextClick')}
					onPrevClick={action('onPrevClick')}
					onShow={action('onShow')}
					prevButtonVisibility={select('prevButtonVisibility', props.buttonVisibility, Config)}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Panel prevButton={boolean('custom first Panel prevButton', Config) ?  <Button icon="closex" aria-label="exit" /> : void 0}>
						<Header title="List of options" />
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel}>Item 1</Item>
							<Item onClick={nextPanel}>Item 2</Item>
							<Item onClick={nextPanel}>Item 3</Item>
							<Item onClick={nextPanel}>Item 4</Item>
						</Scroller>
					</Panel>
					<Panel nextButton={boolean('custom last Panel nextButton', Config) ? <Button icon="closex" aria-label="quit" /> : void 0}>
						<Header title="Vertical Slider" />
						<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
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
