import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Alert from '@enact/sandstone/Alert';
import Popup from '@enact/sandstone/Popup';

Popup.displayName = 'Popup';

const Container = SpotlightContainerDecorator('div');

const PopupFromSelfOnlyContainer = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div>
			<Container spotlightId="selfOnlyContainer" spotlightRestrict="self-only">
				<Button onClick={onToggle}>button</Button>
			</Container>
			<Alert open={open}>
				<span>popup</span>
				<buttons>
					<Button onClick={onToggle}>button</Button>
				</buttons>
			</Alert>
		</div>
	)
);

storiesOf('Popup', module)
	.add(
		'using spotlightRestrict',
		() => (
			<div>
				<p>
					The contents of the popup below should contain the only controls that can be
					navigated to using 5-way. This is because the popup is using a `spotlightRestrict`
					value of `self-only`. If the value changes to `self-first`, the other panel controls
					can receive focus, but priority will be given to controls within the popup first.
				</p>
				<Button>Button</Button>
				<Popup
					open={boolean('open', Popup, true)}
					noAnimation={boolean('noAnimation', Popup, false)}
					noAutoDismiss={boolean('noAutoDismiss', Popup, false)}
					onClose={action('onClose')}
					position={select('position', ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'], Popup, 'bottom')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Popup, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Popup, 'self-only')}
				>
					<div>{text('children', Popup, 'Hello Popup')}</div>
					<br />
					<Container>
						<Button>Button</Button>
						<Button>Button</Button>
						<Button>Button</Button>
					</Container>
				</Popup>
			</div>
		)
	)
	.add(
		'from self-only container',
		() => (
			<PopupFromSelfOnlyContainer />
		)
	);
