import Heading from '@enact/sandstone/Heading';
import ExpandableItem from '@enact/sandstone/ExpandableItem';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const ExpandableItemView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<ExpandableItem
				title="title"
			>
				<Item>
					This can be any type of content you might want to
					render inside a labeled expandable container
				</Item>
				<Item>
					<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
				</Item>
			</ExpandableItem>
			<Heading showLine>Customizable aria-labels</Heading>
			<ExpandableItem
				title="title"
			>
				<Item aria-label="first item">
					This can be any type of content you might want to
					render inside a labeled expandable container
				</Item>
				<Item aria-label="second item">
					<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
				</Item>
			</ExpandableItem>
		</Cell>
	</Layout>
);

export default ExpandableItemView;
