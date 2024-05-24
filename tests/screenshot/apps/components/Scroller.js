import ri from '@enact/ui/resolution';

import Button from '../../../../Button';
import ImageItem from '../../../../ImageItem';
import Scroller from '../../../../Scroller';

import img from '../../images/600x600.png';

import {withConfig} from './utils';

import * as css from './Scroller.module.less';

const dataSize = 3;
const imageItems = Array.from({length: dataSize}, (v, i) => i);

const ScrollerTests = [
	<Scroller />,
	<Scroller>Scroller</Scroller>,
	<Scroller style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Two-way scroller</div></Scroller>,
	<Scroller scrollbarTrackCss={css} style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Customized scrollbarTrack Style</div></Scroller>,
	// QWTC-570 - partially automated(step3~4). Step5~6 will be worked in ui-test.
	<Scroller
		direction="horizontal"
		editable={{
			centered: true,
			css
		}}
	>
		{
			imageItems.map((index) => {
				return (
					<div key={index} className={css.itemWrapper} data-index={index}>
						<div className={css.removeButtonContainer}>
							<Button className={css.removeButton} icon="trash" />
						</div>
						<ImageItem
							src={img}
							className={css.imageItem}
							style={{width: ri.scale(300), height: ri.scale(240)}}
						>
							{`Image ${index}`}
						</ImageItem>
					</div>
				);
			})
		}
	</Scroller>,
	<Scroller
		direction="horizontal"
		editable={{
			centered: false,
			css
		}}
	>
		{
			imageItems.map((index) => {
				return (
					<div key={index} className={css.itemWrapper} data-index={index}>
						<div className={css.removeButtonContainer}>
							<Button className={css.removeButton} icon="trash" />
						</div>
						<ImageItem
							src={img}
							className={css.imageItem}
							style={{width: ri.scale(300), height: ri.scale(240)}}
						>
							{`Image ${index}`}
						</ImageItem>
					</div>
				);
			})
		}
	</Scroller>,
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
	},
	...withConfig({focus: true}, [
		<Scroller focusableScrollbar style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Focused Two-way scroller</div></Scroller>,
		<Scroller focusableScrollbar scrollbarTrackCss={css} style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Focused Customized scrollbarTrack Style</div></Scroller>
	])
];
export default ScrollerTests;
