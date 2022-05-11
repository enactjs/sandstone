import Button from '../../../../Button';
import img from '../../images/600x600.png';
import ImageItem from '../../../../ImageItem';
import Scroller from '../../../../Scroller';
import ri from '@enact/ui/resolution';

import css from './Scroller.module.less';

const imageItems = [];
const defaultdataSize = 3;

const renderImageItem = (dataSize) => {

	imageItems.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const index = i;
		const source = {img};
		imageItems.push({source, index});
	}
	return dataSize;
};

renderImageItem(defaultdataSize);

const ScrollerTests = [
	<Scroller />,
	<Scroller>Scroller</Scroller>,
	<Scroller style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Two-way scroller</div></Scroller>,
	<Scroller scrollbarTrackCss={css} style={{height: '300px', width: '300px'}}><div style={{height: '600px', width: '600px'}}>Customized scrollbarTrack Style</div></Scroller>,
	// QWT-4513 - partially automated(step3~4). Step5~6 will be worked in ui-test.
	<Scroller
		direction={'horizontal'}
		editable={{
			centered: true,
			css
		}}
	>
		{
			imageItems.map((item) => {
				return (
					<div key={item.index} className={css.itemWrapper} data-index={item.index}>
						<div className={css.removeButtonContainer}>
							<Button className={css.removeButton} icon="trash" />
						</div>
						<ImageItem
							src={img}
							className={css.imageItem}
							style={{width: ri.scale(300), height: ri.scale(240)}}
						>
							{`Image ${item.index}`}
						</ImageItem>
					</div>
				);
			})
		}
	</Scroller>,
	<Scroller
		direction={'horizontal'}
		editable={{
			centered: false,
			css
		}}
	>
		{
			imageItems.map((item) => {
				return (
					<div key={item.index} className={css.itemWrapper} data-index={item.index}>
						<div className={css.removeButtonContainer}>
							<Button className={css.removeButton} icon="trash" />
						</div>
						<ImageItem
							src={img}
							className={css.imageItem}
							style={{width: ri.scale(300), height: ri.scale(240)}}
						>
							{`Image ${item.index}`}
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
	}
];
export default ScrollerTests;
