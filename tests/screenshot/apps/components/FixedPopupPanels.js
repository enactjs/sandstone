import React from 'react';

import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FixedPopupPanels, Panel, Header} from '../../../../FixedPopupPanels';

const stamp = (howMany, fn) => (new Array(howMany)).fill().map(fn);

// Wrapping the real component so `scaleToRem` is called within render rather than in module scope
function FixPopupPanels (props) {
	return (
		<FixedPopupPanels open {...props}>
			{props.children ? props.children : [
				<Panel key="panelIndex0">
					<Header title="Panel 1 - With Scroller" />
					<Item>Single Item</Item>
				</Panel>,
				<Panel key="panelIndex1">
					<Header title="Panel 2 - With Big Scroller" />
					<Scroller>
						{stamp(20, (i, idx) => <Item key={`item${idx}`}>Item {idx + 1}</Item>)}
					</Scroller>
				</Panel>
			]}
		</FixedPopupPanels>
	);
}

const FixedPopupPanelsTests = [
	{
		component: <FixPopupPanels>{null}</FixPopupPanels>
	},
	{
		title: 'with standard Panel Components',
		component: <FixPopupPanels />
	},
	{
		title: 'with standard Panel Components index 1',
		component: <FixPopupPanels index={1} />
	},
	{
		title: 'with half width',
		component: <FixPopupPanels width="half" />
	},
	// RTL
	{
		locale: 'ar-SA',
		component: <FixPopupPanels />
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components',
		component: <FixPopupPanels />
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 1',
		component: <FixPopupPanels index={1} />
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with half width',
		component: <FixPopupPanels width="half" />
	}
];

// Add `test.wrapper.full = true` to all tests.
FixedPopupPanelsTests.forEach(t => {
	t.wrapper = {full: true};
});

export default FixedPopupPanelsTests;
