/* eslint-disable react/jsx-no-bind */

import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

const PanelsView = () => {
	const [index, setIndex] = useState(0);

	const nextPanel = () => setIndex(1);
	const prevPanel = () => setIndex(0);
	const customItem = ({index: itemIndex, ...rest}) => { // eslint-disable-line enact/prop-types
		return (
			<Item {...rest} onClick={nextPanel}>
				{itemList[itemIndex]}
			</Item>
		);
	};

	return (
		<Panels index={index} onBack={prevPanel}>
			<Panel>
				<Header title="Panel 0" />
				<VirtualList
					dataSize={itemList.length}
					itemRenderer={customItem}
					itemSize={ri.scale(156)}
					spotlightId="virtual-list"
				/>
			</Panel>
			<Panel>
				<Header title="Panel 1" />
				<Scroller>
					{
						itemList.map((item, key) => {
							return (
								<Item onClick={prevPanel} key={key}>{item}</Item>
							);
						})
					}
				</Scroller>
			</Panel>
		</Panels>
	);
};

export default PanelsView;
