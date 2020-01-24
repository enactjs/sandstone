import kind from '@enact/core/kind';
import React from 'react';

import Button from '../../../../Button';
import Heading from '../../../../Heading';
import {Panel, Header} from '../../../../Panels';
import Scroller from '../../../../Scroller';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Button Kitchen Sink" />
			<Scroller>
				<Heading showLine spacing="large">Small Buttons</Heading>
				<Button>Button</Button>
				<Button selected>Selected Button</Button>
				<Button pressed>Pressed Button</Button>
				<Button disabled>Disabled Button</Button>
				<Button>Super long long long string Button</Button>
				<Button icon="home">Button with Icon</Button>
				<Heading showLine>Large Buttons</Heading>
				<Button size="large">Large Button</Button>
				<Button size="large" selected>Large Selected Button</Button>
				<Button size="large" pressed>Large Pressed Button</Button>
				<Button size="large" disabled>Large Disabled Button</Button>
				<Button size="large">Super long long long string Large Button</Button>
				<Heading showLine>Icon Button</Heading>
				<Button icon="play" />
				<Button pressed icon="play" />
				<Button selected icon="play" />
				<Button disabled icon="play" />
				<Button size="large" icon="play" />
				<Button size="large" pressed icon="play" />
				<Button size="large" selected icon="play" />
				<Button size="large" disabled icon="play" />
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
