import {Cell, Row} from '@enact/ui/Layout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Heading} from '@enact/sandstone/Heading';
import kind from '@enact/core/kind';
import React from 'react';

import KeyLogger from '../components/KeyLogger/KeyLogger';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props} noCloseButton>
			<Header>
				<title>KeyPress Monitor</title>
			</Header>
			<Row>
				<Cell>
					<Heading>keydown Events</Heading>
					<KeyLogger />
				</Cell>
				<Cell>
					<Heading>Modifier Keys</Heading>
					<KeyLogger modifiers />
				</Cell>
				<Cell>
					<Heading>keypress Events</Heading>
					<KeyLogger keyEventType="keypress" />
				</Cell>
			</Row>
		</Panel>
	)
});

export default MainPanel;
