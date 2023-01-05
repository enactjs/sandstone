import {Heading} from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import CustomItem from '../components/CustomItem';

import css from './MainPanel.module.less';

const defaultDataSize = 14;
const items = [];

export const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0;
	const headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const count = (headingZeros + i).slice(-itemNumberDigits);
		const text = `Item ${count}`;
		const subText = `SubItem ${count}`;
		const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
		const source = svgGenerator(600, 600, color, 'ffffff', `Image ${i}`);

		items.push({text, subText, source});
	}

	return dataSize;
};

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {text, subText, source} = items[index];

	return (
		<ImageItem {...rest} label={subText} src={source}>
			{text}
		</ImageItem>
	);
};
updateDataSize(defaultDataSize);

const MainPanel = ({...rest}) => {
	const virtualListId = 'virtuallist-0';

	return (
		<Panel {...rest} className={css.mainPanel}>
			<Header title="Responsive UI" />
			<Column>
				<Cell>
					<Scroller direction="vertical">
						<Row wrap="wrap">
							{items.map(({text, subText}, i) => (
								<Cell component={CustomItem} label={subText} grow={1} key={i} size={600} >
									{text}
								</Cell>
								// Same with below
								// <CustomItem style={{flex: "1 0 " + ri.scaleToRem(600)}} key={i} label={subText}>{text}</CustomItem>
							))}
						</Row>
					</Scroller>
				</Cell>
				<Cell shrink>
					<Heading id="league_list_heading">VirtualGridList</Heading>
				</Cell>
				<Cell shrink>
					<VirtualGridList
						dataSize={defaultDataSize}
						direction="horizontal"
						itemRenderer={renderItem}
						itemSize={{
							minWidth: ri.scale(688),
							minHeight: ri.scale(570)
						}}
						style={{
							height: ri.scale(570),
							paddingBottom: ri.scaleToRem(36)
						}}
						id={virtualListId}
						key={virtualListId}
						spotlightId={virtualListId}
					/>
				</Cell>
			</Column>
		</Panel>
	);
};

export default MainPanel;
