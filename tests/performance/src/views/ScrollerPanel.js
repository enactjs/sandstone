import kind from '@enact/core/kind';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const ScrollerView = kind({
	name: 'ScrollerView',

	render: () => (
		<div style={{height: '700px'}}>
			<Scroller id="scroller" focusableScrollbar>
				<div style={{height: '5000px'}} />
			</Scroller>
		</div>
	)
});

export default ScrollerView;
