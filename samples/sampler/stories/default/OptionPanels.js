import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {OptionPanels, Panel, Header} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';

const Config = mergeComponentMetadata('OptionPanels', OptionPanels);

storiesOf('Sandstone', module)
	.add(
		'OptionPanels',
		() => (
			<div>
				<OptionPanels
					open={boolean('open', Config)}
					position={select('position', ['left', 'right'], Config, 'right')}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Panel>
						<Header type="compact">
							<title>
								OptionPanels Title
							</title>
							<subtitle>
								A panel type for options views
							</subtitle>
						</Header>
						<BodyText>Example text inside an OptionPanels Panel</BodyText>
					</Panel>
				</OptionPanels>
				<BodyText centered>Use KNOBS to interact with OptionPanels.</BodyText>
			</div>
		),
		{
			info: {
				text: 'Basic usage of OptionPanels'
			}
		}
	);
