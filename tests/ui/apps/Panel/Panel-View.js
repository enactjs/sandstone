import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

import {Panel, Panels, Header} from '../../../../Panels';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<Panels {...props}>
		<Panel id="Panel">
			<Header id="header" title="Title" subtitle="Sub Title" />
			<div>Panel Body</div>
		</Panel>
	</Panels>
);

export default ThemeDecorator(app);
