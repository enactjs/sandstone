import ri from '@enact/ui/resolution';

import ImageItem from '../../../../ImageItem';
import {VirtualGridList} from '../../../../VirtualList';

const items = [];
const defaultDataSize = 10;

// eslint-disable-next-line enact/prop-types, enact/display-name
const renderItem = ({index, ...rest}) => {
	const {caption, label, src} = items[index];

	return (
		<ImageItem
			{...rest}
			src={src}
			label={label}
		>
			{caption}
		</ImageItem>
	);
};

const updateDataSize = (dataSize) => {
	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = ('00' + i).slice(-3),
			caption = `Item ${count}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			label = `SubItem ${count}`,
			src = {
				hd: `http://placehold.it/200x200/${color}/ffffff&text=Image ${i}`,
				fhd: `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`,
				uhd: `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`
			};

		items.push({caption, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualGridListTests = [
	<div>
		<VirtualGridList
			dataSize={items.length}
			itemSize={{minWidth: ri.scale(688), minHeight: ri.scale(570)}}
			itemRenderer={renderItem}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			focusableScrollbar
			horizontalScrollbar="visible"
			itemSize={{minWidth: ri.scale(688), minHeight: ri.scale(570)}}
			itemRenderer={renderItem}
			verticalScrollbar="visible"
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			horizontalScrollbar="hidden"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			spacing={ri.scale(60)}
			style={{height: ri.scale(300)}}
		/>
	</div>
];

export default VirtualGridListTests;
