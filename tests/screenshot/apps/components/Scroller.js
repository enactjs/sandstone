import Scroller from '../../../../Scroller';

const ScrollerTests = [
	<Scroller />,
	<Scroller>Scroller</Scroller>,
	{
		wrapper: {
			tall: true
		},
		component: <Scroller>Scroller</Scroller>
	},
	{
		wrapper: {
			tall: true
		},
		component: <Scroller horizontalScrollbar="visible">Scroller</Scroller>
	},
	{
		wrapper: {
			tall: true
		},
		component: <Scroller verticalScrollbar="visible">Scroller</Scroller>
	},
	{
		wrapper: {
			tall: true
		},
		component: <Scroller horizontalScrollbar="visible" verticalScrollbar="visible">Scroller</Scroller>
	}
];
export default ScrollerTests;
