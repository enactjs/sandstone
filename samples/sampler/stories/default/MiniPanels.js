import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {MiniPanels, Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';

const Config = mergeComponentMetadata('MiniPanels', MiniPanels);

storiesOf('Sandstone', module)
	.add(
		'MiniPanels',
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
					onClose={toggleOpen} // eslint-disable-line react/jsx-no-bind
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Panel>
						<Header title="List of options" type="mini">
							{boolean('include close button', Config) ?
								<slotBefore>
									<Button icon="closex" onClick={toggleOpen} /* eslint-disable-line react/jsx-no-bind */ />
								</slotBefore> :
								null
							}
						</Header>
						<div style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 1</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 2</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 3</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 4</Item>
						</div>
					</Panel>
					<Panel>
						<Header title="Way way way too many Items for this list to handle, plus a wicked long title" type="mini">
							<slotBefore>
								<Button icon="arrowhookleft" onClick={prevPanel} /* eslint-disable-line react/jsx-no-bind */ />
							</slotBefore>
						</Header>
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 1</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 2</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 3</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 4</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 5</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 6</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 7</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 8</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 9</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 10</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 11</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 12</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 13</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 14</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 15</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 16</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 17</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 18</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 19</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 20</Item>
							<Item onClick={nextPanel} /* eslint-disable-line react/jsx-no-bind */>Item 21</Item>
						</Scroller>
					</Panel>
					<Panel>
						<Header title="Vertical Slider" type="mini">
							<slotBefore>
								<Button icon="arrowhookleft" onClick={prevPanel} /* eslint-disable-line react/jsx-no-bind */ />
							</slotBefore>
						</Header>
						<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
					</Panel>
				</MiniPanels>
				<Button onClick={toggleOpen} /* eslint-disable-line react/jsx-no-bind */>Open MiniPanels</Button>
			</div>);
		},
		{
			info: {
				text: 'Basic usage of MiniPanels'
			}
		}
	);
