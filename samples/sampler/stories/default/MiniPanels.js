/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {MiniPanels, Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';

const Config = mergeComponentMetadata('MiniPanels', MiniPanels);

storiesOf('Sandstone', module)
	.add(
		'Panels.MiniPanels',
		() => {
			const defaultOpen = false;
			const [open, setOpenState] = React.useState(defaultOpen);
			const toggleOpen = () => setOpenState(!open);

			const defaultIndex = 0;
			const [index, setPanelIndexState] = React.useState(defaultIndex);
			const nextPanel = () => setPanelIndexState(Math.min(index + 1, 2));
			const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));

			return (<div>
				<MiniPanels
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
						<div style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel}>Item 1</Item>
							<Item onClick={nextPanel}>Item 2</Item>
							<Item onClick={nextPanel}>Item 3</Item>
							<Item onClick={nextPanel}>Item 4</Item>
						</div>
					</Panel>
					<Panel>
						<Header title="Way way way too many Items for this list to handle, plus a wicked long title" type="mini">
							<slotBefore>
								<Button icon="arrowhookleft" onClick={prevPanel} size="small" />
							</slotBefore>
						</Header>
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel}>Item 1</Item>
							<Item onClick={nextPanel}>Item 2</Item>
							<Item onClick={nextPanel}>Item 3</Item>
							<Item onClick={nextPanel}>Item 4</Item>
							<Item onClick={nextPanel}>Item 5</Item>
							<Item onClick={nextPanel}>Item 6</Item>
							<Item onClick={nextPanel}>Item 7</Item>
							<Item onClick={nextPanel}>Item 8</Item>
							<Item onClick={nextPanel}>Item 9</Item>
							<Item onClick={nextPanel}>Item 10</Item>
							<Item onClick={nextPanel}>Item 11</Item>
							<Item onClick={nextPanel}>Item 12</Item>
							<Item onClick={nextPanel}>Item 13</Item>
							<Item onClick={nextPanel}>Item 14</Item>
							<Item onClick={nextPanel}>Item 15</Item>
							<Item onClick={nextPanel}>Item 16</Item>
							<Item onClick={nextPanel}>Item 17</Item>
							<Item onClick={nextPanel}>Item 18</Item>
							<Item onClick={nextPanel}>Item 19</Item>
							<Item onClick={nextPanel}>Item 20</Item>
							<Item onClick={nextPanel}>Item 21</Item>
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
				</MiniPanels>
				<Button onClick={toggleOpen}>Open MiniPanels</Button>
			</div>);
		},
		{
			info: {
				text: 'Basic usage of MiniPanels'
			}
		}
	);
