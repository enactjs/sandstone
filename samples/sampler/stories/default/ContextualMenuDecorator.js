import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import Button from '@enact/sandstone/Button';

const ContextualButton = ContextualMenuDecorator(Button);
ContextualButton.displayName = 'ContextualButton';

const Config = mergeComponentMetadata('ContextualMenuDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below'
};

storiesOf('Sandstone', module)
	.add(
		'ContextualMenuDecorator',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 10}, 2);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

			return (
				<div style={{textAlign: 'center', marginTop: ri.scaleToRem(198)}}>
					<ContextualButton
						direction={select('direction', ['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'], Config)}
						menuItems={items}
						onClose={action('onClose')}
						style={{width: ri.scaleToRem(1020)}}
					>
						{text('button string', Config, 'Contextual Button')}
					</ContextualButton>
				</div>
			);
		},
		{
			info: {
				text: 'Basic usage of ContextualMenuDecorator'
			}
		}
	);
