import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';

const ContextualButton = ContextualMenuDecorator(Button);
ContextualButton.displayName = 'ContextualButton';

const Config = mergeComponentMetadata('ContextualMenuDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below',
	open: false
};

const renderPopup = () => (
	<div style={{width: '500px'}}>
		<Item>Item 1</Item>
		<Item>Item 2</Item>
	</div>
);

storiesOf('Sandstone', module)
	.add(
		'ContextualMenuDecorator',
		() => (
			<div style={{textAlign: 'center', marginTop: ri.unit(198, 'rem')}}>
				<ContextualButton
					direction={select('direction', ['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'], Config)}
					onClose={action('onClose')}
					open={boolean('open', Config)}
					popupComponent={renderPopup}
				>
					{text('button string', Config, 'Contextual Button')}
				</ContextualButton>
				<BodyText centered>Use KNOBS to interact with the ContextualMenu.</BodyText>
			</div>
		),
		{
			info: {
				text: 'Basic usage of ContextualMenuDecorator'
			}
		}
	);
