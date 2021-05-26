import Heading from '../../../../Heading';
import ImageItem from '../../../../ImageItem';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: ri.scaleToRem(900)}}>
			<Heading>Image Item Default</Heading>
			<ImageItem
				id="imageItem1"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Caption
			</ImageItem>
			<Heading>Image Item with long caption</Heading>
			<ImageItem
				id="imageItem2"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Image Item with longer caption has Marquee applied
			</ImageItem>
			<Heading>Image Item centered</Heading>
			<ImageItem
				centered
				id="imageItem3"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Image Item centered
			</ImageItem>
			<Heading>Image Item disabled</Heading>
			<ImageItem
				disabled
				id="imageItem4"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Image Item disabled
			</ImageItem>
			<ImageItem
				id="imageItem5"
				selected
				showSelection
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Image Item selected
			</ImageItem>
			<ImageItem
				id="imageItem6"
				label="Label"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(399), height: ri.scaleToRem(300)}}
			>
				Image Item with label
			</ImageItem>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
