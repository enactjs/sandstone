import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

import {Panel, Panels, Header} from '../../../../Panels';
import Scroller from '../../../../Scroller';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<Panels {...props}>
		<Panel id="Panel" featureContent>
			<Header id="header" title="Title" subtitle="Sub Title" />
			<Scroller id="scroller">
				<div style={{height: 4000}}>
					<div id="content">
						Some content
					</div>
				</div>
			</Scroller>
		</Panel>
	</Panels>
);

export default ThemeDecorator(app);
