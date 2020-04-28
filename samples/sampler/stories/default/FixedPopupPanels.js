import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import Item from '@enact/sandstone/Item';

const Config = mergeComponentMetadata('FixedPopupPanels', FixedPopupPanels);

storiesOf('Sandstone', module)
	.add(
		'Panels.FixedPopupPanels',
		() => (
			<div>
				<FixedPopupPanels
					index={number('index', Config, {range: true, min: 0, max: 1}, 0)}
					open={boolean('open', Config)}
					position={select('position', ['left', 'right'], Config, 'right')}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onBack={action('onBack')}
					onClose={action('onClose')}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Panel>
						<Header type="compact">
							<title>
								FixedPopupPanels Title
							</title>
							<subtitle>
								A panel type for options views
							</subtitle>
						</Header>
						<BodyText>Example text inside an FixedPopupPanels Panel</BodyText>
						<Item>Example Item 1</Item>
						<Item>Example Item 2</Item>
						<Item>Example Item 3</Item>
					</Panel>
					<Panel>
						<Header type="compact">
							<title>
								Another Panel
							</title>
							<subtitle>
								This is the second page
							</subtitle>
						</Header>
						<BodyText>Woo woo</BodyText>
						<Item>Example Item 1 on Panel 2</Item>
						<Item>Example Item 2 on Panel 2</Item>
						<Item>Example Item 3 on Panel 2</Item>
					</Panel>
				</FixedPopupPanels>
				<BodyText centered>Use KNOBS to interact with FixedPopupPanels.</BodyText>
			</div>
		),
		{
			info: {
				text: 'Basic usage of FixedPopupPanels'
			}
		}
	);
