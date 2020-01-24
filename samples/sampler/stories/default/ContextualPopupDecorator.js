import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {ContextualPopupDecorator} from '@enact/malachite/ContextualPopupDecorator';
import BodyText from '@enact/malachite/BodyText';
import Button from '@enact/malachite/Button';

const ContextualButton = ContextualPopupDecorator(Button);
ContextualButton.displayName = 'ContextualButton';

const Config = mergeComponentMetadata('ContextualPopupDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'down',
	open: false,
	showCloseButton: false,
	spotlightRestrict: 'self-first'
};

const renderPopup = () => (
	<div>{text('popup string', {groupId: 'Popup'}, 'Hello Contextual Popup')}</div>
);

storiesOf('Malachite', module)
	.add(
		'ContextualPopupDecorator',
		() => (
			<div style={{textAlign: 'center', marginTop: ri.unit(99, 'rem')}}>
				<ContextualButton
					direction={select('direction', ['up', 'down', 'left', 'right'], Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					open={boolean('open', Config)}
					popupComponent={renderPopup}
					showCloseButton={boolean('showCloseButton', Config)}
					spotlightRestrict={select('spotlightRestrict', ['none', 'self-first', 'self-only'], Config)}
				>
					{text('button string', Config, 'Hello Contextual Button')}
				</ContextualButton>
				<BodyText centered>Use KNOBS to interact with the ContextualPopup.</BodyText>
			</div>
		),
		{
			info: {
				text: 'Basic usage of ContextualPopupDecorator'
			}
		}
	);
