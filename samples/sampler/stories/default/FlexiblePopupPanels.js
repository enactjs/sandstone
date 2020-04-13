/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {FlexiblePopupPanels, Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';

const Config = mergeComponentMetadata('FlexiblePopupPanels', FlexiblePopupPanels);

storiesOf('Sandstone', module)
	.add(
		'Panels.FlexiblePopupPanels',
		() => {
			const defaultOpen = false;
			const [open, setOpenState] = React.useState(defaultOpen);
			const toggleOpen = () => setOpenState(!open);

			const defaultIndex = 0;
			const [index, setPanelIndexState] = React.useState(defaultIndex);
			const nextPanel = () => setPanelIndexState(Math.min(index + 1, 1));
			const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));

			return (<div>
				<FlexiblePopupPanels
					index={index}
					open={open}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onBack={action('onBack')}
					onClose={toggleOpen}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Panel>
						<Header title="List of options" type="mini">
							{boolean('include close button', Config) ?
								<slotBefore>
									<Button icon="closex" onClick={toggleOpen} size="small" />
								</slotBefore> :
								null
							}
						</Header>
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel}>Item 1</Item>
							<Item onClick={nextPanel}>Item 2</Item>
							<Item onClick={nextPanel}>Item 3</Item>
							<Item onClick={nextPanel}>Item 4</Item>
						</Scroller>
					</Panel>
					<Panel>
						<Header title="Vertical Slider" type="mini">
							<slotBefore>
								<Button icon="arrowhookleft" onClick={prevPanel} size="small" />
							</slotBefore>
						</Header>
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
