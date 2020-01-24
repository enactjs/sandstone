import kind from '@enact/core/kind';
import React from 'react';

import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Button Kitchen Sink" />
			<Scroller>
				<Heading showLine>Small Buttons</Heading>
				<Button size="small">Button</Button>
				<Button size="small" selected>Selected Button</Button>
				<Button size="small" disabled>Disabled Button</Button>
				<Button size="small">Super long long long string Button</Button>
				<Button size="small" icon="home">Button with Icon</Button>

				<Heading showLine>"Round" Small Buttons - no effect</Heading>
				<Button size="small" type="round">Button</Button>
				<Button size="small" type="round" selected>Selected Button</Button>
				<Button size="small" type="round" disabled>Disabled Button</Button>
				<Button size="small" type="round">Super long long long string Button</Button>
				<Button size="small" type="round" icon="home">Button with Icon</Button>

				<Heading showLine>Large Buttons</Heading>
				<Button size="large">Large Button</Button>
				<Button size="large" selected>Large Selected Button</Button>
				<Button size="large">Super long long long string Large Button</Button>
				<Button size="large" icon="home">Button with Icon</Button>

				<Heading showLine>"Round" Large Buttons - no effect</Heading>
				<Button size="large" type="round">Large Button</Button>
				<Button size="large" type="round" selected>Large Selected Button</Button>
				<Button size="large" type="round">Super long long long string Large Button</Button>
				<Button size="large" type="round" icon="home">Button with Icon</Button>

				<Heading showLine>"Grid" Icon Button</Heading>
				<Button size="small" icon="play" />
				<Button size="small" icon="play" selected />
				<Button size="small" icon="play" disabled />
				<Button size="large" icon="play" />
				<Button size="large" icon="play" selected />
				<Button size="large" icon="play" disabled />

				<Heading showLine>"Round" Icon Button</Heading>
				<Button size="small" type="round" icon="play" />
				<Button size="small" type="round" icon="play" selected />
				<Button size="small" type="round" icon="play" disabled />
				<Button size="large" type="round" icon="play" />
				<Button size="large" type="round" icon="play" selected />
				<Button size="large" type="round" icon="play" disabled />

				<Heading showLine>Transparent Buttons</Heading>
				<Button backgroundOpacity="transparent" size="small">Button</Button>
				<Button backgroundOpacity="transparent" size="small" selected>Selected Button</Button>
				<Button backgroundOpacity="transparent" size="small" disabled>Disabled Button</Button>
				<Button backgroundOpacity="transparent" size="small">Super long long long string Button</Button>
				<Button backgroundOpacity="transparent" size="small" icon="home">Button with Icon</Button>

				<Button backgroundOpacity="transparent" size="large">Large Button</Button>
				<Button backgroundOpacity="transparent" size="large" selected>Large Selected Button</Button>
				<Button backgroundOpacity="transparent" size="large">Super long long long string Large Button</Button>
				<Button backgroundOpacity="transparent" size="large" icon="home">Button with Icon</Button>

				<Button backgroundOpacity="transparent" size="small" icon="play" />

				<Button backgroundOpacity="transparent" size="large" icon="play" />

				<Button backgroundOpacity="transparent" size="small" type="round" icon="play" />

				<Button backgroundOpacity="transparent" size="large" type="round" icon="play" />
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
