import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FixedPopupPanels, Panel, Header} from '../../../../FixedPopupPanels';

import {withConfig, withProps} from './utils';

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

const EachPanel = withConfig(
	{wrapper: {full: true}},
	[
		// [QWTC-2429]
		{
			title: 'with standard Panel Components',
			component: <FixPopupPanels />
		},
		{
			title: 'with standard Panel Components positioned left',
			component: <FixPopupPanels position="left" />
		},
		{
			title: 'with transparent scrim',
			component: <FixPopupPanels scrimType="transparent" />
		},
		{
			title: 'with transparent scrim positioned left',
			component: <FixPopupPanels scrimType="transparent" position="left" />
		},
		{
			title: 'with standard Panel Components index 1',
			component: <FixPopupPanels index={1} />
		},
		{
			title: 'with standard Panel Components index 1 positioned left',
			component: <FixPopupPanels index={1} position="left" />
		},
		{
			title: 'with half width',
			component: <FixPopupPanels width="half" />
		},
		{
			title: 'with half width positioned left',
			component: <FixPopupPanels width="half" position="left" />
		}
	]
);

const FixedPopupPanelsTests = [
	{
		wrapper: {full: true},
		component: <FixPopupPanels>{null}</FixPopupPanels>
	},
	...EachPanel,
	...withProps(
		{fullHeight: true},
		EachPanel.map(o => ({...o, title: `${o.title} fullHeight`}))
	),
	// [QWTC-2429]
	...withConfig(
		{locale: 'ar-SA'},
		EachPanel.map(o => ({...o, title: `locale = ar-SA, ${o.title}`}))
	)
];

export default FixedPopupPanelsTests;
