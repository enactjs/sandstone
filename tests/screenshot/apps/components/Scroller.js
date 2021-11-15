import Scroller from '../../../../Scroller';

import css from './Scroller.module.less';

const ScrollerTests = [
	<Scroller />,
	<Scroller>Scroller</Scroller>,
	<Scroller style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Two-way scroller</div></Scroller>,
	<Scroller scrollbarTrackCss={css} style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Customized scrollbarTrack Style</div></Scroller>,
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
	},
	{
		wrapper: {
			tall: true
		},
		component: <Scroller focusableScrollbar horizontalScrollbar="visible" verticalScrollbar="visible">Scroller</Scroller>
	}
];
export default ScrollerTests;
