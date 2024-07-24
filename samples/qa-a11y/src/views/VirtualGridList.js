/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/sandstone/CheckboxItem';
import ImageItem from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

import css from './VirtualGridList.module.less';

const items = [];

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

// eslint-disable-next-line enact/prop-types
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

// eslint-disable-next-line enact/prop-types
const renderItemWithRole = ({index, ...rest}) => {
	const {caption, label, src} = items[index];
	return (
		<ImageItem
			aria-posinset={index + 1}
			aria-setsize={items.length}
			label={label}
			role="listitem"
			src={src}
			{...rest}
		>
			{caption}
		</ImageItem>
	);
};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		caption = `Item ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		label = `SubItem ${count}`,
		src = {
			'hd': svgGenerator(200, 200, color, 'ffffff', `Image ${i}`),
			'fhd': svgGenerator(300, 300, color, 'ffffff', `Image ${i}`),
			'uhd': svgGenerator(600, 600, color, 'ffffff', `Image ${i}`)
		};

	items.push({caption, label, src});
}

const VirtualGridListView = () => {
	const [native, setNative] = useState(true);
	const [horizontal, setHorizontal] = useState(false);
	const [role, setRole] = useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleToggleScrollMode = () => setNative(!native);
	const handleToggleOrientation = () => setHorizontal(!horizontal);
	const handleToggleRole = () => setRole(!role);

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<CheckboxItem
					onToggle={handleToggleOrientation}
					selected={horizontal}
				>
					Horizontal
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleToggleScrollMode}
					selected={native}
				>
					Native
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleToggleRole}
					selected={role}
				>
					Read X of Y
				</CheckboxItem>
			</Cell>
			<VirtualGridList
				className={horizontal ? css.horizontalPadding : css.verticalPadding}
				dataSize={items.length}
				direction={horizontal ? 'horizontal' : 'vertical'}
				itemRenderer={role ? renderItemWithRole : renderItem}
				itemSize={{
					minWidth: ri.scale(678), // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
					minHeight: ri.scale(678) // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
				}}
				scrollMode={scrollMode}
			/>
		</Layout>
	);
};

export default VirtualGridListView;
