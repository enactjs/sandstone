import ri from '@enact/ui/resolution';
import EditableList from '@enact/sandstone/EditableList';
import ImageItem from '@enact/sandstone/ImageItem';

import css from './MainView.module.less';

const items = [];
const dataSize = 10;
const populateItem = ({index}) => {
	const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
	const source = {
		hd: `http://via.placeholder.com/200x200/${color}/ffffff/png?text=Image+${index}`,
		fhd: `http://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${index}`,
		uhd: `http://via.placeholder.com/600x600/${color}/ffffff/png?text=Image+${index}`
	};

	return {src: source, index};
};

for (let i = 0; i < dataSize; i++) {
	items.push(populateItem({index: i}));
}

const MainView = () => {
	return (
		<EditableList
			dataSize={dataSize}
		>
			{
				items.map((item) => {
					return (
						<ImageItem
							className={css.item}
							src={item.src}
							key={item.index}
							style={{
								width: ri.scaleToRem(768),
								height: ri.scaleToRem(588),
								order: item.index + 1
							}}
						>
							{`Image ${item.index}`}
						</ImageItem>
					);
				})
			}
		</EditableList>
	);
};

export default MainView;
