import spotlight from '@enact/spotlight';
import {Row, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

import Heading from '../../../../Heading';
import ImageItem from '../../../../ImageItem';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Row>
			<Cell>
				<Heading>Image Item Default</Heading>
				<ImageItem
					id="imageItem1"
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Caption
				</ImageItem>
			</Cell>
			<Cell>
				<Heading>Image Item with long caption</Heading>
				<ImageItem
					id="imageItem2"
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Image Item with longer caption has Marquee applied
				</ImageItem>
			</Cell>
			<Cell>
				<Heading>Image Item centered</Heading>
				<ImageItem
					centered
					id="imageItem3"
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Centered
				</ImageItem>
			</Cell>
		</Row>
		<Row>
			<Cell>
				<Heading>Image Item disabled</Heading>
				<ImageItem
					disabled
					id="imageItem4"
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Image Item disabled
				</ImageItem>
			</Cell>
			<Cell>
				<Heading>Image Item selected</Heading>
				<ImageItem
					id="imageItem5"
					selected
					showSelection
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Image Item selected
				</ImageItem>
			</Cell>
			<Cell>
				<Heading>Image Item with label</Heading>
				<ImageItem
					id="imageItem6"
					label="Label"
					src="https://placehold.co/300x400/9037ab/ffffff/png?text=Image0"
					style={{width: ri.scaleToRem(420), height: ri.scaleToRem(399)}}
				>
					Image Item with label
				</ImageItem>
			</Cell>
		</Row>
	</div>
</div>;

export default ThemeDecorator(app);
