import Checkbox from '@enact/sandstone/Checkbox';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Heading from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';

const ItemView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller}>
			<Heading showLine>Default</Heading>
			<Item />
			<Item>Item</Item>
			<Item disabled>Disabled Item</Item>
			<Heading showLine>Checkbox Item</Heading>
			{/* // FIXME: The `Checkbox` component is positioned slightly above and left, unlike other components. */}
			<Checkbox style={{margin: '18px 42px'}} />
			<CheckboxItem>Checkbox</CheckboxItem>
			<FormCheckboxItem label="Form Checkbox Item">A Checkbox for a form</FormCheckboxItem>
			<Heading showLine>Labeled Item</Heading>
			<Item label="Label">Labeled item</Item>
			<Item label="Label and labelPosition" labelPosition="above">Labeled item</Item>
			<Heading showLine>Radio Item</Heading>
			<RadioItem>Radio item</RadioItem>
			<Heading showLine>Switch Item</Heading>
			<Switch />
			<SwitchItem>Switch item</SwitchItem>
			<Heading showLine>Image Item</Heading>
			<ImageItem
				label="ImageItem label"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				ImageItem Caption
			</ImageItem>
			<Heading showLine>Aria-labled Items</Heading>
			<Item aria-label="item">Item</Item>
			<Item label="Label" aria-label="labeled item">Labeled item</Item>
			<ImageItem
				aria-label="This is an image item"
				label="ImageItem label"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				ImageItem Caption
			</ImageItem>
		</Cell>
	</Layout>
);

export default ItemView;
