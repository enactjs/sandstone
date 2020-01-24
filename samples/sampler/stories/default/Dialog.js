import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Dialog from '@enact/malachite/Dialog';
import Popup from '@enact/malachite/Popup';
import BodyText from '@enact/malachite/BodyText';
import Button from '@enact/malachite/Button';

const Config = mergeComponentMetadata('Dialog', Popup, Dialog);
Dialog.displayName = 'Dialog';

storiesOf('Malachite', module)
	.add(
		'Dialog',
		() => (
			<div>
				<Dialog
					// null issue
					noAnimation={boolean('noAnimation', Config)}
					// null issue
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					// null issue
					noDivider={boolean('noDivider', Config)}
					onClose={action('onClose')}
					// null issue
					open={boolean('open', Config)}
					showCloseButton={boolean('showCloseButton', Config)}
				>
					<title>{text('title', Config, 'Hello Dialog')}</title>
					<titleBelow>{text('titleBelow', Config, 'This is an organized dialog')}</titleBelow>
					<span>This dialog has content in it and can be very useful for organizing information
							for the user. This dialog has content in it and can be very useful for organizing information
							for the user.</span>
					<buttons>
						<Button>Ok</Button>
						<Button>Nevermind</Button>
					</buttons>
				</Dialog>
				<BodyText centered>Use KNOBS to interact with Dialog.</BodyText>
			</div>
		),
		{
			info: {
				text: 'Basic usage of Dialog'
			}
		}
	);
